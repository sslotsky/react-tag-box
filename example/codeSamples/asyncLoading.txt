import { List } from 'immutable'
import React, { Component } from 'react'
import { TagBoxAsync } from '../src'
import './styles.scss'

const sampleTags = List(
  ['foo', 'bar', 'baz', 'blitz', 'quux', 'barf', 'balderdash'].map(t => ({
    label: t,
    value: t
  }))
)

const fetch = input => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(sampleTags.filter(t => t.label.includes(input)).toJS())
    }, 1500)
  })
}

export default class Async extends Component {
  state = {
    selected: sampleTags.take(1)
  }

  render() {
    const { selected } = this.state
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

    const remove = tag => {
      this.setState({
        selected: selected.filter(t => t.value !== tag.value)
      })
    }

    const placeholder = selected.isEmpty() ? '' :
      "Use the backspace key to delete the last tag"

    return (
      <TagBoxAsync
        fetch={fetch}
        selected={selected.toJS()}
        onSelect={onSelect}
        removeTag={remove}
        backspaceDelete={true}
        placeholder={placeholder}
      />
    )
  }
}


