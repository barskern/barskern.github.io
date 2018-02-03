import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { navigateTo } from 'gatsby-link'

import styles from './style.less'

import MenuToggler from '../../components/MenuToggler'
import Logo from '../../components/Logo'

const { Header } = Layout

const CustomHeader = ({ siderCollapsed, toggleSider }) =>
  <Header className={styles['header']}>
    <MenuToggler
      className={styles['menu-toggler']}
      isMenuClosed={siderCollapsed}
      onClick={toggleSider} />
    <Logo
      onClick={() => navigateTo('/')}
      className={styles['home-button']}
    />
  </Header>

CustomHeader.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
  toggleSider: PropTypes.func.isRequired
}

export default CustomHeader
