const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
  title: "Polygon Wiki",
  tagline: "The official documentation for all Polygon products.",
  url: "https://wiki.polygon.technology",
  baseUrl: "/",
  favicon: "img/polygon/polygon-logo.svg",
  organizationName: "Polygon Labs",
  projectName: "matic-docs",
  customFields: {
    description: "Build your next blockchain app on Polygon.",
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      ko: {
        label: '한국어',
        direction: 'ltr',
        htmlLang: 'ko-KR',
        calendar: 'gregory',
        path: 'ko',
      },
    },
  },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/',
            from: ['/en/latest', '/en/'],
          },
          {
            to: '/docs/contribute/orientation',
            from: '/docs/pos/orientation',
          },
          {
            to: '/docs/contribute/community-maintainers',
            from: '/docs/pos/community-maintainers',
          },
          {
            to: '/docs/contribute/bug-bountry-program',
            from: '/docs/pos/bug-bountry-programs',
          },
          {
            to: '/docs/develop/meta-transactions/meta-transactions',
            from: '/docs/develop/metatransactions/metatransactions-biconomy',
          },
          {
            to: '/docs/develop/meta-transactions/meta-transactions',
            from: '/docs/develop/metatransactions/metatransactions-gsn',
          },
          {
            to: '/docs/develop/meta-transactions/network-agnostics',
            from: '/docs/develop/metatransactions/network-agnostics',
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/cexs-wallets',
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/fiat-on-ramp',
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/fiat-ramps'
          },
          {
            to: '/docs/develop/wallets/getting-started',
            from: '/docs/develop/cexs-wallets/cexs',
          },
          {
            to: '/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide',
            from: '/docs/develop/wallets/polygon-web-wallet/web-wallet-v2-guide',
          },
          {
            to: '/docs/faq/general-faq/',
            from: '/docs/category/faq/'
          },
          {
            to:'/docs/maintain/validate/kb/known-issues',
            from:'/docs/maintain/validate/faq/known-issues'
          },
          {
            to:'/docs/maintain/validate/kb/how-to',
            from:'/docs/maintain/validate/faq/how-to'
          },
          {
            to:'/docs/faq/validator-faq',
            from:'/docs/maintain/validate/faq/validator-faq'
          },
          {
            to:'/docs/maintain/validator/responsibilities',
            from:'/docs/maintain/validate/validator-responsibilities'
          },
          {
            to:'/docs/operate/technical-requirements',
            from:'/docs/develop/network-details/technical-requirements'
          },
          {
            to:'/docs/operate/snapshot-instructions-heimdall-bor',
            from:'/docs/develop/network-details/snapshot-instructions-heimdall-bor'
          },
          {
            to:'/docs/operate/endpoints',
            from:'/docs/develop/network-details/endpoints'
          },
          {
            to:'/docs/operate/access-node-alchemy',
            from:'/docs/develop/network-details/access-node-alchemy'
          },
          {
            to:'/docs/operate/full-node-deployment',
            from:'/docs/develop/network-details/full-node-deployment'
          },
          {
            to:'/docs/operate/full-node-binaries',
            from:'/docs/develop/network-details/full-node-binaries'
          },
          {
            to:'/docs/operate/full-node-docker',
            from:'/docs/develop/network-details/full-node-docker'
          },
          {
            to:'/docs/operate/full-node',
            from:'/docs/develop/network-details/full-node'
          },

        ],
        createRedirects: function (existingPath) {
          if (existingPath.startsWith('/docs/validate/')) {
            return [existingPath.replace('/docs/maintain/')
          ];
          }
        },
      },
    ],
  ],
  onBrokenLinks: 'log',
  themeConfig: {
    metadata: [{name: 'description', content: 'Welcome to Polygon Wiki, the official documentation for Polygon. Learn about Polygon and its suite of Ethereum-scaling solutions.'}],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    category: {
      emoji: ''
    },
    footer: {
      style: 'light',
      links: [
        {
          title: "Solutions",
          items: [
              {
                  label: "Polygon PoS",
                  href: "https://polygon.technology/solutions/polygon-pos/"
              },
              {
                label: "Polygon Edge",
                href: "https://polygon.technology/solutions/polygon-edge/"
              },
              {
                  label: "Polygon Supernets",
                  href: "https://polygon.technology/polygon-edge-supernets/"
              },
              {
                label: "Polygon zkEVM",
                href: "https://polygon.technology/solutions/polygon-zkevm/"
              },
              {
                label: "Polygon Avail",
                href: "https://polygon.technology/solutions/polygon-avail/"
              },
              {
                label: "Polygon Zero",
                href: "https://polygon.technology/solutions/polygon-zero/"
              },
              {
                label: "Polygon Miden",
                href: "https://polygon.technology/solutions/polygon-miden/"
              },
          ]
        },
        {
          title: "Developers",
          items: [
              {
                  label: "Get Started",
                  href: "https://wiki.polygon.technology/docs/develop/getting-started/"
              },
              {
                  label: "Advocate Program",
                  href: "https://polygon.technology/advocate-program/"
              },
              {
                label: "Polygon Funds",
                href: "https://polygon.technology/funds/"
              },
              {
                  label: "Bug Bounty",
                  href: "https://immunefi.com/bounty/polygon/"
              },
              {
                label: "dApps",
                href: "https://polygon.technology/ecosystem/"
              },
              {
                label: "Polygon Lightpaper",
                href: "https://polygon.technology/lightpaper-polygon.pdf"
              },
              {
                label: "Matic Whitepaper",
                href: "https://github.com/maticnetwork/whitepaper/"
              },
          ]
        },
        {
          title: "Native dApps",
          items: [
                  {
                    href: 'https://wallet.polygon.technology',
                    label: 'PoS Wallet',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://wallet.polygon.technology/polygon/bridge/deposit',
                    label: 'PoS Bridge',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://staking.polygon.technology/',
                    label: 'PoS Staking',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://polygonscan.com/',
                    label: 'PoS Explorer',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://wallet.hermez.io/login',
                    label: 'Hermez Wallet',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://explorer.hermez.io/',
                    label: 'Hermez Explorer',
                    target: '_blank',
                    rel: null,
                  },
                  {
                    href: 'https://www.dappstorekit.io/',
                    label: 'dApp Store Kit',
                    target: '_blank',
                    rel: null,
                    position: 'right',
                  },
                ],
        },
        {
          title: "Polygon Labs",
          items: [
              {
                label: "About Us",
                href: "https://polygon.technology/about/"
              },
              {
                label: "Contact",
                href: "https://polygon.technology/contact-us/"
              },
              {
                label: "Transparency Sheet",
                href: "https://polygon.technology/transparency-sheet/"
              },
              {
                  label: "Blogs",
                  href: "https://blog.polygon.technology/"
              },
              {
                label: "Brand Kit",
                href: "https://www.notion.so/polygontechnology/Brand-Resources-2cd18ae436584e98a6c5aae56db73058/"
              },
              {
                  label: "Careers",
                  href: "https://polygon.technology/careers/"
              },
              {
                label: "Ecosystem Careers",
                href: "https://ecosystemjobs.polygon.technology/jobs/"
              },
            ]
        },
        {
          title: "Community",
          items: [
              {
                href: 'https://twitter.com/0xPolygon',
                label: 'Twitter',
              },
              {
                href: 'https://discord.com/invite/0xPolygon',
                label: 'Discord',
              },
              {
                href: 'https://forum.polygon.technology/',
                label: 'Forum',
              },
              {
                href: 'https://www.reddit.com/r/0xPolygon/',
                label: 'Reddit',
              },
              {
                href: 'https://t.me/polygonofficial',
                label: 'Telegram',
              },
              {
                label: "Get Updates",
                href: 'https://polygon.technology/notifications/',
              },
            ]
          },
    ],
    logo: {
      alt: 'Polygon Logo',
      src: 'img/polygon/polygon-logo.svg',
      href: 'https://polygon.technology/',
    },
    copyright: `Copyright © ${new Date().getFullYear()} Polygon Labs`,
    },
    image: 'img/polygon-wiki.png',
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
      defaultLanguage: "javascript",
      additionalLanguages: ['solidity']
    },
    algolia: {
      indexName: "matic_developer",
      appId: '16JCDEHCCN',
      apiKey: "757c19b23127e9c6959da7f13b71cfab",
      contextualSearch: true,
      algoliaOptions: {
        attributesToSnippet: ['content:20'],
      },
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: "Polygon logo",
        src: "/img/polygon/polygon-logo.webp",
        srcDark: "/img/polygon/polygon-logo.webp",
        // width: 100,
        // height: 500,
        // href: 'https://wiki.polygon.technology/', // default to siteConfig.baseUrl
        target: "_self", // by default, this value is calculated based on the `href` attribute (the external link will open in a new tab, all others in the current one)
      },
      items: [
        {
          label: "Explore",
          position: "left",
          items: [
                  {
                    to: '/docs/category/blockchain-basics',
                    label: 'Blockchain',
                    target: '_self',
                    rel: null,
                  },
                  {
                    to: '/docs/category/polygon-basics',
                    label: 'Polygon',
                    target: '_self',
                    rel: null,
                  },
                  {
                    to: '/docs/maintain/govern/governance-pos',
                    label: 'Governance',
                    target: '_self',
                    rel: null,
                  },
                  {
                    to: 'https://university.polygon.technology/',
                    label: 'Polygon University',
                    target: '_blank',
                    rel: null,
                  }
                ],
        },
        {
          label: "Build",
          position: "left",
          items: [
                  {
                    href: '/docs/develop/getting-started',
                    label: 'Build on PoS',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/zkEVM/develop',
                    label: 'Build on zkEVM',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/develop/ethereum-polygon/matic-js/get-started',
                    label: 'Matic SDK',
                    target: '_self',
                    rel: null,
                  },

                  /* Removing these links till finalization
                  {
                    href: 'https://github.com/0xPolygon/polygon-edge',
                    label: 'Edge',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/supernets/overview',
                    label: 'Supernets',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: 'https://github.com/maticnetwork/avail',
                    label: 'Avail',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/miden/design/main',
                    label: 'Miden',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/polygonid/verifier/verifier-overview',
                    label: 'ID',
                    target: '_self',
                    rel: null,
                  },
                */
                ],
        },
        {
          label: "Operate",
          position: "left",
          items: [
                  {
                    href: '/docs/operate/technical-requirements',
                    label: 'Run a PoS node',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/zkEVM/setup-local-node',
                    label: 'Run a zkEVM node',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/edge/get-started/installation',
                    label: 'Run an Edge node',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/miden/intro/usage',
                    label: 'Run a Miden VM',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/category/operate-a-node',
                    label: 'Run an Avail node',
                    target: '_self',
                    rel: null,
                  },
                ],
        },
        {
          label: "Protocols",
          position: "left",
          items: [
                  {
                    href: '/docs/pos/polygon-architecture',
                    label: 'PoS',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/zkEVM/introduction/',
                    label: 'zkEVM',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/edge/overview',
                    label: 'Edge',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/supernets/overview',
                    label: 'Supernets',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/avail/introduction/what-is-avail',
                    label: 'Avail',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/miden/intro/main',
                    label: 'Miden',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/polygonid/overview',
                    label: 'ID',
                    target: '_self',
                    rel: null,
                  },
                ],
        },

        /* we should link out to the technical specifications for each protocol as reference material
        {
          label: "Specs",
          position: "left",
          items: [
                  {
                    href: '/docs/pos/polygon-architecture',
                    label: 'PoS',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/zkEVM/introduction/',
                    label: 'zkEVM',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/edge/overview/',
                    label: 'Edge',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/supernets/overview',
                    label: 'Supernets',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/avail/introduction/what-is-avail',
                    label: 'Avail',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/miden/intro/main',
                    label: 'Miden',
                    target: '_self',
                    rel: null,
                  },
                  {
                    href: '/docs/polygonid/overview',
                    label: 'Polygon ID',
                    target: '_self',
                    rel: null,
                  },
                ],
        }, */
        {
          label: "FAQs",
          position: "left",
          items: [
                  {
                    to: '/docs/faq/general-faq/',
                    label: 'PoS FAQ',
                    target: '_self',
                    rel: null,
                  },
                  {
                    to: '/docs/supernets/supernets-faq',
                    label: 'Supernet FAQ',
                    target: '_self',
                    rel: null,
                  },
                  {
                    to: '/docs/edge/faq/validators/',
                    label: 'Edge FAQ',
                    target: '_self',
                    rel: null,
                  },
                  {
                    to: '/docs/avail/faq',
                    label: 'Avail FAQ',
                    target: '_self',
                    rel: null,
                  },
                ],
        },
        {
          label: "Contribute",
          position: "left",
          items: [
            {
              href: '/docs/category/become-a-contributor',
              label: 'Guidelines',
              target: '_self',
              rel: null,
            },
            {
              href: '/docs/category/style-guide',
              label: 'Style Guide',
              target: '_self',
              rel: null,
            },
            {
              href: 'https://immunefi.com/bounty/polygon/',
              label: 'Bug Bounty',
              target: '_blank',
              rel: null,
            }
          ]
        },
        {
          label: "IPs",
          position: "right",
          items: [
            {
              href: 'https://www.alchemy.com/polygon',
              label: 'Alchemy',
              "target": "_blank",
              rel: null,
            },
            {
              "href": "https://www.ankr.com/",
              "label": "Ankr",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://blastapi.io/",
              "label": "Blast (Bware Labs)",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://blockpi.io/",
              "label": "BlockPI",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://www.blockspaces.com/web3-infrastructure",
              "label": "BlockSpaces",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://www.chainnodes.org/",
              "label": "Chainnodes",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://chainstack.com/build-better-with-polygon/",
              "label": "Chainstack",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://datahub.figment.io",
              "label": "DataHub (Figment)",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://getblock.io/en/",
              "label": "Getblock",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://infura.io",
              "label": "Infura",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://rpc.maticvigil.com/",
              "label": "MaticVigil",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://moralis.io",
              "label": "Moralis",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://www.portal.pokt.network/",
              "label": "Pocket Network",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://www.quicknode.com/chains/matic",
              "label": "QuickNode",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://docs.settlemint.com/docs/connect-to-a-polygon-node",
              "label": "SettleMint",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://docs.watchdata.io/blockchain-apis/polygon-api",
              "label": "WatchData",
              "target": "_blank",
              "rel": null
            },
            {
              "href": "https://nownodes.io/nodes/polygon-matic",
              "label": "NOWNodes",
              "target": "_blank",
              "rel": null
            }
          ]
        },
        {
          href: 'https://support.polygon.technology/support/home',
          label: 'Support',
          target: '_blank',
          rel: null,
          position: 'right',
        },
        {
          href: "https://github.com/maticnetwork",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
  },
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/maticnetwork/matic-docs/tree/master/",
          path: "docs",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [math],
          rehypePlugins: [[katex, {strict: false, throwOnError: true,globalGroup: true}]],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: 'G-LLNECLTBDN',
          anonymizeIP: true,
        },
      },
      // "@docuaurus/plugin-content-pages",
      // {
      //   path: "src/pages",
      //   routeBasePath: "",
      //   include: ["**/*.{js,jsx}"],
      // },
      // "@docusaurus/plugin-google-analytics",
      // "@docusaurus/plugin-sitemap",
      // {
      //   cacheTime: 600 * 1000, // 600 sec - cache purge period
      //   changefreq: "weekly",
      //   priority: 0.5,
      // },
    ],
  ],
};
