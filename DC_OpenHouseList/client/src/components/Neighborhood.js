import React, { Component } from 'react';
import axios from 'axios'

class Neighborhood extends Component{
  constructor(props){
    super(props);
    this.state={
      dropdown:false,
      neighborhoods:[],
      selected:''
    }
  }
  componentWillMount(){
    //temporary - loading neighborhoods from DB while API key is for Columbia
    let neighborhoods = ["8000 GEORGETOWN PIKE", "ARNON RIDGE", "BALLANTRAE FARMS", "BALMORAL GREENS", "BATTLETOWN MAGISTERIAL DISTRICT OF CLARKE COUNTY", "BELLEVIEW ESTATES", "BIRCHWOOD", "BLUEMONT", "BOLINVAR FARM", "BRADDOCK WOODS", "BRADLEY FARMS", "BRADLEY HILLS", "BRANDES ESTATES", "BRUFF'S ISLAND", "BUCLAND FARM", "BURNING TREE", "CAMOTOP", "CHESTON ON WYE", "CHILDS POINT", "CLEVELAND PARK", "DIFFICULT RUN VISTA", "EDGEMOOR", "ELK MANOR FARM", "ESTATES AT CREIGHTON FAR", "FIDELIO", "FOUR SEASONS RESIDENCES BALTIMORE", "FOXHALL ROAD", "GEORGETOWN", "GOLD COAST", "HICKORY TREE FARM", "HILLSBORO", "HOLLY BEACH FARM", "INNER HARBOR", "ISLAND CREEK NECK", "KALORAMA", "KENT", "LANDMARK ROAD", "LANGLEY", "LANGLEY FARMS", "MANNING DIVISION", "MASSACHUSETTS AVENUE HEI", "MCLEAN", "MCLEANS GOLD COAST", "MOUNT GORDON FARM", "MOUNTVILLE", "N/A", "NONE", "OAKENDALE", "OLD TOWN", "PALATINE SUB", "PEACOCK ESTATE", "PHILLIPS PARK", "POTOMAC OUTSIDE", "PRICKLY PEAR MOUNTAIN", "RIVER OAKS", "RIVINUS", "ROCK FORD ON THE RAPPAHANNOCK RIVER", "ROKEBY FARM", "ROKEBY FARMS", "SHADOW POINT", "SHARPS POINT ESTATE", "THE COVE", "TUFTON FARMS", "TURNBERRY TOWER", "WESLEY HEIGHTS", "WEST END", "WESTMORELAND HILLS", "WIMBLEDON FARMS", "WOODLEY PARK", "WORTHINGTON VALLEY"];
    // axios.get('http://localhost:8080/info/neighborhoods').then(
    //   (neighborhoods)=>{
    //     console.log('neighborhoods: ',neighborhoods.data);
    //     neighborhoods = neighborhoods.data;
    //     // this.setState({
    //     //   neighborhoods,
    //     //   selected:neighborhoods[0]
    //     // });
    //   }
    // ).catch((err)=>{
    //   console.log('error -',err);
    // });
    this.setState({
      neighborhoods,
      selected:neighborhoods[0]
    });
  }
  arrowToggle(e){
    e.preventDefault();
    this.props.arrowToggle(e);
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
    item.className+=" subdivision";
  }
  select(e){
    let item = e.target;
    this.setState({
      selected:item.id
    });
    setTimeout(()=>{
      this.props.selectNeighborhood(e,item.id);
    },250);
  }
  render(){
    let neighborhoods = this.state.neighborhoods;
    let selected = ( <span> {this.state.selected} </span> );
    neighborhoods = neighborhoods.map((subd)=>{
      return(
        <div id={subd} onMouseEnter={this.highlight.bind(this)} onMouseLeave={this.highlight_off.bind(this)} onClick={this.select.bind(this)} className="subdivision">
          {subd}
        </div>
      );
    });
    let dropdown = (this.state.dropdown) ? (
        <div className="neighborhood-dropdown-container">
          <div className="neighborhood-dropdown-opacity"></div>
          <div className="neighborhood-text">
            { neighborhoods }
          </div>
        </div>
    ): '';
    return(
      <div>
        <div className="options-title" >PICK A NEIGHBORHOOD</div>
        <div className="search-options">
          <span ref="neighborhood-list" className="btn-3d btn-3d-blue-neighborhood neighborhood-btn">
            { selected }
            { dropdown }
          </span>
          <span  onClick={this.arrowToggle.bind(this)} className="btn-3d btn-3d-blue-down down-btn" href="#"><div className="glyphicon glyphicon-triangle-bottom"></div></span>
        </div>
      </div>
    );
  }
}

export default Neighborhood;
