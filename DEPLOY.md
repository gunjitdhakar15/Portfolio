# Deploy This Portfolio

This site is a static portfolio. The easiest first deployment is GitHub Pages.

## Option 1: GitHub Pages

1. Create a new public GitHub repository.
2. Push this folder to that repository.
3. Open the repository on GitHub.
4. Go to `Settings` -> `Pages`.
5. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Save and wait for GitHub to publish the site.

The live URL will look like:

```text
https://YOUR_GITHUB_USERNAME.github.io/REPOSITORY_NAME/
```

## Option 2: Netlify

1. Go to Netlify.
2. Add a new site from GitHub.
3. Select this repository.
4. Leave build command empty.
5. Set publish directory to `/`.
6. Deploy.

## Before Publishing

- Replace placeholder GitHub link in `index.html`.
- Replace placeholder LinkedIn link in `index.html`.
- Add resume file and link it from the intro section.
