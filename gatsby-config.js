module.exports = {
  siteMetadata: {
    title: 'Barskern',
    author: {
      name: 'Ole Martin Ruud',
      description: 'Working towards becoming a software engineer. Has a 🔥 passion for 💻💻.',
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
        path: `${__dirname}/src/pages`,
        name: 'pages'
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
            selector: /.+posts\/(\d+-\d+-\d+-[\w-]+)\/index\.md$/,
            replacer: '/$1/'
          },
          {
            name: 'date',
            selector: /.+posts\/(\d+-\d+-\d+)-[\w-]+\/index\.md$/,
            replacer: '$1'
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: 'images'
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-antd`,
      options: {
        style: true
      }
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        theme: './src/theme.js'
      }
    }
  ]
}
