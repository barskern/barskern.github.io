import React from 'react'
import PropTypes from 'prop-types'

import { Search, Divider, Label } from 'semantic-ui-react'

import styles from './styles.sass'

class Filter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  render () {
    const { tags, onTagClicked, onSearchChange, value, selectedTags } = this.props
    const { isLoading } = this.state

    return (
      <div className={styles.filter}>
        <Search
          size='big'
          showNoResults={false}
          loading={isLoading}
          onSearchChange={(e, param) => {
            this.setState({ isLoading: param.value.length > 0 })
            setTimeout(() => this.setState({ isLoading: false }), 300)
            onSearchChange(e, param)
          }}
          value={value}
        />
        <Divider hidden />
        <Label.Group size='large'>
          {tags.map(tag =>
            <Label
              as='a'
              key={tag}
              color={selectedTags.has(tag) ? 'blue' : 'grey'}
              onClick={onTagClicked}
            >
              {tag}
            </Label>
          )}
        </Label.Group>
      </div>
    )
  }
}

Filter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  selectedTags: PropTypes.object,
  onTagClicked: PropTypes.func,
  onSearchChange: PropTypes.func,
  value: PropTypes.string
}

export default Filter
