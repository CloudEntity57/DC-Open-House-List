import React, { Component } from 'react';

class Header extends Component{
  render(){
    return(
      <header>
        <div className="grey-bar">
        </div>
        <div className="lightgrey-bar">
        </div>

        <div id="header-nav">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse" name="button">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><i className="glyphicon glyphicon-play"></i>SUNDAY</li>
              <li><i className="glyphicon glyphicon-play"></i>SATURDAY</li>
              <li><i className="glyphicon glyphicon-play"></i><a href="/index.html">HOME</a></li>
            </ul>
          </div>
        </div>
        <div id="header-image">
          <div id="header-transition">

          </div>
          <div className="header-title-container">
            <img className="img-responsive" src="./images/DC_open House_sm-10.svg" alt="title" />
          </div>
        </div>
        <div className="yellow-bar"></div>
        <div className="red-bar"></div>
      </header>
    );
  }
}

export default Header;
