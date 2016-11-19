import React, { Component } from 'react'
import BackspaceDeletion from './BackspaceDeletion'
import CustomRendering from './CustomRendering'
import TagRejection from './TagRejection'
import './styles.scss'

export default class App extends Component {
  render() {
    return (
      <div style={{ width: '50%' }}>
        <h1>Backspace Deletion</h1>
        <BackspaceDeletion />
        <h1>Custom Rendering</h1>
        <CustomRendering />
        <h1>Tag Rejection <small>(try submitting a tag with the @ character)</small></h1>
        <TagRejection />
      </div>
    )
  }
}
