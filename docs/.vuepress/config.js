import { defineUserConfig } from "vuepress";
import { getDirname } from "@vuepress/utils";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { bccCustomTheme } from "vuepress-theme-bcc-common-components/config.js";
import { findPathIcons } from "vuepress-theme-bcc-common-components/helpers/findPathIcons.js";
import { getSideBarItems } from "vuepress-theme-bcc-common-components/helpers/getSidebarItems.js";
import * as data from "./userConfig.json";

const __dirname = getDirname(import.meta.url);

console.log(getSideBarItems(__dirname));

export default defineUserConfig({
  lang: "en-US",
  title: data.title,
  description: data.description,
  base: data.base,
  theme: bccCustomTheme({
    logoDark: "bccLogoWhite.png",
    logo: "bccLogoDark.png",
    sidebar: getSideBarItems(__dirname),
    icons: findPathIcons(__dirname),
    navbar: [
      {
        text: "Setup",
        link: "/Setup.md",
      },
    ],
    repo: data.repo,
    // if your docs are in a different repo from your main project:
    docsRepo: data.repo,
    // if your docs are not at the root of the repo:
    docsDir: "docs",
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: "main",
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Edit this page on github",
    prev: true,
    next: true,
  }),
  plugins: [
    mdEnhancePlugin({
      // adds code tabs support
      codetabs: true,
    }),
  ],
});
