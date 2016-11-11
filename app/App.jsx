import { List } from 'immutable'
import React, { Component } from 'react'
import TagBox from './TagBox'
import '../styles.scss'

const sampleTags = List(
  ['foo', 'bar', 'baz', 'blitz', 'quux', 'barf', 'balderdash'].map(t => ({
    label: t,
    value: t
  }))
)

export default class App extends Component {
  state = {
    tags: sampleTags,
    selected: List.of(sampleTags.first())
  }

  render() {
    const { tags, selected } = this.state
    const onSelect = tag => {
      if (selected.map(t => t.value).includes(tag.value)) {
        return
      }

      const newTag = {
        label: tag.label,
        value: tag.value || tag.label
      }

      this.setState({
        tags: tags.filter(t => t.value !== newTag.value),
        selected: selected.push(newTag)
      })
    }

    return (
      <TagBox
        tags={tags.toJS()}
        selected={selected.toJS()}
        onSelect={onSelect}
      />
    )
  }
}
