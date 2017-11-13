import React, { Component } from 'react';
require('./login.scss');

export default class App extends Component {
  render() {
		return (
			<div>
				<form>
          <input placeholder="username" type="text" />
          <input placeholder="password" type="text" />
          <input className="submit" style={{width:"101%", color:"white", fontSize:"20px", border:"none", backgroundColor:"#2889C3", height:"42px", margin:"10px 0px"}} type="submit" value="Submit" />
        </form>

        <form  method="post" action="http://localhost:3000/upload" enctype="multipart/form-data">
          <input type="file" name="file" id="fileToUpload"/>
          <input type="submit" value="upload" />
        </form>
			</div>
		);
	}
}
