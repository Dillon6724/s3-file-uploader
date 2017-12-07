import React, { Component } from 'react';
require('./links.scss');
import Path from './Path.js';
import Loading from './Loading.js'
import {Link} from 'react-router-dom';

export default class Links extends Component {
  render() {
		return (
      <div>
        {this.props.loading ?
          <div>
            <Loading/>
          </div>
        :
        <div className="links-container">
            <h2 className="title">Grab your links below!</h2>
            {this.props.paths.map((string, i) => {
               return <Path key={i} pathToFile={string} />
            })}
            <Link to="/" className="upload" onClick={this.props.clearState}>Upload Some More</Link>
          </div>
        }
      </div>
		);
	}
}
