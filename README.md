[![npm version](https://badge.fury.io/js/react-tag-box.svg)](https://badge.fury.io/js/react-tag-box)
[![Build Status](https://travis-ci.org/sslotsky/react-tag-box.svg?branch=master)](https://travis-ci.org/sslotsky/react-tag-box)

# react-tag-box

A React component for creating, selecting, and removing tags. This library focuses entirely on tagging rather than attempting to be a generic autocomplete library, because
we think that single responsibility and custom built solutions are good things. 

## Demo

Check out our demo on [gh-pages](https://sslotsky.github.io/react-tag-box/).

## Usage

`react-tag-box` manages `Tag` objects in the form of `{ label: String, value: Any }`. Users provide the folliwng properties:

Property Name | Type | Description
---|:---:|:---
tags | `Array<Tag>` | The List of all tags
selected | `Array<Tag>` | The list of currently selected tags
onSelect | `function(tag)` | Function to be executed when a tag is selected or submitted
removeTag | `function(tag)` | Function called when the `remove` button is clicked on a tag

### Example

```javascript
import { List } from 'immutable'
import React, { Component } from 'react'
import { TagBox } from 'react-tag-box'
import './styles.scss'

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

    const remove = tag => {
      this.setState({
        selected: selected.filter(t => t.value !== tag.value)
      })
    }

    const unselected = tags.filter(t =>
      !selected.map(s => s.value).includes(t.value)
    )

    return (
      <div style={{ width: '50%' }}>
        <TagBox
          tags={unselected.toJS()}
          selected={selected.toJS()}
          onSelect={onSelect}
          removeTag={remove}
        />
      </div>
    )
  }
}
```
