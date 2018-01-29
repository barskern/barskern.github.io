import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Title = styled(Link)`
  display: block;
  text-decoration: none;
  font-size: 1.2em;
  color: black;
`
const Date = styled.small``
const Author = styled.small`
  &:before {
    content: ' ';
  }
`
const Excerpt = styled.p`
  color: ${props => props.theme.colors.accent[9]}
`

const PostPreview = ({ title, date, author, path, excerpt }) => {
  return (
    <div>
      <Title to={path}>{title}</Title>
      <Date>{date}</Date>
      <Author>{author}</Author>
      <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
    </div>
  )
}

export default PostPreview

PostPreview.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  path: PropTypes.string,
  date: PropTypes.string
}
