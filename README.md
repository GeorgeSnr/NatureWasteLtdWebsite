# Nature Waste Connect

> **Next-Gen Waste Management & Circular Economy ERP**  
> *Reduce. Reuse. Recycle.*

An enterprise waste management web portal engineered for **Nature Waste Management Ltd**, inspired by industrial ERP precision architectures.

---

## 🎨 Brand Identity & Color Palette

- **Primary Green:** `#0B6B1E` — Primary actions, brand emblems, and key accents.
- **Secondary Green:** `#9AD44D` — Highlights, progress indicators, and eco metrics.
- **Accent Yellow:** `#D7C93A` — Energy, warning badges, and focus elements.
- **Dark Gray:** `#4A4A4A` & `#181A1C` — Industrial dark surfaces, footers, and contrast elements.
- **Light Gray:** `#E8E8E8` & `#F8F9FA` — Backgrounds, structural dividing lines, and card containers.
- **White:** `#FFFFFF` — Clean readability.

---

## 🚀 Key Modules & Capabilities

1. **Smart Bin Telematics & IoT:**
   - Real-time ultrasonic fill-level sensor telemetry
   - Dynamic threshold alerts preventing street container overflows
   - Interactive live sensor simulator

2. **Dynamic Fleet Routing & Dispatch:**
   - Real-time vehicle GPS tracking (Compactor trucks, clinical vans, roll-offs)
   - Route optimization saving 34% in diesel consumption
   - Driver mobile terminal workflow with offline sync

3. **Material Recovery Facility (MRF) & Weighbridge:**
   - Digital intake scale integration
   - Polymer grade tracking (PET, HDPE, Cardboard, Glass)
   - Certified carbon offset certificates

4. **Multi-Currency & Municipal Billing:**
   - Mobile Money (MTN MoMo, Airtel Money) and bank integrations
   - Automated Pay-As-You-Throw (PAYT) RFID bin billing
   - ESG compliance manifests for NEMA & EPA audits

5. **Interactive Web Portal (`/portal`):**
   - **Resident / Client View:** Next pickup timer, assigned bin capacity gauge, on-demand bulky waste pickup scheduler, color-coded recycling sack orders, EcoRewards loyalty balance.
   - **Fleet Dispatch Console:** Active vehicle fleet health, live smart bin fill matrix, immediate one-click truck dispatch, real-time driver status.

6. **Interactive Waste Cost Estimator (`/pricing`):**
   - Dynamic monthly fee calculator based on container capacity (120L to 1100L) and collection frequency.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 15 (App Router, Server Components & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom chamfered polygon clip-paths (`chamfer-card`)
- **Icons:** Lucide React
- **Fonts:** Space Grotesk & IBM Plex Mono

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```
