import React, {Component} from "react"

import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
// let markers = this.props.markers;
const google = window.google;

const MY_API_KEY = "82b44a7662b0abb55eebf365a61c50399b512935" // fake
let style={
  height:'60vh',
  width:'100%'
};
class Map extends Component{
  render(){
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
              title: "Washington DC",
              position: {
                lat: 38.904373, lng: -77.053513
              },
              onLoaded: (googleMaps, map, marker) => {

                // Set Marker animation
                marker.setAnimation(googleMaps.Animation.BOUNCE)

                // Define Marker InfoWindow
                const infoWindow = new googleMaps.InfoWindow({
                  content: `
                    <div>
                      <h3>Toulouse<h3>
                      <div>
                        Toulouse is the capital city of the southwestern
                        French department of Haute-Garonne,
                        as well as of the Occitanie region.
                      </div>
                    </div>
                  `,
                })
              },
            }
          ]
        }
          center={
            { lat: 38.904373, lng: -77.053513 }
          }
          zoom={8}
          onLoaded={(googleMaps, map) => {
            map.setMapTypeId(googleMaps.MapTypeId.SATELLITE)
            var marker = new google.maps.Marker({
              position: {lat: 39.00702, lng: -77.13851},
              title:"Hello World!"
            });

            //CREATE PROPERTY INFOWINDOW
            var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';

            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            marker.addListener('click', function() {
              infowindow.open(map, marker);
            });


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



            marker.setMap(map);
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

export default GoogleMapLoader(Map, {
  libraries: ["places"],
  key: MY_API_KEY,
})
