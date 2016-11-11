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
      const newTag = {
        label: tag.label,
        value: tag.value || tag.label
      }

      if (selected.map(t => t.value).includes(newTag.value)) {
        return
      }

      this.setState({
        selected: selected.push(newTag)
      })
    }

    const unselected = tags.filter(t =>
      !selected.map(s => s.value).includes(t.value)
    )

    return (
      <TagBox
        tags={unselected.toJS()}
        selected={selected.toJS()}
        onSelect={onSelect}
      />
    )
  }
}
