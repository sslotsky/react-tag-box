[![npm](https://img.shields.io/npm/v/react-tag-box.svg)](https://www.npmjs.com/package/react-tag-box)
[![npm](https://img.shields.io/npm/dt/react-tag-box.svg)](https://www.npmjs.com/package/react-tag-box)
[![npm](https://img.shields.io/npm/dm/react-tag-box.svg)](https://www.npmjs.com/package/react-tag-box)
[![Build Status](https://travis-ci.org/sslotsky/react-tag-box.svg?branch=master)](https://travis-ci.org/sslotsky/react-tag-box)
[![npm](https://img.shields.io/npm/l/express.svg)](https://github.com/sslotsky/react-tag-box)

# react-tag-box

A React component for creating, selecting, and removing tags. This library focuses entirely on tagging rather than attempting to be a generic autocomplete library, because
we think that single responsibility and custom built solutions are good things. 

## Demo

Check out our demo on [gh-pages](https://sslotsky.github.io/react-tag-box/).

## Usage

`react-tag-box` manages `Tag` objects in the form of `{ label: String, value: Any }`, and supports both preloaded and asynchronous autocomplete options by providing
two different components: `TagBox` and `TagBoxAsync`. Both components accept the following common properties:

Property Name | Type | Required | Description
---|:---:|:---:|:---
selected | `Array<Tag>` | true | The list of currently selected tags
onSelect | `function(tag)` | true | Function to be executed when a tag is selected or submitted
removeTag | `function(tag)` | true | Function called when the `remove` button is clicked on a tag
renderNewOption | `function(text)` | false | Function for overriding the default `Add ${input}` prompt 
selectedText | `string` | false | Text to display when the search input is already a selected tag. `'Already Selected'` by default.
renderTag | `function(tag, remove)` | false | Function to override default tag rendering
placeholder | `string` | false | Override default placeholder text
backspaceDelete | `bool` | false | Whether or not the backspace key should delete the last tag. `false` by default 
search | `function(tag, input)` | false | Function to determine if a given tag should be included in the autocomplete suggestions for a given input.
exactMatch | `function(tag, input)` | false | Function to determine if the tag matches the input. 

### TagBox

Users provide the following props in addition to the common props:

Property Name | Type | Required | Description
---|:---:|:---:|:---
tags | `Array<Tag>` | true | The List of all tags

#### Example

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

      this.setState({
        selected: selected.push(newTag)
      })
    }

    const remove = tag => {
      this.setState({
        selected: selected.filter(t => t.value !== tag.value)
      })
    }
    
    // optional
    // default behavior is case-sensitive search within tag label, like so: 
    // (tag, input) => tag.label.includes(input)
    const search = (tag, input) => {
      tag.label.toLowerCase().includes(input.toLowerCase())
    }
    
    // optional
    // default behavior is case-sensitive match against tag label, like so: 
    // (tag, input) => tag.label === input
    const exactMatch = (tag, input) => {
      tag.label.toLowerCase() === input.toLowerCase();
    }

    return (
      <div style={{ width: '50%' }}>
        <TagBox
          tags={unselected.toJS()}
          selected={tags.toJS()}
          onSelect={onSelect}
          removeTag={remove}
          search={search}
          exactMatch={exactMatch}
        />
      </div>
    )
  }
}
```

### TagBoxAsync

Users provide the following props in addition to the common props:

Property Name | Type | Required | Description
---|:---:|:---:|:---
fetch | `function(text)` | true | A function that returns a promise which resolves the tags to populate the autocomplete.
loadingText | `string` | false | Text to display when results are being fetched. `'Loading...'` by default.

#### Example

```javascript
import { List } from 'immutable'
import React, { Component } from 'react'
import { TagBoxAsync } from 'react-tag-box'
import './styles.scss'

// Mock server data. This would normally be in your database.
const sampleTags = List(
  ['foo', 'bar', 'baz', 'blitz', 'quux', 'barf', 'balderdash'].map(t => ({
    label: t,
    value: t
  }))
)

// Mock http request. This would normally make a request to your server to fetch matching tags.
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
```
