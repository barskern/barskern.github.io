import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby-link'

import { Divider, Card, Label, Image } from 'semantic-ui-react'

const ProjectPreview = ({ title, link, description, tags, thumbnailURL }) => {
  return (
    <Card
      color='teal'
      link
      fluid
      onClick={() => { window.location.href = link }}>
      <Image src={withPrefix(thumbnailURL)} style={{ backgroundColor: '#333' }} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>
          {description}
          <Divider />
          {tags.map(tag =>
            <Label key={tag}>{tag}</Label>
          )}
        </Card.Description>
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
