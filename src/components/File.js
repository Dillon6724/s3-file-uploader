import React, { Component } from 'react';
require('./file.scss');

export default class File extends Component {
  render() {
    const path = `https://s3.amazonaws.com/emmisdigitalfileuploader/${this.props.name}`
		return (
      <div className="path-container">
        <a className="path" href={path}>{this.props.name}</a>
      </div>
		);
	}
}
