import React, { Component } from 'react'
import Codemirror from 'react-codemirror'
import 'codemirror/mode/jsx/jsx'

import BackspaceDeletion from './BackspaceDeletion'
import CustomRendering from './CustomRendering'
import TagRejection from './TagRejection'
import Async from './Async'
import './styles.scss'

import backspaceDeletion from 'raw!./codeSamples/backspaceDeletion.txt'
import customRendering from 'raw!./codeSamples/customRendering.txt'
import tagRejection from 'raw!./codeSamples/tagRejection.txt'
import asyncLoading from 'raw!./codeSamples/asyncLoading.txt'

export default class App extends Component {
  state = {
    sample: backspaceDeletion
  }

  render() {
    const config = {
      mode: 'javascript',
      theme: 'erlang-dark',
      readOnly: true
    }

    const seeCode = code => () =>
      this.setState({ sample: code })

    return (
      <div className="row">
        <div className="col-1">
          <h1>Backspace Deletion</h1>
          <BackspaceDeletion />
          <div>
            <small><button onClick={seeCode(backspaceDeletion)}>See Code</button></small>
          </div>
          <h1>Custom Rendering -
            <small><a onClick={seeCode(customRendering)}> See Code</a></small>
          </h1>
          <CustomRendering />
          <h1>Tag Rejection -
            <small><a onClick={seeCode(tagRejection)}> See Code</a></small>
          </h1>
          <TagRejection />
          <h1>Async Loading -
            <small><a onClick={seeCode(asyncLoading)}> See Code</a></small>
          </h1>
          <Async />
        </div>
        <div className="col-1 right">
          <h1>Check the code:</h1>
          <Codemirror options={config} value={this.state.sample} />
        </div>
      </div>
    )
  }
}
