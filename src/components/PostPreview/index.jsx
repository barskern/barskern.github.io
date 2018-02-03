import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

const PostPreview = (props) => {
  const { title, date, author, path, excerpt } = props
  return (
    <div>
      <Link to={path}>
        <h2>{title}</h2>
      </Link>
      <small>{date} written by {author}</small>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
    </div>
  )
}

export default PostPreview

PostPreview.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired
}
