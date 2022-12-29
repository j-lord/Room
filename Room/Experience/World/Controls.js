import * as THREE from 'three';
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// import { ScrollSmoother } from "gsap/ScrollSmoother.js";

export default class Controls{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        GSAP.registerPlugin(ScrollTrigger); // need to register plugin before using it

        this.setPath();


        // this.progress = 0;
        // this.dummyCurve = new THREE.Vector3(0,0,0);

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        // this.position = new THREE.Vector3(0,0,0);
        // this.lookAtPosition = new THREE.Vector3(0,0,0);

        // this.directionalVector = new THREE.Vector3(0,0,0);
        // this.StaticVector = new THREE.Vector3(0,1,0);
        // this.crossVector = new THREE.Vector3(0,0,0); // cross product of directionalVector and StaticVector
        
        // this.setPath(); // using this to create a path for the camera to follow
        // this.onWheel();

        }

        setPath(){
            console.log(this.room);
            this.timeline = new GSAP.timeline();
            this.timeline.to(this.room.position, {
                x: () => {
                    return this.sizes.width * 0.0012;
                }, // need to wrap this in a function in order for GSAP to update the value
                // x: 1,
                // duration: 50,
                // trigger this action when the scroll reaches this point
                scrollTrigger: {
                    trigger: ".first-move",
                    markers: true, // so we can see the scroll markers
                    start: "top top", // when the top of the trigger hits the top of the viewport
                    end: "bottom bottom", // when the bottom of the trigger hits the top of the viewport
                    id: "first-move class",
                    // lerp: 3, // linear interpolation
                    scrub: 3, // scrub the animation
                    invalidateOnRefresh: true, // so the animation doesn't break when we refresh the page
                },
        });
    }
    // setPath(){
    // //Create a closed wavey loop
    //     this.curve = new THREE.CatmullRomCurve3( [
    //     new THREE.Vector3( -5, 0, 0 ),
    //     new THREE.Vector3( 0, 0, -5 ),
    //     new THREE.Vector3( 5, 0, 0 ),
    //     new THREE.Vector3( 0, 0, 5 )
    // ], true);

    // const points = this.curve.getPoints( 50 );
    // const geometry = new THREE.BufferGeometry().setFromPoints( points );

    // const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

    // // Create the final object to add to the scene
    // const curveObject = new THREE.Line( geometry, material );
    // this.scene.add( curveObject );
    // }

    // onWheel(){
    //     window.addEventListener("wheel", (e) => {
    //         console.log(e.deltaY);
        
    //     if(e.deltaY > 0){
    //         this.lerp.target += 0.01;
    //         this.back = false;
    //     }
    //     else {
    //         this.lerp.target -= 0.01;
    //         this.back = true;
    //         if (this.progress < 0){
    //             this.progress = 1;
    //         }
    //     } 

    //     // this.experience.on("wheel", (event) => {
    //     //     this.progress += event.deltaY * 0.0001;
    //     // })
    // });
    // }

    resize(){
    }
    update(){
        // this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
        
        // this.curve.getPointAt(this.lerp.current % 1, this.position); // get the point on the line and copy it into the position vector
        // this.camera.orthographicCamera.position.copy(this.position); // copy the position vector into the camera position

        // this.directionalVector.subVectors(this.curve.getPointAt((this.lerp.current%1)+0.00001), this.position); // get the direction of the line
        // this.directionalVector.normalize(); // normalize the direction vector

        // this.crossVector.crossVectors(this.directionalVector, this.StaticVector); // get the cross product of the direction vector and the static vector
        // this.crossVector.multiplyScalar(100000); // multiply the cross vector by a scalar to make it longer
        // this.camera.orthographicCamera.lookAt(this.crossVector); // look at the cross vector

        // // comment out the line below to see the camera move in a straight line
        // // // console.log(this.lerp.current);
        // // if(this.back){
        // //     this.lerp.target -= 0.001;
        // // }else{
        // //     this.lerp.target += 0.001;
        // // }

        // // // this makes it so there is definite stopping point at the top and bottom of the page
        // // console.log(this.lerp.current);
        // if (this.lerp.current <= 0.009){
        //     this.lerp.current = 0.009;
        //     this.lerp.target = 0.009;
        // }
        // if (this.lerp.current >= 0.99){
        //     this.lerp.current = 0.99;
        //     this.lerp.target = 0.99;
        // }

    

        // // this clamps the value between 0 and 1
        // this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
        // this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);
        // // this.lookAtPosition = GSAP.utils.clamp(0, 1, this.this.lookAtPosition);
        // this.curve.getPointAt(this.lerp.current, this.position);
        // this.curve.getPointAt(this.lerp.current + 0.001, this.lookAtPosition);
        // // make the camera follow a path
        // this.camera.orthographicCamera.position.copy(this.position);
        // // make the camera look at the path it is following (like a rollercoaster)
        // this.camera.orthographicCamera.lookAt(this.lookAtPosition);
    }

}

// What about now