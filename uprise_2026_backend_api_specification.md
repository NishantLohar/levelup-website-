# Backend & API Architecture Specification: "Uprise 2026"

## 1. Overview & Architecture Flow

The backend architecture bridges the dedicated **Uprise 2026 event page** with the central **Student SaaS Platform** (`account.levelupevents.in`). 

* **Registration Flow:** Users click the "Register" button on the Uprise site and are redirected to the SaaS platform. Once registered/authenticated on the SaaS platform, all user data, referral tracking, and XP computations are synchronized back to the Uprise frontend via secure REST/GraphQL APIs.

---

## 2. Core Backend Modules & Logic

### A. Automatic Coupon Code Generation
* **Rule:** Upon successful registration on the Student SaaS platform, the system programmatically generates a unique coupon code for every user.
* **Format:** `UPRISE{NAME}` (where `{NAME}` is normalized from the user's input, e.g., stripped of spaces and converted to uppercase, or a sanitized version of their first name/handle).

### B. Referral & XP Reward Engine
* **Trigger:** When User B registers or logs in and applies User A's coupon code (`UPRISE{NAME}`):
  * **Member Coupon Usage:** User A (if a Member) receives **+50 XP**.
  * **Builder Coupon Usage:** User A (if a Builder) receives **+70 XP**.
* **Database Updates:** The transaction must be atomic to prevent race conditions or double-crediting. A referral log table must track `referrer_id`, `referred_user_id`, `xp_awarded`, and `timestamp`.

### C. Live Leaderboard API
* **Requirement:** The Uprise frontend must fetch leaderboard rankings in real-time or via optimized polling/WebSockets.
* **Sorting Criteria:** Ranked primarily by total accumulated XP in descending order, with tie-breakers resolved by earlier registration timestamps.

---

## 3. API Endpoints Specification

### 1. User Authentication & Registration Sync
* **Endpoint:** `POST /api/v1/uprise/register`
* **Description:** Handles user creation originating from or synced back from the SaaS platform.
* **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "contact": "+919876543210",
    "role": "member", 
    "organization": "Institute of Tech",
    "applied_coupon": "UPRISEJOHN"
  }
  ```
* **Response:**
  ```json
  {
    "success": true,
    "user_id": "usr_981237",
    "coupon_code": "UPRISEJANEDOE",
    "xp": 0,
    "message": "Registration successful and coupon generated."
  }
  ```

### 2. Coupon Validation Endpoint
* **Endpoint:** `POST /api/v1/uprise/validate-coupon`
* **Description:** Verifies if a coupon code exists and returns the owner details and assigned XP weight.
* **Request Body:**
  ```json
  {
    "coupon_code": "UPRISEJOHN"
  }
  ```
* **Response:**
  ```json
  {
    "valid": true,
    "owner_name": "John Smith",
    "owner_role": "builder",
    "reward_xp": 70
  }
  ```

### 3. Leaderboard Data Fetch
* **Endpoint:** `GET /api/v1/uprise/leaderboard`
* **Description:** Fetches live student, builder, and club rankings based on total XP.
* **Query Parameters:** `limit` (default: 50), `page` (default: 1), `role` (optional filter: member/builder/club).
* **Response:**
  ```json
  {
    "status": "success",
    "leaderboard": [
      {
        "rank": 1,
        "name": "Alex Turner",
        "role": "builder",
        "coupon_code": "UPRISEALEX",
        "total_xp": 1450,
        "referral_count": 15
      }
    ]
  }
  ```

---

## 4. Security & Error Handling
* **CORS Policy:** Restrict API calls strictly to authorized origins (`levelupevents.in` and subdomains).
* **Rate Limiting:** Implement rate limits on the coupon validation and registration endpoints to prevent brute-force generation or coupon-stuffing attacks.
* **Data Validation:** Server-side validation for all incoming phone numbers, email formats, and uppercase coupon formatting.