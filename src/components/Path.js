import React, { Component } from 'react';
require('./path.scss')

export default class Path extends Component {
  render() {
		return (
      <div >
        <a className="path" href={this.props.pathToFile}>{this.props.pathToFile}</a>
      </div>
		);
	}
}
