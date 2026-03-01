# Host on Vercel – no downloads, no terminal

Everything is done in your **browser**. You don’t need to run any commands or install anything.

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
6. When it’s done, copy the URL (e.g. **https://new-funds-transfer.vercel.app**).
   - Add **?view=mobile** or **?view=desktop** to share a specific layout.

Done. No Git, PowerShell, or other tools needed on your laptop.
