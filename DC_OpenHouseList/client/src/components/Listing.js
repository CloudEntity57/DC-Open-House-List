import React, { Component } from 'react';
import ListingMap from './ListingMap';
import axios from 'axios';
import GoogleMap from "react-google-map";
import GoogleMapLoader from "react-google-maps-loader";
import currency from 'currency-formatter';
import jquery from 'jquery';
const google = window.google;

class Listing extends Component{
  constructor(props){
    super(props);
    this.state={
      listing:'',
      showing:'',
      thumb_photos:[],
      big_photos:[],
      showing_index:0
    }
  }
  componentWillMount(){
    // axios.get('http://localhost:8080/info/open_houses').then(
    //   (response)=>{
        console.log('axios: ',this.props.listing);
        let listing = this.props.listing
        let showing = (listing) ? listing.image_urls.all_big[0] : '';
        let showing_index = 0;
        let style = {
          backgroundImage:'url('+showing+')',
          backgroundPosition:'left',
          backgroundSize:'cover',
          overlap:'hidden'
        }

        showing = (
          <div style={style} className="photo-container"></div>
        )
        let index=-1;
        let thumb_photos = (listing) ? listing.image_urls.all_thumb.map((pic)=>{
          // console.log('thumb pic: ',pic);
          let style = {
            backgroundImage:'url('+pic+')',
            backgroundPosition:'center',
            backgroundSize:'cover',
            overlap:'hidden',
            borderRight:'4px solid #000'
          }
          index++;
          return(
            <div onClick={this.showPic.bind(this)} id={index} style={style} className="thumb-photo-container">

            </div>
          );
        }) : '';
        let big_photos = (listing) ? listing.image_urls.all_big : '';

        this.setState({
          showing,
          showing_index,
          thumb_photos,
          big_photos,
          listing
        });
      // }).catch((err)=>{
      //   console.log('error -',err);
      // });
    }
  componentDidMount(){
    let id2='#'+this.state.showing_index;
    jquery(id2).addClass('thumb-viewing');
  }
  goRight(e){
    e.preventDefault();
    let index = this.state.showing_index;
    let newIndex=index;
    console.log('now on: ',newIndex);
    if(index!==this.state.thumb_photos.length-1){
      newIndex = this.state.showing_index+1;
      console.log('navigating to: ',newIndex);
      let id='#'+newIndex;
      let id2='#'+(newIndex-1);
      jquery(id).addClass('thumb-viewing');
      jquery(id2).removeClass('thumb-viewing');
    }
    let width=jquery('#1').width();
    let scroll_width=(index+2)*width;
    console.log('width: ',scroll_width);
    let container_width=jquery('.scroller').width();
    console.log('container: ',container_width);
    if(scroll_width>container_width){
      let left = (-(scroll_width-container_width));
      console.log('past bounds! adjusting: ');
      jquery('.photo-carousel-interior').css('left',left);
    }
    this.setState({
      showing_index:newIndex
    });
  }
  goLeft(e){
    e.preventDefault();
    let index = this.state.showing_index;
    let newIndex=index;
    console.log('now on: ',newIndex);
    if(index!==0){
      newIndex = this.state.showing_index-1;
      console.log('navigating to: ',newIndex);
      let id='#'+newIndex;
      let id2='#'+(newIndex+1);
      jquery(id).addClass('thumb-viewing');
      jquery(id2).removeClass('thumb-viewing');
    }
    this.setState({
      showing_index:newIndex
    });
  }
  showPic(e){
    e.preventDefault();
    console.log("showing: ",e.target.id);
    let newIndex = e.target.id
    let id='#'+newIndex;
    let id2='#'+this.state.showing_index;
    jquery(id).addClass('thumb-viewing');
    jquery(id2).removeClass('thumb-viewing');

    this.setState({
      showing_index:parseInt(e.target.id)
    });
  }
  submitForm(e){
    e.preventDefault();
  }
  navigateBack(){
    this.props.goBack();
  }
  render(){
    let showing=this.state.showing;
    let listing=this.state.listing;
    console.log('listing to display: ',listing);
    let subdivision=(listing) ? listing.subdivision : '';
    let price = (listing) ? listing.list_price : '';
    subdivision=subdivision.toLowerCase();
    subdivision = subdivision.replace(/\b\w/g, l => l.toUpperCase());
    let showing_index = this.state.showing_index;
    let thumb_photos=this.state.thumb_photos;
    let big_photos=this.state.big_photos;

    let style = {
      backgroundImage:'url('+big_photos[showing_index]+')',
      backgroundPosition:'left',
      backgroundSize:'cover',
      overlap:'hidden'
    }

    showing = (
      <div style={style} className="photo-container"></div>
    )
    let comments = (listing) ? listing.open_house_events[0].open_house_comments : '';

    //LISTING SPECS:
    let bed_img = (
      <div className="listing-beds">
        <div>{listing.num_bedrooms}</div>
        <img className="listing-emoji" src={require('../images/bed.svg')} alt="bed" />
      </div>
    );
    let bath_img = (
      <div className="listing-baths">
        <div>{listing.full_baths}/{listing.half_baths}</div>
        <img className="listing-emoji" src={require('../images/bath.svg')} alt="bath" />
      </div>
    );
    // let beds = ();
    // let baths = ();
    let sq_ft = (<span className="sqFt">{listing.square_feet}&nbsp;sq ft</span>);
    price = currency.format(listing.list_price,{ code: 'USD', decimalDigits: 0 });
    price = price.slice(0,price.length-3);
    price = (<span className="listing-price-emoji">{price}</span>)
    let stories = (listing.stories ==1) ? (<div>{listing.stories}&nbsp;story</div>) : (<div>{listing.stories}&nbsp;stories</div>);
    let built = ( <div>Built:&nbsp;{listing.year_built}</div> );
    let subd = ( <div>Subdivision:&nbsp;{ subdivision }</div> );
    let dom = ( <div>{listing.cdom}&nbsp;days on the market</div> );

    let st_address = (<div>{listing.street_number}&nbsp;{listing.street_name}</div>);
    let st_address_string = listing.street_number+listing.street_name
    let lng = parseFloat(listing.longitude);
    let lat = parseFloat(listing.latitude);
    let marker = {
      title:'listing',
      position: {lat: lat, lng: lng}
    };
    let center = {lat:lat,lng:lng};
    let map = (
      <ListingMap center={center} listing_marker={marker}/>
    );
    let mls = (
      <div>MLS #:&nbsp;{listing.mls_number}</div>
    );
    let parking = (<div>Parking:&nbsp;{ listing.parking_description } &nbsp; {listing.parking_spaces || listing.garage_spaces}</div>);
    return(
      <div className="wrapper listing-page">
        <div className="listing-header row">
          <div className="listing-address">
            { st_address }
            <div>{listing.city},&nbsp;{listing.state}&nbsp;{listing.zip}</div>
          </div>
          <div className="listing-header-specs">
            { price }  { bed_img }  { bath_img }  {sq_ft}
          </div>
          <div onClick={this.navigateBack.bind(this)} className="back-button">
            Back
          </div>
        </div>
        <div className="listing-section">
          <div className="row">
            <div className="listing-column col-sm-6">
              <div className="photos-map-column">
                <div className="listing-photos">
                  <div className="photo-viewer">
                    {/* <img src={this.state.showing} alt="listing photo" /> */}
                    {showing}
                    <div onClick={this.goLeft.bind(this)}className="arrow arrow-left fa fa-arrow-left"></div>
                    <div onClick={this.goRight.bind(this)}className="arrow arrow-right fa fa-arrow-right"></div>
                  </div>
                  <div className="scroller">
                    <div className="photo-carousel">
                      <div className="photo-carousel-interior">
                        {thumb_photos}
                      </div>
                    </div>
                  </div>

                </div>
                <div className="listing-description">
                  <div>{ comments }</div>
                  <div className="office">Listing courtesy of:&nbsp;{listing.listing_office_name}</div>
                </div>
                <div className="listing-map">{map}</div>
              </div>
            </div>
            <div className="listing-column col-sm-6">
              <div className="specs-form-column">
                <div className="listing-specs">


                  <div className="specs-2">
                    <div className="specs-text">{ subd }</div>
                    <div className="specs-text">{ listing.floor }</div>
                    <div className="specs-text">{ dom }</div>
                    <div className="specs-text">{ mls }</div>
                  </div>
                  <div className="specs-1">
                    <div className="specs-text">{ stories }</div>
                    <div className="specs-text">{ listing.property_type }&nbsp;{ listing.property_sub_type }</div>
                    <div className="specs-text">{ built }</div>
                    <div className="specs-text">{parking}</div>
                  </div>
                </div>
                <div className="listing-form-column">
                  <div className="listing-form">
                    <form onSubmit={this.submitForm.bind(this)}>
                      <input type="submit" value="Submit"/>
                    </form>
                  </div>
                  <div className="listing-agent-photo">photo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Listing;
