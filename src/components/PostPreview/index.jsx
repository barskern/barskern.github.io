import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import moment from 'moment'

import { Divider, Card, Label } from 'semantic-ui-react'

const formatPreviewDate = (dateString) => {
  const date = moment(dateString)
  return date
    .isAfter(moment().month(-1)) ? date.fromNow() : date.format('D. MMMM, YYYY')
}

const PostPreview = ({ title, date, path, excerpt, tags }) =>
  <Card
    link
    raised
    onClick={() => navigateTo(path)}>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>{formatPreviewDate(date)}</Card.Meta>
      <Card.Description>
        {excerpt}
        <Divider />
        <Label.Group>
          {tags.map(tag =>
            <Label key={tag} as='a' basic color='grey'>{tag}</Label>
          )}
        </Label.Group>
      </Card.Description>
    </Card.Content>
  </Card>

export default PostPreview

PostPreview.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
}
