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
          <div>
            <small><button onClick={seeCode(backspaceDeletion)}>See Code</button></small>
          </div>
          <BackspaceDeletion />
          <h1>Custom Rendering </h1>
          <div>
            <small><button onClick={seeCode(customRendering)}>See Code</button></small>
          </div>
          <CustomRendering />
          <h1>Tag Rejection</h1>
          <div>
            <small><button onClick={seeCode(tagRejection)}>See Code</button></small>
          </div>
          <TagRejection />
          <h1>Async Loading</h1>
          <div>
            <small><button onClick={seeCode(asyncLoading)}>See Code</button></small>
          </div>
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
