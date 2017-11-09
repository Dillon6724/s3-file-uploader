import React, { Component } from 'react';
import Login from './Login';
import Header from './Header';

export default class App extends Component {
  render() {
		return (
			<div>
        <Header />
        <h1 style={{textAlign:"center"}}>File Upload</h1>
        <Login />
			</div>
		);
	}
}
