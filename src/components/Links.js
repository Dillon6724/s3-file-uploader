import React, { Component } from 'react';
require('./links.scss')
import Path from './Path.js'

export default class Links extends Component {
  render() {
		return (
      <div className="path-container">
        <h2 className="title">Grab your links below!</h2>
        {this.props.paths.map((string, i) => {
           return <Path key={i} pathToFile={string} />
        })}
        <button className="upload" onClick={this.props.clearState}>Upload Some More</button>
      </div>
		);
	}
}
