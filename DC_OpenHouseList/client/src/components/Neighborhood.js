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
    let neighborhoods = ["Arrowhead Lake Es", "Ashland", "Bluffcreek Est", "Bonne Femme", "Bristol Lake", "Cairo", "Chapel Hill Lks", "Columbia", "Copperstone", "Country Meadows", "Creeks Edge", "Deer Crossing Est", "Eldon", "Forest Acres", "Fulton", "Gans Creek", "Gates, The", "Glasgow", "Grasslands", "Hallsville", "Harpers Pointe", "Harrisburg", "Hartsburg", "Highlands", "Hinkson Ridge", "Holts Summitt", "Hunters Ridge", "Jefferson City", "Lake Woodrail", "Marceline", "Mexico", "Old Hawthorne", "Pines", "Rocheport", "Spring Creek", "Steeplechase Est", "Stoneridge Est", "Sturgeon", "Thornbrook", "Vantage Point", "Walden Pointe", "West Lawn", "Westmount Addition", "Westwood Add", "Woodrail"];
    // axios.get('http://localhost:8080/info/neighborhoods').then(
    //   (neighborhoods)=>{
    //     console.log('neighborhoods: ',neighborhoods.data);
    //     neighborhoods = neighborhoods.data;
    //     this.setState({
    //       neighborhoods,
    //       selected:neighborhoods[0]
    //     });
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
