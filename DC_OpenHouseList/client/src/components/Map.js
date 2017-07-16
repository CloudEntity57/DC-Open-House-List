import React, { Component } from 'react';
import { withGoogleMap, InfoWindow, GoogleMap, Marker } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={12}
    defaultCenter={{ lat: 38.928013, lng: -92.332461 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker key={index}
        onClick = {()=>props.onMarkerClick(marker)}
        {...marker}>
        {marker.showInfo && (
         <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
           <div>{marker.infoContent}</div>
         </InfoWindow>
       )}
      </Marker>
    ))}
  </GoogleMap>
));

class Map extends Component{
  constructor(props){
    super(props);
    this.state={
      showing: false,
      target:'',
      markers: this.props.markers
    }
  }

  handleMapLoad(map) {
    this._mapComponent = map;
    // if (map) {
    //   console.log(map.getZoom());
    // }
  }

  displayMapInfo(marker){
    console.log('marker: ',marker);
  }

  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerClick(targetMarker){
    this.setState({
     markers: this.state.markers.map(marker => {
       if (marker === targetMarker) {
         return {
           ...marker,
           showInfo: true,
         };
       }else{
         return {
           ...marker,
           showInfo: false,
         };
       }
       return marker;
     }),
   });
  }
  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }
  handleMapClick(){
    this.setState({
      markers: this.state.markers.map(marker => {
        // if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        // }
        // return marker;
      }),
    });
  }
  render(){
    return(
      <div className="map-frame">
        <GettingStartedGoogleMap
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            displayMapInfo={this.displayMapInfo.bind(this)}
            onMapLoad={this.handleMapLoad.bind(this)}
            markers={this.state.markers}
            onMarkerClick={this.handleMarkerClick}
            onMarkerClose={this.handleMarkerClose}
            onMapClick={this.handleMapClick}
          />
        </div>
    );
  }
}

export default Map;
