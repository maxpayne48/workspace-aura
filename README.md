# Workspace IQ

Build a high-performance, responsive, and functional premium B2B/B2C Workspace Aggregator web application. The platform must carry over the core look, feel, and directory model of Qdesq, but must completely revolutionize the user experience by replacing static forms with 5 deep, fully operational AI-driven features.

### 1. DESIGN, VISUALS & HOVER EFFECTS

- **Tone:** A perfect balance of highly professional enterprise software mixed with a stylish, modern fintech/proptech aesthetic (e.g., Linear/Stripe design language). Use deep charcoals, crisp clean whites, and vibrant accent hues (e.g., emerald green or rich electric indigo) to signify real-time data status.

- **Micro-interactions & Hover Effects:** 

  - Listing Cards must feature smooth spring-physics translations. When hovered, elevate the card slightly, expand the shadow footprint softly, and reveal a sleek glassmorphic overlay over the thumbnail showing quick metrics (e.g., "Network Speed: 150 Mbps", "92% Quiet Zone").

  - Primary UI call-to-action buttons must utilize subtle gradient shifts and border glows on hover.

### 2. REAL-WORLD DATA MODELING (CITIES & REAL OPERATORS)

Hardcode realistic data structures mapped across an expanded city directory (Mumbai, Delhi-NCR, Bangalore, Hyderabad, Pune, Chennai). Use real-world, verified marquee coworking operators and locations rather than dummy text:

- **Mumbai:** WeWork (BKC), Awfis (Lower Parel), Innov8 (Nariman Point), Smartworks (Andheri East).

- **Delhi-NCR:** AltF Coworking (Okhla), Innov8 (Saket), Spacetime (Connaught Place), Awfis (Gurgaon).

- **Bangalore:** BHIVE Workspace (Indiranagar), Cowrks (Residency Road), IndiQube (Nagavara), UrbanVault (Koramangala).

### 3. MANDATORY FUNCTIONAL AI FEATURES (NO PLACEHOLDERS)

#### Feature A: "Workspace Vibe & Video Player" (Fixes Static Photo Decay)

- **UI:** Each listing card features a primary visual. Clicking an embedded floating "Play Tour" button instantly opens an ultra-smooth, fast-loading modern video drawer or absolute overlay modal executing high-definition, contextual loops of the venue layout.

- **AI Telemetry Overlay:** Superimpose real-time, simulated IoT telemetry tickers directly over or next to the video playback. Render live updating visual charts showing:

  - An active "Live Noise Level Decibel Index" (fluctuating dynamically between 35dB - 62dB).

  - A real-time "Wi-Fi Latency Matrix" (showing current ping, packet health, and load line).

#### Feature B: "Predictive Hybrid Roster & Capacity Optimizer" (Fixes Wasted Enterprise Spend)

- **UI:** A beautiful interactive step-slider control interface embedded right into the workspace recommendation panel.

- **Inputs:** Ask the user via clean numerical sliders or input nodes: "Total Employees?" and "How many days per week does an average employee work from the office (Hybrid Matrix)?"

- **AI Computation Logic:** Build an exact operational algorithm:

  Total Required Seats = Math.ceil(Total Employees * (Days Per Week / 5) * 1.15) // Includes 15% safety buffer for peak concurrency days.

- **Output:** Dynamically update the listing query view instantly based on this calculation. Show the user a clear cost comparison alert: "Your hybrid pattern requires exactly X seats, saving you Y% compared to a traditional 1:1 fixed lease setup."

#### Feature C: "The Real-Time Live Availability Ticker" (Fixes Ghost Listings & Form Anxiety)

- **UI:** Replace the opaque "Request Callback" landing page with a live, streaming interactive status tracker. 

- **Behavior:** When a user clicks "Book Demo" or "Secure Quote", animate a high-fidelity "AI Handshake Protocol" showing the system pinging the space management software.

- **Output:** Instantly return one of three crisp live states for that location:

  - **Trending & Active:** "🟢 4 Private Cabins available for immediate onboarding."

  - **Currently Taken (With Dynamic Countdown):** "🟡 100% Occupied. Next 20-seat team bay vacating on July 1, 2026. Join the automated waitlist queue."

  - **Flash Status:** Displays clean tags labeling spaces as [High Demand], [Available Now], or [Reserved].

#### Feature D: "Dynamic Algorithmic Price Estimator" (Fixes Opaque B2B Quote Bottlenecks)

- **UI:** Next to listings requiring bespoke quotes, render an intelligent breakdown calculation panel instead of blank space.

- **Logic:** Generate dynamic, realistic price brackets using base micro-market math modified by the length of the lease duration selected by the user. 

- **Output:** Instantly show an "AI Estimated Commercial Bracket" (e.g., ₹12,300 - ₹13,500 / seat / month) accompanied by a mini breakdown chart detailing exactly what is included (e.g., maintenance, IT architecture setup, printing allocations).

#### Feature E: "Nova Conversational Advisor v2" (Fixes Keyword-only Constraints)

- **UI:** A persistent floating conversational dock at the lower right quadrant or an absolute prominent home bar.

- **Behavior:** Users must be able to input unstructured, complex natural language statements.

- **Logic:** Build a local client-side semantic parser. If a user types complex parameters like *"We are a 15-person engineering team split across two shifts near a metro station under 12k"*, extract keywords (`engineering`, `shifts`, `metro`, `12k`) and immediately filter the visible UI workspace catalog to present items matching those exact conditions, outputting a narrative message: *"Optimizing for 24/7 access (shift work) within 500 meters of public transport lines..."*

### 4. ARCHITECTURAL CODE REQS

- Build utilizing a clean component architecture (React/Next.js or unified HTML/Tailwind/JS frameworks). 

- Fully functional application: ensure every dropdown toggles, every slider triggers instant array mapping filtering, the conversational input updates state on submission, and the video popups play real media or high-fidelity visual mock-ups seamlessly.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://workspace-aura.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f7621f16-3bf2-4cbd-9625-b01b6377df12).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
