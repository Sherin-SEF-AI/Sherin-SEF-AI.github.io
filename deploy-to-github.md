# Deploy Your Website to GitHub Pages

Follow these steps to make your website live on GitHub Pages:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Name your repository: `my-website` or `portfolio-website`
5. Make it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README, .gitignore, or license (we already have files)
7. Click **"Create repository"**

## Step 2: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Replace YOUR_USERNAME with your actual GitHub username
# Replace REPO_NAME with your repository name

git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** section (in the left sidebar)
4. Under **"Source"**, select **"Deploy from a branch"**
5. Under **"Branch"**, select **"main"** and **"/ (root)"**
6. Click **"Save"**

## Step 4: Your Website is Live!

Your website will be available at:
`https://YOUR_USERNAME.github.io/REPO_NAME`

## Example Commands

If your GitHub username is `sherin-sef-ai` and repository name is `my-website`:

```bash
git remote add origin https://github.com/sherin-sef-ai/my-website.git
git branch -M main
git push -u origin main
```

Your website URL would be: `https://sherin-sef-ai.github.io/my-website`

## Troubleshooting

### If you get authentication errors:
1. Use GitHub CLI: `gh auth login`
2. Or use Personal Access Token
3. Or use SSH keys

### If GitHub Pages doesn't work:
1. Check repository is public
2. Wait 5-10 minutes for deployment
3. Check Actions tab for deployment status

## Next Steps

1. **Custom Domain** (Optional): Add a custom domain in GitHub Pages settings
2. **SSL Certificate**: Automatically provided by GitHub
3. **Analytics**: Your GA4 tracking will work on the live site
4. **Updates**: Push changes with `git push` to update the live site

## Quick Commands for Future Updates

```bash
git add .
git commit -m "Update website"
git push
```

Your website will automatically update within a few minutes! 