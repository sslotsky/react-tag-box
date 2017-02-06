import { List } from 'immutable'
import React, { Component } from 'react'
import { TagBox, TAG_REJECTED } from '../src'
import './styles.scss'

const sampleTags = List(
  ['foo', 'bar', 'baz', 'blitz', 'quux', 'barf', 'balderdash'].map(t => ({
    label: t,
    value: t
  }))
)

export default class TagRejection extends Component {
  state = {
    tags: sampleTags,
    selected: sampleTags.take(1)
  }

  render() {
    const { tags, selected } = this.state
    const onSelect = tag => {
      if (tag.label.includes('@')) {
        return TAG_REJECTED
      }

      const newTag = {
        label: tag.label,
        value: tag.value || tag.label
      }

      return this.setState({
        selected: selected.push(newTag)
      })
    }

    const remove = tag => {
      this.setState({
        selected: selected.filter(t => t.value !== tag.value)
      })
    }

    return (
      <TagBox
        tags={tags.toJS()}
        selected={selected.toJS()}
        onSelect={onSelect}
        removeTag={remove}
        backspaceDelete={true}
        placeholder="You can reject tags you don't like (try submitting a tag with the @ character)"
      />
    )
  }
}


