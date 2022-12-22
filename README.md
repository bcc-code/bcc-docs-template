# Usage

To use the template you will have to implement a workflow to use the repository as a starting place to build the documentation.

Here is the preared workflow you can implement in the documentation:
```
name: Build and Deploy VuePress Site

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # Check out the repository
      - name: Check out repository
        uses: actions/checkout@v2
        with:
          repository: Kurczak1233/bcc-docs-template 

      # Pull the repository documentation and push it to the source folder
      - name: Check out test repository
        uses: actions/checkout@v2
        with:
          path: source

      # Copy the source documentation to the docs
      - name: List folders
        run: |
          cd source
          cp -r docs/* $GITHUB_WORKSPACE/docs/
          cp -r public/* $GITHUB_WORKSPACE/docs/.vuepress/public/
          ls

      - uses: microsoft/variable-substitution@v1
        with:
          files: "docs/.vuepress/userConfig.json"
        env:
          title: BCC Documentation CI/CD
          description: BCC Documentation description CI/CD
          base: /VuePress-CI-CD/
          repo: Kurczak1233/VuePress-CI-CD

      # Build the VuePress site
      - name: Build VuePress site
        run: npm i && yarn docs:build

      # Deploy build
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # deploy the default output dir of VuePress
          build_dir: docs/.vuepress/dist
          target_branch: gh-pages
          repo: Kurczak1233/VuePress-CI-CD
        env:
          # @see https://docs.github.com/en/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Workflow setup

You will have to adjust the workflow metadata. You can set them in variable substitution:
  title: BCC Documentation CI/CD
  description: BCC Documentation description CI/CD
  base: /VuePress-CI-CD/
  repo: Kurczak1233/VuePress-CI-CD
    (example)
  
Do not forget about changing the repository inside the deploy variable as well:
  repo: Kurczak1233/VuePress-CI-CD (example)
