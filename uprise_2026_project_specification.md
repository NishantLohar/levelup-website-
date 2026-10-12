# Project Specification: "Uprise 2026" Event Page (LevelUp Website)

## 1. Overview & Objective
This document outlines the requirements for building the **Uprise 2026** dedicated page within the existing **LevelUp Website**. Uprise 2026 is an offline mega-event featuring a competitive offline hackathon and a startup expo. The page needs a modern, sleek aesthetic utilizing a **gold and black color palette**, smooth slide animations, fluid page transitions, and cutting-edge hackathon-style UI/UX.

---

## 2. Layout & Structure

### A. Sub-Navbar (Page Specific)
A compact, sticky secondary navigation bar specific to the Uprise section containing:
1. **Leaderboard Link/Tab**: Displays the referral/XP leaderboard.
2. **Register CTA**: A redirect button pointing to `account.levelupevents.in`.
3. **"Sign Up As" Dropdown**: Options include:
   * **Club**
   * **Builders**
   * **Members**

---

### B. Main Sections & Components

1. **Hero Banner / Slider Section**
   * **Slide 1:** Announces **Uprise Edition 2026** – An offline hackathon and startup expo.
   * **Slide 2:** Highlights the **Benefits of Attending Uprise**.
   * *Styling:* Modern animations, slider transitions, gold-on-black typography, glowing accents.

2. **Community Partners Section**
   * Display grid/logos of partnering communities.

3. **Sponsor Logo Carousel**
   * Smooth, modern infinite-scroll carousel displaying event sponsors.

4. **About Uprise 2026 Section**
   * Comprehensive info about the event, its mission, and vision.
   * Detailed breakdown of the **Offline Hackathon** track and the **Startup Expo** track.

---

## 3. User Authentication & Registration Forms

The "Sign Up As" dropdown triggers specialized registration/login flows based on user type:

### 1. Club Registration
* **Fields:**
  * Club Name
  * Organization or Institute (Type "NA" if it's a private club)
  * Total Members
  * Email
  * Contact Number
  * Coupon Code (custom/generated)

### 2. Member Registration
* **Fields:**
  * Name
  * Email
  * Contact Number
  * Coupon Code

### 3. Builders Login (No Account Creation)
* Builders are pre-assigned by the admin via the main dashboard.
* **Flow:** No sign-up form; they directly log in using their existing SaaS/student credentials.

---

## 4. Automated Referral & XP System

* **Coupon Generation:** Upon registration, the system automatically generates a unique coupon code for the individual: `UPRISE{NAME}` (using the name provided during login/registration).
* **XP Rewards Engine:**
  * If a new user registers/logs in using a **Member's** or **Builder's** coupon code, the owner of that coupon receives **+50 XP** (for members) or **+70 XP** (for builders).
  * XP stats dynamically update the **Leaderboard**.

---

## 5. API & Backend Integration

* **Data Sync:** Connect to the existing **Student Dashboard API** where member, club, and builder data is centralized.
* **Admin Controls:** Admin-assigned builders from the core dashboard must map seamlessly to this page's authentication check.

---

## 6. Design & Aesthetic Guidelines (CSS / Animations)
* **Color Palette:** Luxury dark mode — Deep obsidian black backgrounds (`#0a0a0a`, `#000000`) paired with metallic gold gradients (`#FFD700`, `#C5A059`, `#AA771C`), with subtle neon or glow effects.
* **Animations:** 
  * Smooth entry animations for sliders.
  * Glassmorphism effects (`backdrop-blur`) on cards and navbars.
  * Hover micro-interactions on buttons, sponsor carousels, and leaderboard rows.