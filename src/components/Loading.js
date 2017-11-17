import React, { Component } from 'react';
require('./loading.scss')

export default class App extends Component {
  render() {
		return (
      <div>
        <img className="loader" src="http://base.emmis.acsitefactory.com/sites/g/files/exi266/f/201711/logo.png"/>
      </div>
		);
	}
}
