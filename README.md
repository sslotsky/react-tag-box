[![npm version](https://badge.fury.io/js/react-tag-box.svg)](https://badge.fury.io/js/react-tag-box)
[![npm](https://img.shields.io/npm/dt/react-tag-box.svg)](https://github.com/sslotsky/react-tag-box)
[![npm](https://img.shields.io/npm/dm/react-tag-box.svg)](https://www.npmjs.com/package/react-tag-box)
[![Build Status](https://travis-ci.org/sslotsky/react-tag-box.svg?branch=master)](https://travis-ci.org/sslotsky/react-tag-box)
[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/sslotsky/react-tag-box)

# react-tag-box

A React component for creating, selecting, and removing tags. This library focuses entirely on tagging rather than attempting to be a generic autocomplete library, because
we think that single responsibility and custom built solutions are good things. 

## Demo

Check out our demo on [gh-pages](https://sslotsky.github.io/react-tag-box/).

## Usage

`react-tag-box` manages `Tag` objects in the form of `{ label: String, value: Any }`. Users provide the folliwng properties:

Property Name | Type | Required | Description
---|:---:|:---:|:---
tags | `Array<Tag>` | true | The List of all tags
selected | `Array<Tag>` | true | The list of currently selected tags
onSelect | `function(tag)` | true | Function to be executed when a tag is selected or submitted
removeTag | `function(tag)` | true | Function called when the `remove` button is clicked on a tag
renderNewOption | `function(text)` | false | Function for overriding the default `Add ${input}` prompt 
renderTag | `function(tag, remove)` | false | Function to override default tag rendering
placeholder | `string` | false | Override default placeholder text
backspaceDelete | `bool` | false | Whether or not the backspace key should delete the last tag. `false` by default 

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
