// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Avengers Handbook',
  tagline: 'Your ultimate code companion',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://avengerscodelovers.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/engineering-wiki/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AvengersCodeLovers', // Usually your GitHub org/user name.
  projectName: 'engineering-wiki', // Usually your repo name.
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/AvengersCodeLovers/engineering-wiki/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/AvengersCodeLovers/engineering-wiki/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Avengers Handbook',
        logo: {
          alt: 'Logo',
          src: 'img/logo-avengers.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Standards',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/AvengersCodeLovers/engineering-wiki',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Standards',
                to: '/docs/overview',
              },
              {
                label: 'How to write docs?',
                to: 'https://tutorial.docusaurus.io/docs/category/tutorial---basics',
              },
            ],
          },
          {
            title: 'Services',
            items: [
              {
                label: 'aPortal',
                href: 'https://avengers.sun-asterisk.vn',
              },
              {
                label: 'SAL',
                href: 'https://sal.vn',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/AvengersCodeLovers/engineering-wiki',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Avengers Code Lovers. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
