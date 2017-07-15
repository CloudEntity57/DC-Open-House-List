import React, { Component } from 'react';
import jquery from 'jquery';
import axios from 'axios';
import currency from 'currency-formatter';
import moment from 'moment';

class Featured extends Component{
  constructor(props){
    super(props);
    this.state = {
      featured:[]
    }
  }
  componentWillMount(){
    let featured = [];
    axios.get('http://localhost:8080/info/open_houses').then(
      (response)=>{
        console.log('axios: ',response);
        featured = response.data.results.slice(0,3).map((listing)=>{
          let price = currency.format(listing.list_price,{ code: 'USD', decimalDigits: 0 });

          //get day of the week:
          let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          let date = moment(listing.open_house_events[0].event_start);
          let dow = date.day();
          dow = days[dow];
          console.log('open house is on: ',dow);
          let style = {
            backgroundImage:'url('+listing.image_urls.all_thumb[0]+')',
            backgroundPosition:'center',
            backgroundSize:'cover',
            overlap:'hidden'
          };
          return(
            <div className="featured-item col-sm-4">
              <div className="pic-holder" style={style}>
                <div className="listing-info-opacity">
                </div>
                <div className="listing-info">
                  {listing.street_number} {listing.street_name}<br/>
                  {price}, {dow}
                </div>
              </div>
            </div>
          );
        });
        this.setState({
          featured
        })
      }
    ).catch((err)=>{
      console.log('error -',err);
    });
  }
  render(){
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var now = new Date();
    var day = days[now.getDay()];
    console.log('today: ',day,', date: ',now);
    let featured = this.state.featured;
    // let params = 'latitude,longitude,image_urls,street_name,street_number,square_feet,mls_number,list_price,open_house_events,address,full_baths,num_bedrooms,half_baths';
    let params = '';
    let apiKey=process.env.REACT_APP_DISPLET_API_KEY;
    // let apiKey="82b44a7662b0abb55eebf365a61c50399b512935";
    jquery.ajax({
      // url:"https://api.displet.com/agents/?authentication_token=82b44a7662b0abb55eebf365a61c50399b512935",
      url:"http://localhost:8080/info/open_houses",
      method:'GET',
      success:(val)=>{
        console.log('success');
      }
    }).done((val)=>{
      console.log('results: ',val.results);
    });
    return(
      <div className="featured">
        <div className="featured-title row">FEATURED</div>
        <div className="featured-results row">
          { featured }
          {/* <div className="featured-item col-sm-4">
            <div className="pic-holder">
              <img className="listing-img" src="../images/download.jpg" alt="house" />
              <div className="listing-info-opacity">
              </div>
              <div className="listing-info">
                1234 Some property
                Some address
              </div>
            </div>
          </div>
          <div className="featured-item col-sm-4">
            <div className="pic-holder">
              <img className="listing-img" src="../images/download-1.jpg" alt="house" />
              <div className="listing-info"></div>
            </div>
          </div>
          <div className="featured-item col-sm-4">
            <div className="pic-holder">
              <img className="listing-img" src="../images/download-2.jpg" alt="house" />
              <div className="listing-info"></div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Featured;
