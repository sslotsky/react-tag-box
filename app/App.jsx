import { Set } from 'immutable'
import React, { Component } from 'react'
import Autocomplete from './Autocomplete'
import '../styles.scss'


export default class App extends Component {
  state = {
    tag: '',
    tags: Set.of('foo', 'bar', 'baz'),
    selected: Set.of('foo'),
    open: false
  }

  render() {
    const { tag, tags, selected, open } = this.state

    const pills = selected.map(t => (
      <li key={t}>{t}</li>
    ))

    const updateTag = e => {
      this.setState({ tag: e.target.value })
    }

    const select = (val) => {
      if (!val) {
        return
      }

      this.setState({
        tag: '',
        tags: tags.add(val),
        selected: selected.add(val)
      })
    }

    const blurTag = () => {
      if (open) {
        return
      }

      select(tag)
    }

    const submitTag = e => {
      if (e.which === 13) {
        select(tag)
      }
    }

    const autocompleteOpen = () => {
      this.setState({ open: true })
    }

    const autocompleteClose = () => {
      this.setState({ open: false })
    }

    return (
      <div>
        <ul>
          {pills}
        </ul>
        <input value={tag} onChange={updateTag} onBlur={blurTag} onKeyUp={submitTag} />
        <Autocomplete
          input={tag}
          tags={tags.toJS()}
          open={autocompleteOpen}
          close={autocompleteClose}
          select={select}
        />
      </div>
    )
  }
}
