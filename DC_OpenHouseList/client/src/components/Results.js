import React, { Component } from 'react';
// import Map from './Map';
import jquery from 'jquery';
import axios from 'axios';
import currency from 'currency-formatter';
import moment from 'moment';
// import _ from "lodash";
import ReactMap from './ReactMap';



class Results extends Component{
  constructor(props){
    super(props);
    this.state={
      results:'',
      display:'list',
      selected_listings:'',
      dropdown:false,
      selected:'SORT BY TIME',
      popup:false,
      sort_order:'descending',
      markers: [
        {
          position: {
            lat: 25.0112183,
            lng: 121.52067570000001,
          },
          key: `Taiwan`,
          defaultAnimation: 2,
        }
      ]
    }
  }
  componentWillMount(){
    let results;
    let markers=[];
    let params = this.props.params;
    console.log('params: ',params);
    let stored_results = this.props.stored_results;
    let i = (stored_results) ? true: false;
    console.log('app has stored results: ',i, ', ',stored_results, ', and raw results: ',this.state.results);
    if(stored_results==false){
      axios.get('http://localhost:8080/info/open_houses').then(
      (response)=>{
        console.log('axios: ',response);
        results = response.data.results.map((listing)=>{
          let price = currency.format(listing.list_price,{ code: 'USD', decimalDigits: 0 });
          price = price.slice(0,price.length-3);
          //get day of the week:
          let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          let date = (listing.open_house_events[0]) ? moment(listing.open_house_events[0].event_start) : '';
          let dow = (date) ? date.day() : '';
          let time = (date) ? date.format('h:mmA') : '';
          let dowUC = (date) ? days[dow] : '';
          dow = (date) ? days[dow] : '';
          dow = (date) ? dow.toLowerCase() : '';

          //FILTER:

          // if(params.day && params.neighborhood){
          //   console.log('filtering by day and neighborhood :',params.day,' vs ',dow,', ','and ',params.neighborhood,' vs ',listing.subdivision);
          //   if( dow !==params.day || listing.subdivision !==params.neighborhood){
          //     console.log('no match');
          //     return;
          //   }

          //FILTER DAY:
          if(params.day){
            if(dow !==params.day){
              return;
            }
          }

          //map coordinates
          let style1 = {
            backgroundImage:'url('+listing.image_urls.all_thumb[0]+')'
          }
          markers.push(
            listing
          );

          let style = {
            backgroundImage:'url('+listing.image_urls.all_thumb[0]+')',
            backgroundPosition:'center',
            backgroundSize:'cover',
            overlap:'hidden'
          };
          return(
            <div id={listing.id} onClick={this.viewTabListing.bind(this)} className="results-item row">
              <div id={listing.id} style={style} className="results-div col-xs-4 results-item-pic">
                <div id='pause' className="results-item-selector">
                </div>
                {/* <img src="./images/download-2.jpg" alt="listing image" /> */}
              </div>
              <div id={listing.id} className="results-div col-xs-4 results-item-info">
                <div id={listing.id}>
                  { listing.street_number } { listing.street_name } ({dowUC})<br/>
                  { price } <br/>
                </div>
              </div>
              <div  id={listing.id} className="results-div col-xs-4 results-item-time">
                <div id={listing.id} className="results-item-time-box">
                  <div id={listing.id}>{ time }</div>
                </div>
              </div>
            </div>
          );
        });
        this.props.storeResults(markers,results);
        this.setState({
          results,
          markers,
          display:'map'
        });
      }).catch((err)=>{
        console.log('error -',err);
      });
}else{
  console.log('setting previous markers');
  this.setState({
    results:this.props.raw_stored_results,
    markers:stored_results
  });
}
}
  arrowToggle(e){
    this.pressed_toggle(e);
  }
  removeClass(){
    // jquery('.btn-3d').removeClass('btn-pressed');
    jquery('.btn-3d').removeClass('list-btn-pressed');
    jquery('.btn-3d').removeClass('map-btn-pressed');
    // jquery('.btn-3d').removeClass('down-btn-pressed');
  }
  pressed_toggle(e){
    e.preventDefault();
    let $item = jquery(e.target).closest('a');
    if($item.hasClass('btn-pressed')){
      $item.removeClass('btn-pressed');
    }else{
      // this.removeClass();
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
      // this.removeClass();
      $item.addClass('down-btn-pressed');
    }
    this.setState({
      dropdown: !this.state.dropdown
    });
  }
  highlight(e){
    let item = e.target;
    let index = '#'+e.target.id;
    jquery(index).addClass('highlighted');
  }
  highlight_off(e){
    let item = e.target;
    let index = '#'+e.target.id;
    jquery(index).removeClass('highlighted');
  }
  viewTabListing(e){
    e.preventDefault();
    let id = e.target.id;
    console.log('tab listing: ',id);
    if(id=='pause'){
      let new_id=e.target.parentElement.id;
      console.log('tab listing: ',new_id);
      return;
    }
    this.viewListing(id);
  }
  viewListing(listing){
    let view = this.state.markers.filter((val)=>{
      // console.log('marker: ',val.id, 'listing: ',listing);
      let list = parseInt(listing);
      return val.id == list;
    });
    console.log('viewing the listing: ',view);
    this.props.viewListing(view);
  }
  select(e){
    e.preventDefault();
    let item = e.target;
    console.log('selecting');
  }
  selectAll(e){
  }
  sortTime(e){
  }
  sortPrice(e){
  }
  sortAsc(e){
  }
  sortDesc(e){
  }

