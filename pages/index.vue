<template>
 <div>
   <div id="map"></div>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCa847158qD_vQWFxQrn88HkXC9l44c0B8&v=beta&callback=initMap">
</script>
 </div>
</template>

<script>
import {ref} from '@nuxtjs/composition-api'
import useStorage from '@/composables/useStorage'
import { AmbientLight, DirectionalLight, Scene } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.cjs";
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.cjs'
import { ThreeJSOverlayView } from "@googlemaps/three";

import { getStorage } from "firebase/storage";
// var THREE = require('three/examples/js/loaders/OBJLoader');

// var loader = new OBJLoader();
export default {

  methods:{
   initMap(){
     let map;
      const mapOptions = {
        heading: 320,
        tilt: 0,
        zoom: 20,
        // center: {lat: 48.8584,lng: 2.2945,}, //eifel tower
        // center: {lat: 29.9792,lng: 31.1342,}, //egypt
        center: {lat: 27.1751,lng: 78.0421,}, //taj mahal
        // center: {lat: 25.1972,lng: 55.2744,}, //burj khalifa
        mapId: "cec3098d0aa93bd0",
        // disable interactions due to animation loop and moveCamera
        // disableDefaultUI: true,
        // gestureHandling: "none",
        // keyboardShortcuts: false,        
      };
  //     const buttons = [
  //   ["Rotate Left", "rotate", 20, google.maps.ControlPosition.LEFT_CENTER],
  //   ["Rotate Right", "rotate", -20, google.maps.ControlPosition.RIGHT_CENTER],
  //   ["Tilt Down", "tilt", 20, google.maps.ControlPosition.TOP_CENTER],
  //   ["Tilt Up", "tilt", -20, google.maps.ControlPosition.BOTTOM_CENTER],
  // ];
  // buttons.forEach(([text, mode, amount, position]) => {
  //   const controlDiv = document.createElement("div");
  //   const controlUI = document.createElement("button");
  //   controlUI.classList.add("ui-button");
  //   controlUI.innerText = `${text}`;
  //   controlUI.addEventListener("click", () => {
  //     adjustMap(mode, amount);
  //   });
  //   controlDiv.appendChild(controlUI);
  //   map.controls[position].push(controlDiv);
  // });

  // const adjustMap = function (mode, amount) {
  //   switch (mode) {
  //     case "tilt":
  //       map.setTilt(map.getTilt() + amount);
  //       break;
  //     case "rotate":
  //       map.setHeading(map.getHeading() + amount);
  //       break;
  //     default:
  //       break;
  //   }
  // };



      
      let losAngeles = {lat: 34.063380, lng: -118.358080}
      let india = {lat: 20.5937, lng: 78.9629}
      map = new google.maps.Map(document.getElementById('map'),mapOptions)

      const scene = new Scene();
      const ambientLight = new AmbientLight('yellow', 1.0);
      scene.add(ambientLight);
      const directionalLight = new DirectionalLight('white', 0.25);
      directionalLight.position.set(0, 10, 50);
      scene.add(directionalLight);

      //load the model
      
      const loader = new OBJLoader();
      //  const url ="https://raw.githubusercontent.com/googlemaps/js-samples/master/assets/pin.gltf";
      //  const url = 'https://firebasestorage.googleapis.com/v0/b/maps-3js.appspot.com/o/EiffelTower.obj?alt=media&token=https://firebasestorage.googleapis.com/v0/b/maps-3js.appspot.com/o/EiffelTower.obj?alt=media&token=27e5bd1c-9502-4bcf-8386-78f3a55a055a'
      //  loader.load('../static/EiffelTower.obj', (gltf) => {
      //     gltf.scene.scale.set(8, 8, 8);
      //     gltf.scene.rotation.x = Math.PI / 2;
      //     scene.add(gltf.scene);
      let { tilt, heading, zoom } = mapOptions;

      const animate = () => {
        if (tilt < 67.5) {
          tilt += 0.5;
        } else if (heading <= 360) {
          heading += 0.2;
          zoom -= 0.0005;
        } else {
          // exit animation loop
          return;
        }
        map.moveCamera({ tilt, heading, zoom });
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
        //  });
        new ThreeJSOverlayView({
          map,
          scene,
          anchor: { ...mapOptions.center, altitude: 100 },
        });
      }
  
  },

  mounted() {
    this.initMap()
    }

  // setup(){
  //   // const { filePath, url, uploadImage } = useStorage()
  //   // const file = ref(null)
  //   // file.value = '../static/EiffelTower.obj'
  //   // const putImage = async() =>{
  //   //   await uploadImage(file.value)
  //   // }
  //   //  putImage()
  //   // return {putImage}
  //   const storage = getStorage();
  //   const gsReference = ref(storage, 'gs://maps-3js.appspot.com/EiffelTower.obj');
  //   const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/maps-3js.appspot.com/o/EiffelTower.obj?alt=media&token=https://firebasestorage.googleapis.com/v0/b/maps-3js.appspot.com/o/EiffelTower.obj?alt=media&token=27e5bd1c-9502-4bcf-8386-78f3a55a055a')

  //   return { httpsReference }
  // }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}  

#map{
    height: 100vh;
    
}

.ui-button {
  background-color: #fff;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
  margin: 10px;
  padding: 0 0.5em;
  font: 400 18px Roboto, Arial, sans-serif;
  overflow: hidden;
  height: 40px;
  cursor: pointer;
}
.ui-button:hover {
  background: #ebebeb;
}
</style>
