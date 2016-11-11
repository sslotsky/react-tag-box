import { Set } from 'immutable'
import React, { Component } from 'react'
import Autocomplete from './Autocomplete'
import '../styles.scss'


export default class App extends Component {
  state = {
    tag: '',
    tags: Set.of('foo', 'bar', 'baz', 'blitz', 'quux', 'barf', 'balderdash'),
    selected: Set.of('foo'),
    open: false,
    considering: ''
  }

  render() {
    const { tag, tags, selected, open, considering } = this.state

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
        tags: tags.remove(val),
        selected: selected.add(val)
      })
    }

    const blurTag = () => {
      if (open) {
        select(this.state.considering)
      } else {
        select(tag)
      }
    }

    const keydown = e => {
      switch(e.which) {
        case 13:
          e.preventDefault()
          if (open) {
            select(considering)
          } else {
            select(tag)
          }
          break
        case 40:
          this.autocomplete.considerNext()
          break
        case 38:
          this.autocomplete.considerPrevious()
          break
        case 9:
          if (open) {
            e.preventDefault()
            if (e.shiftKey) {
              this.autocomplete.considerPrevious()
            } else {
              this.autocomplete.considerNext()
            }
          }
          break
      }
    }

    const autocompleteOpen = () => {
      this.setState({ open: true })
    }

    const autocompleteClose = () => {
      this.setState({ open: false })
    }

    const consider = (option) => {
      this.setState({ considering: option })
    }

    return (
      <div>
        <ul>
          {pills}
        </ul>
        <input value={tag} onChange={updateTag} onBlur={blurTag} onKeyDown={keydown} />
        <Autocomplete
          ref={node => this.autocomplete = node}
          input={tag}
          tags={tags.toJS()}
          open={autocompleteOpen}
          close={autocompleteClose}
          select={select}
          considering={considering}
          consider={consider}
        />
      </div>
    )
  }
}
