# Deploy to Vercel via GitHub - run this script from the project folder
# Requires: Git installed and in PATH, GitHub account

param(
    [string]$GitHubRepoUrl = ""
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "=== IFT Prototype: Push to GitHub for Vercel ===" -ForegroundColor Cyan
Write-Host ""

# 1. Init repo if needed
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
} else {
    Write-Host "Git repo already exists. Ensuring branch is main..." -ForegroundColor Yellow
    git branch -M main 2>$null
}

# 2. Add and commit
Write-Host "Adding files and committing..." -ForegroundColor Yellow
git add .
$status = git status --short
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "Nothing to commit (working tree clean)." -ForegroundColor Gray
} else {
    git commit -m "Initial commit: IFT desktop/mobile prototype"
    Write-Host "Committed." -ForegroundColor Green
}

# 3. Remote and push
if ([string]::IsNullOrWhiteSpace($GitHubRepoUrl)) {
    Write-Host ""
    Write-Host "Next steps (do these yourself):" -ForegroundColor Cyan
    Write-Host "1. Create a new repository on GitHub: https://github.com/new"
    Write-Host "   - Name it e.g. new-funds-transfer or ift-prototype"
    Write-Host "   - Do NOT add a README or .gitignore (repo should be empty)"
    Write-Host ""
    Write-Host "2. Run this script again WITH your repo URL, for example:"
    Write-Host '   .\deploy-to-github.ps1 -GitHubRepoUrl "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"'
    Write-Host ""
    Write-Host "   Or run these commands yourself (replace the URL):"
    Write-Host '   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git'
    Write-Host "   git push -u origin main"
    Write-Host ""
    Write-Host "3. Go to https://vercel.com -> Add New -> Project -> Import your repo -> Deploy"
    exit 0
}

# Add remote (remove existing 'origin' if present to avoid errors)
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Removing existing remote 'origin'..." -ForegroundColor Yellow
    git remote remove origin
}
Write-Host "Adding remote origin: $GitHubRepoUrl" -ForegroundColor Yellow
git remote add origin $GitHubRepoUrl
Write-Host "Pushing to main..." -ForegroundColor Yellow
git push -u origin main
Write-Host ""
Write-Host "Done. Now go to https://vercel.com -> Add New -> Project -> Import this repo -> Deploy" -ForegroundColor Green
