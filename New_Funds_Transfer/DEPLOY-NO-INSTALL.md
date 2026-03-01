# Host on Vercel – no downloads, no terminal

**Easiest way to get a shareable link.** Everything is done in your **browser**—no commands, no installs.

---

## Step 1: Put the project on GitHub (in the browser)

1. Go to **https://github.com/new**
2. Repository name: e.g. **new-funds-transfer**
3. Choose **Public**. Leave **“Add a README file”** **unchecked**.
4. Click **Create repository**.
5. On the new repo page, click **“uploading an existing file”** (or **Add file** → **Upload files**).
6. Open your project folder in File Explorer:
   ```
   C:\Users\014972\Desktop\VibeCode\New_Funds_Transfer
   ```
7. **Drag and drop** into the browser everything in that folder:
   - **Folders:** **`public`**, **`src`**, **`docs`**
   - **Files in the root:** **`package.json`**, **`package-lock.json`** (if present), **`README.md`**, **`vercel.json`**, **`.gitignore`**
   - **If you see a `node_modules` folder:** do not upload it (Vercel will create it when building). If you don’t see `node_modules`, that’s fine—just upload what you have.
8. Optional: upload **`Transfer positions (1)`** and **`Transfer funds on Qmobile (1)`** if you want the reference assets in the repo.
9. Click **Commit changes**.

---

## Step 2: Deploy on Vercel (in the browser)

1. Go to **https://vercel.com** and sign in with **Continue with GitHub**.
2. Click **Add New…** → **Project**.
3. Under **Import Git Repository**, select the repo you just created (e.g. **new-funds-transfer**).
4. Leave the settings as they are (Build: `npm run build`, Output: `build`).
5. Click **Deploy**.
6. When it’s done, copy your live URL (e.g. **https://new-funds-transfer.vercel.app**).
   - **Sharing:** Send that link to anyone—on a phone it will look like the mobile app, on a computer like the desktop version. No need to add anything to the link.
   - Optional: add **?view=mobile** or **?view=desktop** to force one layout when sharing.

Done. No Git, PowerShell, or other tools needed.

---

## If you get 404 on your Vercel URL

1. **Re-upload the latest files to GitHub**  
   Make sure **`vercel.json`** is in the repo (with the root and catch-all rewrites). Drag and drop the updated project folder again and commit.

2. **In Vercel dashboard**  
   - Open your project → **Deployments** → click the latest deployment.  
   - Check the **Build** step: did it finish with a green check, or with an error? If there’s an error, the build failed and the site will 404. Fix the error (e.g. add missing files) and redeploy.

3. **Project settings**  
   - **Settings** → **General** → **Root Directory** should be **empty** (project root).  
   - **Settings** → **Build & Development**:  
     - **Build Command:** `npm run build`  
     - **Output Directory:** `build`  
     - **Install Command:** `npm install`  
   Save, then **Deployments** → **Redeploy**.
