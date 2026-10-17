# Azharul Habib — Portfolio Website

> Personal portfolio website of **Azharul Habib**, Software Engineer and Machine Learning Developer. Built with **React 19**, **Vite**, and **Tailwind CSS v4**, designed for zero-config global edge deployment on **Cloudflare Pages**.

---

## 🎨 Design System & Color Palette

Inspired by modern developer and cyberpunk dark-mode aesthetics:

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Dark Navy** | `#0a192f` | Main background |
| **Light Navy** | `#112240` | Card & panel background |
| **Lightest Navy** | `#233554` | Borders & subtle separators |
| **Slate** | `#8892b0` | Body and secondary text |
| **Light Slate** | `#a8b2d1` | Subtitles and social icons |
| **Crisp Slate** | `#ccd6f6` | Headings and titles |
| **Neon Mint** | `#64ffda` | Accents, links, badges, and CTAs |

---

## 🚀 Projects Showcased

### Spotlight Projects (AI, Deep Learning & Systems)
1. **PhishAudit AI** — Real-time zero-day phishing detection Chrome extension with a 5-stage cascading ML pipeline (<2ms latency, 37 features, FastAPI, React 19).
2. **TCGA Colorectal Cancer Biomarker Pipeline** — Bioinformatics RNA-seq pipeline achieving 99.8% dimensionality reduction (Boruta algorithm, SMOTE, Scikit-Learn).
3. **Multimodal Music Context GNN + BERT** — Hybrid deep learning framework with segment-level Graph Neural Networks (GraphSAGE/GAT) and BERT cross-attention.
4. **Multi-Task Attention U-Net** — Joint pixel-level pet semantic segmentation and 37-breed classification with attention gating skip connections.

### Other Noteworthy Projects (Full-Stack, Graphics & Web)
1. **EasyStay (E_Booking)** — Multi-role rental property booking platform (Next.js 15, Django 5.1 REST Framework, SimpleJWT).
2. **Circle of Fury: 3D Boss Arena** — Procedural 3D squad combat game built purely from scratch using Python and PyOpenGL (GLUT/GLU).
3. **TurfNation Frontend** — Sports turf discovery, booking, and venue management web application (React 18, TypeScript, Tailwind CSS, shadcn/ui).

---

## 💻 Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```
Generates optimized static assets in the `dist/` directory.

---

## ☁️ Deploying to Cloudflare Pages for Free

### Method A: Connect with GitHub (Recommended — Auto-Deploys on `git push`)
1. Create a new GitHub repository: `https://github.com/new` (e.g. `portfolio`).
2. Push this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/azharulhabib/portfolio.git
   git push -u origin main
   ```
3. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) $\rightarrow$ **Workers & Pages** $\rightarrow$ **Create application** $\rightarrow$ **Pages** $\rightarrow$ **Connect to Git**.
4. Select the repository and confirm settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**. Your site will be live at `https://your-project.pages.dev` with free SSL and global CDN caching.

### Method B: Deploy Directly via Terminal (Wrangler)
```bash
npx wrangler pages deploy dist --project-name=azharul-portfolio
```
