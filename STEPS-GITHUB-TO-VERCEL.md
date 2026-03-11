# Step-by-step: GitHub → Vercel (no local run)

Use this if you **can’t run the project locally**. Everything is done in the **browser** and **File Explorer**.

**Already have a GitHub repo?** Skip "Create a new repository" and go straight to your repo. Then use **Add file** → **Upload files** to add or replace files with your project folder contents. The rest (Vercel import and deploy) is the same.

---

## Part A: Put the project on GitHub

### 1. Open your existing repository

- Open: **https://github.com/new**
- **Repository name:** e.g. `new-funds-transfer`
- **Public**
- **Do not** check “Add a README file”
- Click **Create repository**

### 2. Upload your project files

- On the new repo page, click **“uploading an existing file”** (or **Add file** → **Upload files**).

- Open this folder in File Explorer:
  ```
  C:\Users\014972\Desktop\VibeCode\New_Funds_Transfer
  ```

- **Important:** Upload the **contents** of that folder, not the folder itself.
  - So in the browser you should be dropping **files and folders that are inside** `New_Funds_Transfer`.

- **Include these (drag from inside `New_Funds_Transfer`):**
  - **Folders:** `public`, `src`
  - **Files (in the root):** `package.json`, `package-lock.json` (if you have it), `README.md`, `vercel.json`, `.gitignore`
  - Optional: `allspark (1)`, `docs`, `DEPLOY-NO-INSTALL.md`, `deploy-to-github.ps1`, `deploy-to-github.cmd`

- **Do not upload:** `node_modules` (if you see it). Vercel will install dependencies during the build.

- Click **Commit changes**.

---

## Part B: Deploy on Vercel

### 3. Sign in to Vercel

- Go to **https://vercel.com**
- Click **Sign in** → **Continue with GitHub**
- Authorize Vercel to use your GitHub account

### 4. Import your repository

- Click **Add New…** → **Project**
- Under **Import Git Repository**, find and select the repo you created (e.g. **new-funds-transfer**)
- Click **Import**

### 5. Configure the project (usually keep defaults)

- **Framework Preset:** Create React App (or leave as detected)
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`
- **Root Directory:** leave **empty** (so Vercel uses the repo root where `package.json` and `src` are)

Click **Deploy**.

### 6. Wait for the build

- Vercel will install dependencies and run the build. Wait until you see a green check and **“Your project has been deployed.”**

### 7. Open your live site

- Click **Visit** or copy the URL (e.g. `https://new-funds-transfer.vercel.app`).
- Share that link; it works on both phone and desktop.
- Optional: add `?view=mobile` or `?view=desktop` to the URL to force a layout, e.g.  
  `https://new-funds-transfer.vercel.app?view=mobile`

---

## If you see a 404

1. **Check the build**
   - In Vercel: your project → **Deployments** → open the latest deployment.
   - If the **Build** step failed (red X), the site will 404. Read the build log and fix the error (e.g. missing file), then upload the fix to GitHub and redeploy.

2. **Root Directory**
   - **Settings** → **General** → **Root Directory**
   - If your GitHub repo has **one folder** (e.g. `New_Funds_Transfer`) and inside it are `package.json` and `src`, set **Root Directory** to that folder name (e.g. `New_Funds_Transfer`), then **Save** and **Redeploy**.
   - If `package.json` and `src` are at the **top level** of the repo, leave Root Directory **empty**.

3. **Redeploy**
   - **Deployments** → three dots on the latest deployment → **Redeploy**.

---

## Updating the site later

1. In File Explorer, change the files in `C:\Users\014972\Desktop\VibeCode\New_Funds_Transfer` as needed.
2. Go to your GitHub repo → **Add file** → **Upload files**.
3. Drag the **updated** files/folders (e.g. `src`, or just the files you changed). Replace when asked.
4. Click **Commit changes**.
5. In Vercel: **Deployments** → **Redeploy** (or wait for automatic redeploy if you connected the repo).

Done. No terminal, no `npm`, no local run.
