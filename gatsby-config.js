module.exports = {
  siteMetadata: {
    title: 'Barskern',
    author: {
      name: 'Ole Martin Ruud',
      nickname: 'barskern',
      description: 'A novice programmer from Norway.\nI enjoy Rust, Web and C++.',
      email: 'barskern@outlook.com',
      urls: {
        'github': 'https://github.com/barskern'
      }
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/blogposts`,
        name: 'blogposts'
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-pathdata',
      options: {
        matchNodeType: 'MarkdownRemark',
        extract: [
          {
            name: 'path',
            selector: /.+(blogposts\/\d+-\d+-\d+-[\w-]+)\/index\.md$/,
            replacer: '/$1/'
          },
          {
            name: 'date',
            selector: /.+blogposts\/(\d+-\d+-\d+)-[\w-]+\/index\.md$/,
            replacer: '$1'
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/images`,
        name: 'images'
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data`,
        name: 'json'
      }
    },
    `gatsby-transformer-json`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Barkerns blog',
        short_name: 'Barskern',
        start_url: '/',
        background_color: '#2d2d2a',
        theme_color: '#555',
        display: 'minimal-ui',
        icon: "src/favicon.png",
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          twitter: true,
          yandex: true,
          windows: true
        }
      }
    }
  ]
}
