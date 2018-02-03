const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                path
                date
              }
              id
            }
          }
        }
      }
    `).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        const post = path.resolve('./src/templates/Post/index.jsx')

        result.data.allMarkdownRemark.edges.forEach(edge => {
          const { id, fields } = edge.node
          const { date, path } = fields

          createPage({
            path: path,
            component: post,
            context: {
              path: path,
              date: date,
              id: id
            }
          })
        })
      })
    )
  })
}
