# Usage

To use the template you will have to implement a workflow to use the repository as a starting place to build the documentation.

Here is the preared example workflow you can implement in the documentation:
```
name: Build and Deploy VuePress Site

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ["master","main"]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Check out the template repository
      - name: Check out template repository
        uses: actions/checkout@v2
        with:
          repository: bcc-code/bcc-docs-template

      # Pull the repository documentation and push it to the source folder
      - name: Check out current repository
        uses: actions/checkout@v2
        with:
          path: source

      # Copy the source documentation to the docs
      # ** TODO: The cp lines below should be modified to copy the .md files you want to include in the documentation 
      # ** The "$GITHUB_WORKSPACE/docs/" folder is the target for documenation (.md) files/folder. 
      # ** The "$GITHUB_WORKSPACE/docs/.vuepress/public/" folder is for static assets (such as logos etc.)
      - name: List folders
        run: |
          cd source
          cp -r docs/* $GITHUB_WORKSPACE/docs/
          # Optional: add static assets such as logos 
          # cp -r public/* $GITHUB_WORKSPACE/docs/.vuepress/public/
          ls
      # Configure parameters for documentation page
      # ** TODO: Consider replacing title with a more friendly name
      # ** The base and repository must match the repository name. Otherwise the page won't be compatibile with the github pages.
      - uses: microsoft/variable-substitution@v1
        with:
          files: "docs/.vuepress/userConfig.json"
        env:
          title: ${{ github.event.repository.name }}
          description: ${{ github.event.repository.description }}
          base: /${{ github.event.repository.name }}/
          repo: ${{ github.repository }}

      # Build the VuePress site
      - name: Build VuePress site
        run: npm i && yarn docs:build
     
      # Upload build output to artifact
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: docs/.vuepress/dist
        
 # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

