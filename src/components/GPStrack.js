import '../css/ApexApp.css';
import { Viewer, CameraFlyTo, Entity, PolylineGraphics } from "resium";
import { Cartesian3, Color } from "cesium";
import {Ion} from "cesium";
import { useQuery } from "@tanstack/react-query";
import React from 'react';



function GPStrack(props) {

    // const imageryProvider = new IonImageryProvider({ assetId: 3954 }) // use Sentinel-2 imagery
    Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOWMyNGYwNS1iYzY2LTRkMDItYWYwYi00NDZiOTFlZTQzYWUiLCJpZCI6MTE4OTA2LCJpYXQiOjE2NzE1NzcyMjh9.-S71chghA9n7JxDeaZKDpAJi_463RAgGLwz5X7mHQ4Q";

    const fetchData = async () => {
    const url = process.env.REACT_APP_BACKEND_ROOT + '/api/apex/frontend/rawdata/?deployment=' + props.deploymentId
    const options = {headers: {Authorization: 'Token ' + props.userDetails.token}}
    const res = await fetch(url, options)
    return res.json()
    };

  
    function plotLine(){
      let line = Viewer.entities.add({
        name: "Green rhumb line",
        polyline: {
          positions: Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
          width: 6,
          material: Color.GREEN
        }
    });
    }


  let positions = []
  let positionArray = []

  let fly_to_lat = 0 //39.5996698
  let fly_to_long = 0 // -102.1092965
  let { data, status, error } = useQuery([props.deploymentId], fetchData, {staleTime:100000000}); 

  if(status === 'loading'){
      console.log('loading') 
    }
  else if(status === 'error'){
      console.log(error.message) 
    }
  else{ 
      for(let i = 0; i < data.length; i++){
        let sample = data[i]
        let lat = parseFloat(sample['latitude'])
        let long =  parseFloat(sample['longitude'])

        fly_to_lat = fly_to_lat + lat
        fly_to_long = fly_to_long + long
        positions.push(long)
        positions.push(lat)
      }
        positionArray = Cartesian3.fromDegreesArray(positions)
        fly_to_lat = fly_to_lat/(data.length)
        fly_to_long = fly_to_long/(data.length)
    }

  return (
    <div>
      <div id="cesium-container">
        <Viewer className='cesium-viewer' projectionPicker={false} animation={false} infoBox={false} homeButton={false} fullscreenButton={false} timeline={false} navigationHelpButton={false} baseLayerPicker={false} sceneModePicker={false} navigationInstructionsInitiallyVisible={false} geocoder={false}>
          {/* <CameraFlyTo destination={Cartesian3.fromDegrees(fly_to_long, fly_to_lat, 200)} duration={2}/>
            <Entity>
              <PolylineGraphics positions={positionArray}  material={Color.fromCssColorString('#E99B05')}/>
            </Entity> */}
        </Viewer>
      </div>
    </div>
  );
}

export default GPStrack;
