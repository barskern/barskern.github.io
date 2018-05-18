import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby-link'

import { Card, Label, Image } from 'semantic-ui-react'

const ProjectPreview = ({ title, link, description, tags, thumbnailURL }) => {
  return (
    <Card
      link
      style={{ maxWidth: '400px' }}
      onClick={() => { window.location.href = link }}>
      <Image fluid src={withPrefix(thumbnailURL)} style={{ backgroundColor: '#2d2d2a', padding: '15px' }} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Label.Group>
          {tags.map(tag =>
            <Label key={tag} basic color='grey'>{tag}</Label>
          )}
        </Label.Group>
      </Card.Content>
    </Card>
  )
}

export default ProjectPreview

ProjectPreview.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  thumbnailURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
}
