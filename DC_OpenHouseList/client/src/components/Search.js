import React, { Component } from 'react';
import Days from './Days';
import Neighborhood from './Neighborhood';
import Results from './Results';
import Featured from './Featured';
import axios from 'axios';
import jquery from 'jquery';

class Search extends Component{
  constructor(props){
    super(props);
    this.state={
      pressed:false,
      pressed2:false,
      day:'',
      neighborhood:'',
      step:''
    }
  }
  pressed_toggle(e){
    e.preventDefault();
    let $item = jquery(e.target).closest('span');
    if($item.hasClass('btn-pressed')){
      $item.removeClass('btn-pressed');
    }else{
      jquery('.btn-3d').removeClass('btn-pressed');
      $item.addClass('btn-pressed');
    }
  }
  saturday(e){
    e.preventDefault();
    setTimeout(()=>{
      this.setState({
        day:'saturday',
        step:'neighborhoods'
      });
    },250);
    let $item = jquery(e.target).closest('span');
    this.pressed_toggle(e);
  }
  sunday(e){
    e.preventDefault();
    setTimeout(()=>{
      this.setState({
        day:'sunday',
        step:'neighborhoods'
      });
    },250);
    let $item = jquery(e.target).closest('span');
    this.pressed_toggle(e);
  }
  selectNeighborhood(e,subd){
    let $item = jquery(e.target).closest('span');
    this.pressed_toggle(e);
    console.log('setting neighborhood: ',subd);
    this.setState({
      neighborhood:subd,
      step:'results'
    });
  }
  arrowToggle(e){
    let $item = jquery(e.target).closest('span');
    this.pressed_toggle(e);
  }
  render(){
    let btn_style = 'day-btn btn-3d btn-3d-blue';
    let options;
    let params = {
      day:this.state.day,
      neighborhood:this.state.neighborhood
    }
    switch(this.state.step){
      case '':
      options = (<Days saturday={this.saturday.bind(this)} sunday={this.sunday.bind(this)} pressed_toggle={this.pressed_toggle.bind(this)} />);
      break;
      case 'neighborhoods':
      options = (<Neighborhood selectNeighborhood={this.selectNeighborhood.bind(this)} arrowToggle={this.arrowToggle.bind(this)}/>);
      break;
      case 'results':
      options = (<Results params={params}/>);
      break;
    }
    return(
      <div>
          <div className="wrapper">
              { options }
              {/* <Days saturday={this.saturday.bind(this)} sunday={this.sunday.bind(this)} pressed_toggle={this.pressed_toggle.bind(this)} /> */}
            <Featured />
            <footer>
              {/* <img src="../images/RLAH_logo.png" alt="logo" /> */}
              IS A LOCALLY OWNED AND OPERATED FRANCHISE. REAL LIVING REAL ESTATE IS A NETWORK BRAND OF HSF
      AFFILIATES LLC, WHICH IS MAJORITY OWNED BY HOME SERVICES OF AMERICA, INC. A BERKSHIRE HATHAWAY AFFILIATE.
            </footer>
          </div>
      </div>
    );
  }
}

export default Search;
