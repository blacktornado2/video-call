# 🚀 Product Requirements Document: Togetherly

---

### **Document Metadata**

| Attribute | Details |
| :--- | :--- |
| **Author** | Ankit |
| **Version** | 1.0 |
| **Status** | ✅ Draft |
| **Date** | September 11, 2025 |

---

### 🎯 1. Introduction & Objective

> **Togetherly** is a cross-platform mobile application designed to provide a simple, reliable, and high-quality video calling experience.

In an increasingly remote world, users need a frictionless way to connect visually with colleagues, friends, and family. This product aims to deliver a focused, core video communication tool without the bloat of larger platforms.

---

### 👥 2. Target Audience

* **Primary:** Individuals and small groups (2-4 people) who need a quick and easy way to initiate a video call (e.g., friends, family, small teams).
* **Secondary:** Users on both iOS and Android platforms looking for a consistent experience.

---

### 📝 3. User Stories

| ID | User Story |
| :--- | :--- |
| **US-101** | **As a** new user, **I want to** sign up easily using my email and a password **so that** I can secure my account. |
| **US-102** | **As a** logged-in user, **I want to** start a new call and get a unique, shareable link or room ID **so that** I can invite others to join me. |
| **US-103** | **As a** user, **I want to** join an existing call by entering a room ID or clicking a link **so that** I can connect with others. |
| **US-201** | **As a** participant, **I want to** see my own video feed (picture-in-picture) and the video feeds of others **so that** I can have a face-to-face conversation. |
| **US-202** | **As a** participant, **I want to** mute/unmute my microphone **so that** I can control what others hear. |
| **US-203** | **As a** participant, **I want to** turn my camera on and off **so that** I can control what others see. |
| **US-204** | **As a** participant, **I want to** easily leave or end the call **so that** I can disconnect from the conversation. |

---

### ✨ 4. Features & Functionality

| ID | Feature Description | Priority |
| :--- | :--- | :---: |
| **F-101** | Secure User Authentication (Email/Password) | **MVP** |
| **F-201** | Room Creation & Joining via a unique ID | **MVP** |
| **F-301** | Core 1-on-1 Video & Audio Call Functionality | **MVP** |
| **F-302** | Essential In-Call Controls (Mute, Toggle Video, End Call) | **MVP** |
| **F-303** | Self-View video feed (picture-in-picture) | **MVP** |
| **F-401** | Group Calls (supporting 3-4 participants) | V2 |
| **F-402** | In-Call Text Chat Panel | V2 |
| **F-403** | Screen Sharing Functionality | V2 |
| **F-404** | Call History & Contact List | V2 |

---

### 💻 5. Technical Requirements

* **Frontend:** `React Native` with `TypeScript`.
* **Backend:** `Node.js` with `Express.js` and `TypeScript`.
* **Real-Time Communication:** *WebRTC* for establishing peer-to-peer connections.
* **Signaling:** A WebSocket-based signaling server using *Socket.IO*.
* **Platform:** iOS and Android.
* **Infrastructure:** The backend will be deployed on a cloud platform (e.g., Google Cloud, AWS).
* **STUN/TURN Servers:** Configuration of STUN servers (e.g., Google's public servers) is mandatory. A production-ready *TURN* server (e.g., via Twilio) will be required for NAT traversal reliability.

---

### 🎨 6. Design & UX Considerations

* **UI Philosophy:** The user interface must be clean, minimal, and highly intuitive.
* **Focus on Video:** The primary screen will be dedicated to video feeds.
* **Controls:** In-call controls should be overlaid and set to auto-hide to avoid obstructing the view.
* **User Flow:** The journey from opening the app to starting or joining a call must be swift and require minimal steps.

##### Official Style Guide

###### **Color Palette: Soothing Lavender**

| Swatch | Role | HEX Code | Usage Guidelines |
| :--- | :--- | :--- | :--- |
| ⬜️ | **Primary Background** | `#FAF7FF` | The base for all screens, keeping the UI bright and clean. |
| 🟪 | **Primary Accent** | `#B2A4FF` | For primary buttons, active states, and key interactive elements. |
| 🟣 | **Secondary Accent** | `#7868E6` | For secondary actions, icons, and links. |
| ⚫️ | **Primary Text & Icons** | `#483D8B` | A soft, dark slate blue for all text and icons, ensuring readability. |
| ⚪️ | **Borders & Dividers** | `#E8E6ED`| For subtle separators and card outlines. |

###### **System Colors**

| Swatch | Role | HEX Code | Usage Guidelines |
| :--- | :--- | :--- | :--- |
| 🟢 | **Action / Call** | `#28A745` | Specifically for the "Start Call" or "Join" button. |
| 🔴 | **End / Danger** | `#DC3545` | **Exclusively** for the "Hang Up" or "End Call" button. |

###### **Typography**

* **Headings & Titles:**
    * **Font:** **Poppins** (Bold & SemiBold)
    * **Description:** A clean, modern, and friendly geometric sans-serif font for all major titles and headings.

* **Body Text & UI Elements:**
    * **Font:** **Inter** (Regular & Medium)
    * **Description:** A highly legible sans-serif font designed for UIs, perfect for all paragraphs, labels, and button text.

---

### 📈 7. Success Metrics

* **Adoption:** Daily Active Users (DAU) and total app downloads.
* **Engagement:** Average call duration and number of calls per user.
* **Quality:** App Store/Play Store ratings, focusing on call stability.
* **Reliability:** A high call connection success rate (>98%).

---

### ❓ 8. Open Questions

* What is the definitive scalability strategy for the signaling server to handle 10,000+ concurrent users?
* Which third-party TURN server provider offers the best performance/cost ratio for our target audience?
* What is the adaptive bitrate strategy for handling users on low-bandwidth networks?