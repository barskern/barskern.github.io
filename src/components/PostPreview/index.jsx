import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import moment from 'moment'

import { Card, Tag } from 'antd'

const formatPreviewDate = (dateString) => {
  const date = moment(dateString)
  return date
    .isAfter(moment().month(-1)) ? date.fromNow() : date.format('D. MMMM, YYYY')
}

const style = {
  width: '95%',
  margin: '10px auto'
}

const PostPreview = ({ title, date, path, excerpt, tags }) =>
  <Card
    title={title}
    hoverable
    onClick={() => navigateTo(path)}
    extra={formatPreviewDate(date)}
    style={style}
    actions={[tags.map(tagName => <Tag key={tagName}>{tagName}</Tag>)]}>
    <Card.Meta
      description={excerpt}/>
  </Card>

export default PostPreview

PostPreview.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
}
