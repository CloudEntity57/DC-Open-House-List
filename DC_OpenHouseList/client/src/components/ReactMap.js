import React, {Component} from "react";
import currency from 'currency-formatter';
import moment from 'moment';
import jquery from 'jquery';
import newN from './Neighborhoods';
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
// let markers = this.props.markers;
const google = window.google;
let Neighborhoods = new newN;

// console.log('West End: ',Neighborhoods.adamsmorgan);

const MY_API_KEY = "82b44a7662b0abb55eebf365a61c50399b512935" // fake
let style={
  height:'60vh',
  width:'100%'
};
class FullMap extends Component{
  constructor(props){
    super(props);
    this.state={
      neighborhood:''
    }
  }
  componentDidMount(){
    let index = this.props.neighborhood;
    console.log('neighborhood: ',index);
    // let circumference = Neighborhoods.index;
    console.log('dupont circle: ',Neighborhoods.index);
  }
  render(){
    let neighb = this.props.neighborhood;
    console.log('neigh: ',neighb);
    console.log('West End: ',Neighborhoods[neighb]);
    console.log('the markerz: ',this.props.markers);
    return(
      // GoogleMap component has a 100% height style.
      // You have to set the DOM parent height.
      // So you can perfectly handle responsive with differents heights.
      <div style={style}>
        <GoogleMap
          googleMaps={this.props.googleMaps}
          // You can add and remove coordinates on the fly.
          // The map will rerender new markers and remove the old ones.
          // coordinates = {markers}
          coordinates={[
            {
              title: "Toulouse",
              position: {
                lat: 43.604363,
                lng: 1.443363,
            },
              onLoaded: (googleMaps, map, marker) => {

                // Set Marker animation
                // marker.setAnimation(googleMaps.Animation.BOUNCE)

                // Define Marker InfoWindow

              },
            }
          ]
        }
          center={
            { lat: 38.904373, lng: -77.053513 }
          }
          zoom={10}

          //HANDLE ALL GOOGLE MAPS INFO HERE:

          onLoaded={(googleMaps, map) => {
            // map.setMapTypeId(googleMaps.MapTypeId.STREET)
            var marker = new google.maps.Marker({
              position: {lat: 39.00702, lng: -77.13851},
              title:"Hello World!"
            });
            this.props.markers.forEach((val)=>{
              let price = currency.format(val.list_price,{ code: 'USD', decimalDigits: 0 });
              price = price.slice(0,price.length-3);
              //get day of the week:
              let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
              let date = (val.open_house_events) ? moment(val.open_house_events[0].event_start) : '';
              let dow = (date) ? date.day() : '';
              let time = (date) ? date.format('h:mmA') : '';
              let dowUC = (date) ? days[dow] : '';
              dow = (date) ? days[dow] : '';
              dow = (date) ? dow.toLowerCase() : '';
              // let style1 = {
              //   backgroundImage:'url('+val.image_urls.all_thumb[0]+')'
              // }
              let marker = new google.maps.Marker(
                {
                  title:val.street_name,
                  position: {
                    lat: parseFloat(val.latitude),
                    lng: parseFloat(val.longitude),
                  },
                }
              );
              marker.setMap(map);
            //CREATE PROPERTY INFOWINDOW
            let mls = val.mls_number.toString();
            var contentString = (
              '<div id='+mls+' class="listing-popup" style='+
                'backgroundImage:url('+val.image_urls.all_thumb[1]+')'+
                '>'+
                '<div class="listing-popup-opacity"></div>'+
                '<div class="listing-popup-text">'+
                 val.street_number + val.street_name + '('+dowUC+')<br/>'+
                 price +' <br/>'+
                '</div>'+
              '</div>'
            );

            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
              let index = '#'+mls;
              let style = 'url('+val.image_urls.all_thumb[0]+')'
              jquery(index).css('background-image',style);
            });


          });
            // marker.setMap(map);
            //DEFINE NEIGHBORHOOD AS POLYGON
            var triangleCoords = [
              {lat: 38.946675, lng: -77.034574},
              {lat: 138.928783, lng: -76.979643},
              {lat: 38.857971, lng: -77.071487}
            ];


            //FILTER BY NEIGHBORHOOD:
            var bermudaTriangle = new google.maps.Polygon({paths: triangleCoords});
            google.maps.event.addListener(map, 'click', function(e) {
              if(google.maps.geometry.poly.containsLocation(e.latLng, bermudaTriangle)){
                //place marker
                console.log('true');
              }else{
                //ignore marker
                console.log('false');
              }
            });



          }}

        />
      </div>
    )
  }
}
// const Map = ({markers, googleMaps}) => (
//   // GoogleMap component has a 100% height style.
//   // You have to set the DOM parent height.
//   // So you can perfectly handle responsive with differents heights.
//   <div style={style}>
//     <GoogleMap
//       googleMaps={googleMaps}
//       // You can add and remove coordinates on the fly.
//       // The map will rerender new markers and remove the old ones.
//       coordinates={[
//         {
//           title: "Washington DC",
//           position: {
//             lat: 38.904373, lng: -77.053513
//           },
//           onLoaded: (googleMaps, map, markers) => {
//             // Set Marker animation
//             markers.setAnimation(googleMaps.Animation.BOUNCE)
//
//             // Define Marker InfoWindow
//             const infoWindow = new googleMaps.InfoWindow({
//               content: `
//                 <div>
//                   <h3>Toulouse<h3>
//                   <div>
//                     Toulouse is the capital city of the southwestern
//                     French department of Haute-Garonne,
//                     as well as of the Occitanie region.
//                   </div>
//                 </div>
//               `,
//             })
//
//             // Open InfoWindow when Marker will be clicked
//             // googleMaps.event.addListener(marker, "click", () => {
//             //   infoWindow.open(map, marker)
//             // })
//             //
//             // // Change icon when Marker will be hovered
//             // googleMaps.event.addListener(marker, "mouseover", () => {
//             //   marker.setIcon(iconMarkerHover)
//             // })
//             //
//             // googleMaps.event.addListener(marker, "mouseout", () => {
//             //   marker.setIcon(iconMarker)
//             // })
//
//             // Open InfoWindow directly
//             // infoWindow.open(map, marker)
//           },
//         }
//       ]}
//       center={
//         { lat: 38.904373, lng: -77.053513 }
//       }
//       zoom={8}
//       onLoaded={(googleMaps, map) => {
//         map.setMapTypeId(googleMaps.MapTypeId.SATELLITE)
//       }}
//     />
//   </div>
// )

// Map.propTypes = {
//   googleMaps: PropTypes.object.isRequired,
// }

export default GoogleMapLoader(FullMap, {
  libraries: ["places"],
  key: MY_API_KEY,
})
