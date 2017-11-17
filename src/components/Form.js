import React, { Component } from 'react';
require('./form.scss')

export default class App extends Component {
  render() {
		return (
      <form>
        <input type="file" onChange={this.props.handleImageChange} multiple/>
        <button type="submit" onClick={this.props.handleSubmit}>Upload Image</button>
      </form>
		);
	}
}
