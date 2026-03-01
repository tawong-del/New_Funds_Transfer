# Internal Funds Transfer – Desktop & Mobile Prototype

React prototype for **Internal Funds Transfer** with desktop and mobile layouts, aligned with Internal Positions (Web) look and feel and AllSpark design tokens. Business logic follows the [Internal Funds Transfer mobile version](https://github.com/.../TransferFundsPage.js) (single source of truth).

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Transfer flow**: Available balance, Pending balance, From account, To account, Amount, Transfer button. Validation: amount must be a positive number ≤ available balance; inline errors: "Amount exceeds available balance", "Enter a valid amount".
- **Demo bar**: At the top – switch **Desktop** | **Mobile** view and **Light** | **Dark** theme. View is synced to the URL (`?view=desktop` or `?view=mobile`) so you can share links.
- **Shareable links**: Use `?view=desktop` or `?view=mobile` (e.g. `https://your-url.com?view=mobile`) so stakeholders open the right layout.
- **Responsive**: With no `view` param, layout follows screen width (&lt; 768px = mobile). The demo bar overrides this so you can force desktop or mobile for demos.
- **Device frame**: When "Mobile" is selected on a large screen, the mobile layout is shown inside a phone-style frame.

## Shareable URL for stakeholders

You need a public URL so others can open the prototype without running it locally.

### Deploy to Vercel via GitHub (recommended)

**No terminal, no installs:** See **[DEPLOY-NO-INSTALL.md](DEPLOY-NO-INSTALL.md)** for browser-only steps (upload to GitHub in the browser, then deploy on Vercel).

**Option 1 – No terminal: upload in the browser, then Vercel**

You can host on Vercel without running any commands on your computer.

1. **Put the project on GitHub (all in the browser)**
   - Go to [github.com/new](https://github.com/new). Create a new repository (e.g. `new-funds-transfer`). Choose **Public**, leave “Add a README” unchecked, then **Create repository**.
   - On the new repo page, click **“uploading an existing file”** (or **Add file → Upload files**).
   - Open your project folder `New_Funds_Transfer` in File Explorer. Upload everything **except** the `node_modules` folder (drag and drop the folders `public`, `src`, `docs`, `Transfer positions (1)`, `Transfer funds on Qmobile (1)` if you want the references, and the files like `package.json`, `README.md`, `vercel.json`, etc.).  
   - If the repo already has a README, you can replace it or add the rest of the files in the root. Ensure the root has `package.json`, `public/`, and `src/`.
   - Click **Commit changes**.

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with **Continue with GitHub**.
   - Click **Add New…** → **Project**. Under **Import Git Repository**, select the repo you just created.
   - Leave the defaults (Build: `npm run build`, Output: `build`, Install: `npm install`). Click **Deploy**.
   - When it finishes, use the URL Vercel gives you (e.g. `https://your-project.vercel.app`). Add `?view=mobile` or `?view=desktop` to share a specific layout.

You never need to run Git or any command on your computer; everything is done in the browser.

---

**Option 2 – use the script (PowerShell, from project folder)**  
Run once to init, add, commit, and get instructions:
```powershell
.\deploy-to-github.ps1
```
Then create the repo on GitHub, and run again with your repo URL:
```powershell
.\deploy-to-github.ps1 -GitHubRepoUrl "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
```
Then connect the repo to Vercel (step 2 below).

**Option 3 – manual Git commands**

1. **Push this project to GitHub**
   - Create a new repository on [GitHub](https://github.com/new) (e.g. `new-funds-transfer` or `ift-prototype`).
   - From your project folder:
     ```bash
     git init
     git add .
     git commit -m "Initial commit: IFT desktop/mobile prototype"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     git push -u origin main
     ```
   - Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name.

2. **Connect the repo to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in (use “Continue with GitHub” if you prefer).
   - Click **Add New…** → **Project**.
   - Import your GitHub repository (e.g. `YOUR_USERNAME/YOUR_REPO_NAME`).
   - Vercel will detect Create React App. Leave the defaults:
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`
     - **Install Command**: `npm install`
   - Click **Deploy**. Vercel will build and publish the site.

3. **Share the live URL**
   - After the deploy finishes, Vercel gives you a URL like `https://your-project.vercel.app`.
   - Share that link with stakeholders. Add `?view=mobile` or `?view=desktop` for a specific layout, e.g. `https://your-project.vercel.app?view=mobile`.
   - Future pushes to `main` will trigger automatic redeploys.

This repo includes a `vercel.json` so the build and SPA routing work correctly on Vercel.

### Tunnel when running locally

For quick sharing before deploy, expose your local server with a tunnel:

- **ngrok** (if installed):
  ```bash
  npm start
  ```
  In another terminal:
  ```bash
  npx ngrok http 3000
  ```
  Share the generated URL (e.g. `https://abc123.ngrok.io`). Append `?view=mobile` or `?view=desktop` as needed.

- **localtunnel**:
  ```bash
  npm start
  ```
  In another terminal:
  ```bash
  npx localtunnel --port 3000
  ```
  Share the printed URL.

## Tech stack

- React 18 (JavaScript)
- AllSpark design tokens (CSS variables) for colors, typography, spacing, borders, shadows
- No backend; state is local (mock balance updates on transfer)

## Reference assets (in this repo)

- `Transfer positions (1)/` – Internal Positions UI screens (Happy path - MVP.png, Light mode UI Specs.png, etc.)
- `Transfer funds on Qmobile (1)/` – Transfer flow PDFs (light and dark mode)
- **`docs/PRD_EXTRACT.md`** – Extracted F/E changes and copy from **PRD: Internal Cash Transfers Improvement** (Phase 1 confirmation wording, status “Completed”/“Approved”, and backend touchpoints). The prototype shows the Phase 1 confirmation message after a successful transfer.

Design tokens and component patterns are based on AllSpark (DESIGN_TOKENS.md, COMPONENT_IMPLEMENTATION.md). Business logic is taken only from the Internal Funds Transfer mobile version (TransferFundsPage.js).
