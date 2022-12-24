import '../css/ApexApp.css';
import { Viewer, Polyline, PolylineCollection, CameraFlyTo } from "resium";
import { Cartesian3, Color, Material } from "cesium";
import {Ion} from "cesium";
import { useQuery } from "@tanstack/react-query";
import React from 'react';



function GPStrack(props) {

    // const imageryProvider = new IonImageryProvider({ assetId: 3954 }) // use Sentinel-2 imagery
    Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOWMyNGYwNS1iYzY2LTRkMDItYWYwYi00NDZiOTFlZTQzYWUiLCJpZCI6MTE4OTA2LCJpYXQiOjE2NzE1NzcyMjh9.-S71chghA9n7JxDeaZKDpAJi_463RAgGLwz5X7mHQ4Q";

    const fetchData = async () => {
    const options = {headers: {Authorization: 'Token d8f855813b24563e6645c9b663ee6bd07f4ed4d3'}}
    const API_URL = process.env.REACT_APP_BACKEND_ROOT + '/api/apex/frontend/rawdata/?deployment=' + props.deploymentId
    const res = await fetch(API_URL, options)
    return res.json()
    };


  let positions = []
  let fly_to_lat = 0
  let fly_to_long = 0
  let { data, status, error } = useQuery([props.deploymentId], fetchData, {staleTime:100000000}); 

  if(status === 'loading'){
      console.log('loading') 
    }
  else if(status === 'error'){
      console.log(error.message) 
    }
  else{ 
      console.log(data)
      console.log(data.length)
      for(let i = 0; i < data.length; i++){
        let sample = data[i]
        let lat = parseFloat(sample['latitude'])
        let long =  parseFloat(sample['longitude'])

        fly_to_lat = fly_to_lat + lat
        fly_to_long = fly_to_long + long

        positions.push(Cartesian3.fromDegrees(long, lat, 10))
      }
        fly_to_lat = fly_to_lat/(data.length)
        fly_to_long = fly_to_long/(data.length)
    }

  const color = Material.fromType('Color', {
      color: new Color.fromCssColorString('#00416A')
  });

  return (
    <div>
      <div id="cesium-container">
        <Viewer className='cesium-viewer' projectionPicker={false} animation={false} infoBox={false} homeButton={false} fullscreenButton={false} timeline={false} navigationHelpButton={false} baseLayerPicker={false} sceneModePicker={false} navigationInstructionsInitiallyVisible={false} geocoder={false}>
          <CameraFlyTo destination={Cartesian3.fromDegrees(fly_to_long, fly_to_lat, 200)} duration={2.5}/>
          <PolylineCollection>
            <Polyline positions={positions} width={3} material={color} /> 
          </PolylineCollection>
        </Viewer>
      </div>
    </div>
  );
}

export default GPStrack;