  render(){
    let results = this.state.results;
    let selected = this.state.selected;
    let display;
    let divstyle = {
      left:this.state.x,
      top:this.state.y
    }
    let map = (
      <ReactMap viewListing={this.viewListing.bind(this)} neighborhood={this.props.params.neighborhood} markers={this.state.markers}/>
      // <Map markers={this.state.markers} />
    );
    switch(this.state.display){
      case 'list':
      display=(results.length) ? results : (<div className="no-results-msg">Searching for all {this.props.params.neighborhood} listings on {this.props.params.day}. Thanks for your patience.<br/><img src={require("../images/loading.gif")} alt="please wait"/></div>);
      break;
      case 'map':
      display=map;
      break;
      default:
      display=results;
    }
    let btn_style = 'day-btn btn-3d btn-3d-blue';
    let drop = {
      onMouseEnter:this.highlight.bind(this),
      onMouseLeave:this.highlight_off.bind(this)
    }
    let dropdown = (this.state.dropdown) ? (
      <div>
        <div className="sort-dropdown-list">
        <div className="sort-dropdown-opacity">

        </div>
        </div>
        <div className="sort-text">
          <div id='time' {...drop} onClick={this.select.bind(this)} className="sort-values subdivision">
            SORT BY TIME
          </div>
          <div id='price' onMouseEnter={this.highlight.bind(this)} onMouseLeave={this.highlight_off.bind(this)} onClick={this.select.bind(this)} className="sort-values subdivision">
            SORT BY PRICE
          </div>
          <div className="sort-subvalues">
            <div className="subdivision" id='3' {...drop}>- $0-$500,000</div>
            <div className="subdivision" id='4' {...drop}>- $500,000-$1,000,000</div>
            <div className="subdivision" id='5' {...drop}>- $1,000,000-$3,000,000</div>
            <div className="subdivision" id='6' {...drop}>- $3,000,000+</div>
          </div>
        </div>
      </div>
    ): '';
    return(
      <div>
        <div className="results-search-options">

          <a onClick={this.arrowToggle.bind(this)} className="btn-3d results-option select-all btn-3d-blue-results" href="#"><div>SELECT ALL</div></a>
          <a onClick={this.listToggle.bind(this)} className="btn-3d results-option list-view  btn-3d-blue-results" href="#"><div>LIST VIEW</div></a>
          <a onClick={this.mapBtnToggle.bind(this)} className="btn-3d results-option map-view btn-3d-blue-results" href="#"><div>MAP VIEW</div></a>
          <a className="btn-3d results-option sort-by  btn-3d-blue-results" href="#">
            <div>SORT BY</div>
            { dropdown }
          </a>
          <a onClick={this.downBtnToggle.bind(this)} className="btn-3d results-option sort-by-arrow  btn-3d-blue-results" href="#"><span className="glyphicon glyphicon-triangle-bottom"></span></a>

        </div>
        <div>
        <div className="up-down-filter">
          <i onClick={this.sortAsc.bind(this)} className="glyphicon glyphicon-triangle-top"></i>
          <i onClick={this.sortDesc.bind(this)} className="glyphicon glyphicon-triangle-bottom"></i>
        </div>
      </div>
    <div className="results">
      { display }

    </div>
      </div>
    );
  }
}

export default Results;
