import React, { Component } from 'react';


class Search extends Component{
  render(){
    return(
      <div>
        <script type="text/javascript">
          let params = 'latitude,longitude,image_urls,street_name,street_number,square_feet,mls_number,list_price,open_house_events,address,full_baths,num_bedrooms,half_baths';
          // let params = '';
          $.ajax({
            url:"https://api.displet.com/residentials/search?authentication_token=82b44a7662b0abb55eebf365a61c50399b512935&;return_fields="+params+"&min_bedrooms=2&min_bathrooms=1&min_list_price=350&open_house=y&open_house_within=7&limit=15",
            // url:"https://api.displet.com/agents/?authentication_token=82b44a7662b0abb55eebf365a61c50399b512935",
            method:'GET',
            headers:{
              "accept": "application/javascript"
            },
            success:(val)=>{
              console.log('results: ',val);
            }
          }).done((val)=>{
            console.log('success: ',val);
          });
        </script>
        <body>
          <header>
            <div classname="grey-bar">
            </div>
            <div classname="lightgrey-bar">
            </div>

            <div id="header-nav">
              <button type="button" classname="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse" name="button">
                <span classname="icon-bar"></span>
                <span classname="icon-bar"></span>
                <span classname="icon-bar"></span>
              </button>
              <div classname="collapse navbar-collapse">
                <ul classname="nav navbar-nav navbar-right">
                  <li><i classname="glyphicon glyphicon-play"></i>SUNDAY</li>
                  <li><i classname="glyphicon glyphicon-play"></i>SATURDAY</li>
                  <li><i classname="glyphicon glyphicon-play"></i><a href="/index.html">HOME</a></li>
                </ul>
              </div>
            </div>
            <div id="header-image">
              <div id="header-transition">

              </div>
              <div classname="header-title-container">
                <img classname="img-responsive" src="./images/DC_open House_sm-10.svg" alt="title" />
              </div>
            </div>
            <div classname="yellow-bar"></div>
            <div classname="red-bar"></div>
          </header>
          <div classname="wrapper">

            <div classname="options-title" >PICK A DAY</div>

            <div classname="search-options">

              <a classname="day-btn btn-3d btn-3d-blue" href="#">
                <div classname="day-text">
                  <div>
                    <div classname="day-text-1">
                      This
                    </div>
                    <div classname="day-text-2">
                      Saturday
                    </div>
                  </div>
                </div>
              </a>
                <a classname="day-btn btn-3d btn-3d-blue" href="#">
                  <div classname="day-text">
                      <div>
                      <div classname="day-text-1">
                        This
                      </div>
                      <div classname="day-text-2">
                        Sunday
                      </div>
                    </div>
                  </div>
                </a>


            </div>
            <div  style="margin-top:75px">
              <a href="/neighborhood.html">neighborhood</a>
            </div>
            <div classname="featured">
              <div classname="featured-title row">FEATURED</div>
              <div classname="featured-results row">
                <div classname="featured-item col-sm-4">
                  <div classname="pic-holder">
                    <img classname="listing-img" src="./images/download.jpg" alt="house" />
                    <div classname="listing-info-opacity">
                    </div>
                    <div classname="listing-info">
                      1234 Some property
                      Some address
                    </div>
                  </div>
                </div>
                <div classname="featured-item col-sm-4">
                  <div classname="pic-holder">
                    <img classname="listing-img" src="./images/download-1.jpg" alt="house" />
                    <div classname="listing-info"></div>
                  </div>
                </div>
                <div classname="featured-item col-sm-4">
                  <div classname="pic-holder">
                    <img classname="listing-img" src="./images/download-2.jpg" alt="house" />
                    <div classname="listing-info"></div>
                  </div>
                </div>
              </div>
            </div>
            <footer>
              <!-- <img src="./images/RLAH_logo.png" alt="logo" /> -->
              IS A LOCALLY OWNED AND OPERATED FRANCHISE. REAL LIVING REAL ESTATE IS A NETWORK BRAND OF HSF
      AFFILIATES LLC, WHICH IS MAJORITY OWNED BY HOME SERVICES OF AMERICA, INC. A BERKSHIRE HATHAWAY AFFILIATE.
            </footer>
          </div>
        </body>
      </div>
    );
  }
}

export default Search;
