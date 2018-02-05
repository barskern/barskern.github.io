import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Row, Col, Divider } from 'antd'
import { graphql } from 'graphql'

import AuthorAvatar from '../../components/AuthorAvatar'

const { Footer } = Layout

const CustomFooter = (props) => {
  const { authorInfo, authorAvatarData } = props
  const avatarURL = authorAvatarData.avatar.newSize.src

  return (
    <Footer style={{
      background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0) 100%)'
    }}>
      <Row>
        <Col span={4}>
          <AuthorAvatar authorInfo={authorInfo} avatarURL={avatarURL} />
        </Col>
        <Col span={2}>
          <Divider style={{ height: '65px', background: 'rgba(0,0,0,0.3)' }} type='vertical' />
        </Col>
        <Col span={18}>
          {authorInfo.description}
        </Col>
      </Row>
    </Footer>
  )
}
CustomFooter.propTypes = {
  authorInfo: PropTypes.object.isRequired,
  authorAvatarData: PropTypes.object.isRequired
}

export default CustomFooter

export const query = graphql`
fragment authorAvatarData on File {
  avatar: childImageSharp {
    newSize: resize (width: 64, height: 64){
      src
    }
  }
}
fragment authorInfo on author_2 {
  name
  description
  email
  urls {
    github
  }
}
`
