import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import moment from 'moment'

import { Card, Avatar, Tooltip, Tag } from 'antd'

import { authorInitialsFromName } from '../../utils/author'
import {
  hexColorFromText,
  namedColorFromText
} from '../../utils/general'

const formatPreviewDate = (dateString) => {
  const date = moment(dateString)
  return date
    .isAfter(moment().month(-1)) ? date.fromNow() : date.format('D. MMMM, YYYY')
}

const makeTags = (tags) => {
  return tags.map(
    tag =>
      <Tag
        key={tag}
        color={namedColorFromText(tag)}>
        {tag}
      </Tag>
  )
}

const PostPreview = (props) => {
  const { title, date, author, path, excerpt, tags } = props

  const authorInitials = authorInitialsFromName(author)
  const authorAvatarURL = ''
  const avatarColor = hexColorFromText(author)

  const authorAvatar = (
    <Tooltip title={author} placement="bottomRight">
      <Avatar
        shape="square"
        size="large"
        style={{ backgroundColor: avatarColor }}
        src={authorAvatarURL}>
        {authorInitials}
      </Avatar>
    </Tooltip>
  )
  return (
    <Card
      title={title}
      hoverable
      onClick={() => navigateTo(path)}
      extra={formatPreviewDate(date)}
      style={{ width: '95%', margin: '10px auto' }}
      actions={[makeTags(tags)]}>
      <Card.Meta
        avatar={authorAvatar}
        description={excerpt}/>
    </Card>
  )
}

export default PostPreview

PostPreview.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  tags: PropTypes.array
}
