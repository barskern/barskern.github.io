import React from 'react'
import PropTypes from 'prop-types'

import { Card, Divider } from 'semantic-ui-react'

import Filter from '../../components/Filter'

class FilterCards extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedTags: new Set(),
      searchValue: ''
    }
  }

  onTagClicked (e, { children }) {
    this.setState(({ selectedTags }) => ({
      selectedTags: new Set(
        selectedTags.delete(children)
          ? selectedTags
          : selectedTags.add(children)
      )
    })
    )
  }

  onSearchChange (e, { value }) {
    this.setState({ searchValue: value })
  }

  render () {
    const { entries, entryToCard } = this.props
    const { selectedTags, searchValue } = this.state

    const filteredEntries = entries
      // Filter based on tags
      .filter(a =>
        selectedTags.length === 0 ||
        Array.from(selectedTags)
          .every(selectedTag => a.tags.some(tag => tag === selectedTag))
      )
      // Filter based on search word
      .filter(a =>
        searchValue.length === 0 ||
        a.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        a.tags.some(tag => tag.includes(searchValue.toLowerCase()))
      )

    // Gets all possible tags from all blogposts
    const tags = Array.from(
      entries.reduce(
        (tags, entry) =>
          entry.tags.reduce((tags, tag) => tags.add(tag), tags),
        new Set()
      )
    )

    return (
      <div>
        <Filter
          tags={tags}
          onTagClicked={this.onTagClicked.bind(this)}
          onSearchChange={this.onSearchChange.bind(this)}
          value={searchValue}
          selectedTags={selectedTags} />
        <Divider hidden />
        <Card.Group centered stackable itemsPerRow={2} style={{ padding: '1em 0em' }}>
          {filteredEntries.map(entry => entryToCard({ key: entry.id, ...entry }))}
        </Card.Group>
      </div>
    )
  }
}

FilterCards.propTypes = {
  entries: PropTypes.object,
  entryToCard: PropTypes.func
}

export default FilterCards
