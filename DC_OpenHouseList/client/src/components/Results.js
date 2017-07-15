import React, { Component } from 'react';
import jquery from 'jquery';
import axios from 'axios';
import currency from 'currency-formatter';
import moment from 'moment';

class Results extends Component{
  constructor(props){
    super(props);
    this.state={
      results:'',
      display:'list',
      dropdown:false,
      selected:'SORT BY TIME'
    }
  }
  componentWillMount(){
    let results;
    let params = this.props.params;
    console.log('params: ',params);
    axios.get('http://localhost:8080/info/open_houses').then(
      (response)=>{
        console.log('axios: ',response);
        results = response.data.results.map((listing)=>{
          let price = currency.format(listing.list_price,{ code: 'USD', decimalDigits: 0 });

          //get day of the week:
          let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          let date = moment(listing.open_house_events[0].event_start);
          let dow = date.day();
          let time = date.format('h:mmA');
          dow = days[dow];
          console.log('open house is on: ',dow);
          let style = {
            backgroundImage:'url('+listing.image_urls.all_thumb[0]+')',
            backgroundPosition:'center',
            backgroundSize:'cover',
            overlap:'hidden'
          };
          return(
            <div className="results-item row">
              <div style={style} className="results-div col-xs-4 results-item-pic">
                <div className="results-item-selector">
                </div>
                {/* <img src="./images/download-2.jpg" alt="listing image" /> */}
              </div>
              <div className="results-div col-xs-4 results-item-info">
                <div>
                  { listing.street_number } { listing.street_name } ({dow})<br/>
                  { price } <br/>
                </div>
              </div>
              <div className="results-div col-xs-4 results-item-time">
                <div className="results-item-time-box">
                  <div>{ time }</div>
                </div>
              </div>
            </div>
          );
        });
        this.setState({
          results
        })
      }
    ).catch((err)=>{
      console.log('error -',err);
    });
  }
  arrowToggle(e){
    this.pressed_toggle(e);
  }
  removeClass(){
    jquery('.btn-3d').removeClass('btn-pressed');
    jquery('.btn-3d').removeClass('list-btn-pressed');
    jquery('.btn-3d').removeClass('map-btn-pressed');
    jquery('.btn-3d').removeClass('down-btn-pressed');
  }
  pressed_toggle(e){
    e.preventDefault();
    let $item = jquery(e.target).closest('a');
    if($item.hasClass('btn-pressed')){
      $item.removeClass('btn-pressed');
    }else{
      this.removeClass();
      $item.addClass('btn-pressed');
    }
  }
  listToggle(e){
    e.preventDefault();
    let $item = jquery(e.target).closest('a');
    if($item.hasClass('list-btn-pressed')){
      $item.removeClass('list-btn-pressed');
    }else{
      this.removeClass();
      $item.addClass('list-btn-pressed');
    }
    this.setState({
      display:'list'
    });
  }
  mapBtnToggle(e){
    e.preventDefault();
    let $item = jquery(e.target).closest('a');
    if($item.hasClass('map-btn-pressed')){
      $item.removeClass('map-btn-pressed');
    }else{
      this.removeClass();
      $item.addClass('map-btn-pressed');
    }
    this.setState({
      display:'map'
    });
  }
  downBtnToggle(e){
    e.preventDefault();
    let $item = jquery(e.target).closest('a');
    if($item.hasClass('down-btn-pressed')){
      $item.removeClass('down-btn-pressed');
    }else{
      this.removeClass();
      $item.addClass('down-btn-pressed');
    }
    this.setState({
      dropdown: !this.state.dropdown
    });
  }
  highlight(e){
    let item = e.target;
    item.className+=" highlighted";
  }
  highlight_off(e){
    let item = e.target;
    item.className-=" highlighted";
  }
  select(e){
    let item = e.target;
  }

  render(){
    let results = this.state.results;
    let selected = this.state.selected;
    let display;

    // function initMap() {
    //   var uluru = {lat: -25.363, lng: 131.044};
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 4,
    //     center: uluru
    //   });
    //   var marker = new google.maps.Marker({
    //     position: uluru,
    //     map: map
    //   });
    // }

    let map = (
      <div id="map">

      </div>
    );
    switch(this.state.display){
      case 'list':
      display=results;
      break;
      case 'map':
      display=map;
      break;
      default:
      display=results;
    }
    let btn_style = 'day-btn btn-3d btn-3d-blue';

    let dropdown = (this.state.dropdown) ? (
        <div className="neighborhood-dropdown-list">
        <div className="neighborhood-dropdown-opacity"></div>
          <div className="sort-dropdown">
            <div id='time' onMouseEnter={this.highlight.bind(this)} onMouseLeave={this.highlight_off.bind(this)} onClick={this.select.bind(this)} className="subdivision">
              SORT BY TIME
            </div>
            <div id='price' onMouseEnter={this.highlight.bind(this)} onMouseLeave={this.highlight_off.bind(this)} onClick={this.select.bind(this)} className="subdivision">
              SORT BY PRICE
            </div>
          </div>
        </div>
    ): '';
    return(
      <div>
        <div className="results-search-options">

          <a onClick={this.arrowToggle.bind(this)} className="btn-3d results-option select-all btn-3d-blue-results" href="#">SELECT ALL</a>
          <a onClick={this.listToggle.bind(this)} className="btn-3d results-option list-view  btn-3d-blue-results" href="#">LIST VIEW</a>
          <a onClick={this.mapBtnToggle.bind(this)} className="btn-3d results-option map-view btn-3d-blue-results" href="#">MAP VIEW</a>
          <a className="btn-3d results-option sort-by  btn-3d-blue-results" href="#">
            <div>SORT BY TIME</div>
            { dropdown }
          </a>
          <a onClick={this.downBtnToggle.bind(this)} className="btn-3d results-option sort-by-arrow  btn-3d-blue-results" href="#"><span className="glyphicon glyphicon-triangle-bottom"></span></a>

        </div>
    <div className="results">
      { display }
      {/* <div className="results-item row">
        <div className="results-div col-xs-4 results-item-pic">
          <div className="results-item-selector">
          </div>
          <img src="./images/download-2.jpg" alt="listing image" />
        </div>
        <div className="results-div col-xs-4 results-item-info">
          <div>
            1234 Some Place<br/>
            Chevy Chase, MD<br/>
            11273
          </div>
        </div>
        <div className="results-div col-xs-4 results-item-time">
          <div className="results-item-time-box">
            12:00 PM
          </div>
        </div>
      </div> */}

    </div>
      </div>
    );
  }
}

export default Results;
