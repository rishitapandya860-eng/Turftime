# 🎙️ ZooTechX Interview & 2-Minute Video Preparation Guide

> **Candidate Guide for Topic 3: TurfTime — Sports Venue Booking**  
> Use this document to record your mandatory 2-minute demonstration video and prepare for the technical interview.

---

## ⏱️ Mandatory 2-Minute Video Walkthrough Script

*Tip: Keep your webcam picture-in-picture on at all times as required by the brief. Practice with a timer (aim for 1 min 50 seconds to stay safely within the 2-minute limit).*

### [0:00 - 0:25] Introduction & High-Level Concept
> *"Hello! My name is [Your Name], and this is my prototype submission for the ZooTechX Web & Software Development Internship assessment on Topic 3: TurfTime — Sports Venue Booking.*  
> *TurfTime is a modern sports-tech platform built with Next.js App Router, React 19, TypeScript, and Tailwind CSS. The visual direction was inspired by ZooTechX's commitment to custom, high-impact digital experiences, with deep athletic forest greens, electric neon accents, and bold typography designed specifically for Mumbai sports communities."*

### [0:25 - 0:55] UI Showcase & Interactive Features (Screen Recording)
> *"Starting with the above-the-fold hero, we have an integrated quick-search panel for location, sport, and date. Scrolling down, visitors can explore 6 sports disciplines—like Football, Box Cricket, and Badminton. Clicking any category filters our curated Mumbai venues in real-time.*  
> *Each venue card displays verified turf specifications, transparent pricing in INR, sample time slots, and an interactive favorites toggle saved to local storage. Visitors can also open full ground specifications, photos, and stadium rules."*

### [0:55 - 1:25] Live Booking Flow & Backend Verification (Crucial Step!)
> *"Now for the core backend requirement: when I click 'Book Slot', a multi-step modal opens. I'll pick tomorrow's 8 PM floodlight slot, add a note, and enter customer details. The form performs both client-side and server-side validation, checking phone number formats and rejecting invalid dates.*  
> *When I click 'Submit', a POST request is sent to our Next.js route handler at `/api/bookings`. The server validates the request, calculates GST and pricing, and persists it to durable storage with a unique booking reference ID. As you can see, when I open the 'My Bookings' drawer, our new booking request is immediately visible with its status!"*

### [1:25 - 1:55] Mandatory AI & Reference Disclosures (As per PDF Section 5)
> *"For full disclosure as required: I leveraged AI assistance (Antigravity/ChatGPT) for project scaffolding, brainstorming sports specifications, and refining server-side validation regex. The component architecture, interactive filter logic, state management, and brand identity were carefully curated and reviewed by me. Venue photos are licensed from Unsplash, and icons are from Lucide React.*  
> *As a prototype limitation, real-time venue calendar inventory and payments are simulated as sample data, while booking request persistence and server validation are completely functional.*  
> *Thank you, and I look forward to discussing this further with the ZooTechX team!"*

---

## 🧠 Common Technical Questions & Beginner-Friendly Explanations

### Q1: Why did you choose Next.js App Router instead of standard React (Vite)?
**Answer:**  
*"Next.js App Router provides a unified full-stack architecture. Instead of running a separate Express backend server with CORS configuration, Next.js route handlers (`/api/bookings`) allow us to run server-side logic, validate data, and access persistent storage within the same deployment. It also offers optimized font loading, server components for fast first contentful paint, and seamless one-click deployment on Vercel."*

### Q2: How does your backend handle persistence and data integrity?
**Answer:**  
*"In `src/lib/db.ts`, we implement a persistent storage engine that stores booking submissions in JSON format with atomic file writes. In addition, I designed a complete SQL schema (`schema.sql`) for PostgreSQL and Supabase. The API also includes duplicate detection to reject identical submissions from the same email for the same slot within a 10-minute window, preventing accidental double-clicks."*

### Q3: Why is server-side validation necessary if the frontend already validates inputs?
**Answer:**  
*"Client-side validation is primarily for user experience—it provides immediate visual feedback so the user doesn't submit typos. However, client-side validation can easily be bypassed by directly calling the API using tools like Postman, curl, or browser dev tools. Server-side validation is essential for security and data integrity; it ensures that only clean, well-formed, future-dated requests enter our database."*

### Q4: How is responsive design handled across different viewports?
**Answer:**  
*"We use Tailwind CSS's mobile-first responsive utility classes (`sm:`, `md:`, `lg:`). On mobile screens, the search panel stacks into a single column, venue cards display in single-column format, and the navigation collapses into an accessible slide-over drawer. On larger desktop displays, we leverage CSS Grid layouts to display 3-column venue grids and horizontal search bars."*

### Q5: What are the current limitations of this prototype?
**Answer:**  
*"In accordance with the assessment brief, payment gateway integration (Razorpay/Stripe) and live 2-way calendar sync with physical turf managers are simulated. The platform captures and persists a verified booking request with unique reference IDs, which would typically trigger a WhatsApp webhook or notification for human manager confirmation before final payment."*
