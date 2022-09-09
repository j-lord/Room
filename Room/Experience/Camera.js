import * as THREE from 'three';
import Experience from "./Experience.js"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
        this.perspectiveCamera.position.z = 4;
        this.scene.add(this.perspectiveCamera);

        this.scene.add(this.perspectiveCamera);
    }

    createOrthographicCamera(){
        this.frustrum = 5;
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum/2),
            (this.sizes.aspect * this.sizes.frustrum/2),
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -100,
            100
        );

        this.orthographicCamera.position.z = 3; 
        this.scene.add(this.orthographicCamera);

    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper( size, divisions );
    this.scene.add( gridHelper );

    const axesHelper = new THREE.AxesHelper( 10 );
    this.scene.add( axesHelper );

    }

    setOrbitControls(){
        // Updating Orbit Controls
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }
    resize(){
        // Updating Perspective Camera on resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        // Updating Orthographic Camera on resize
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum/2);
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum/2);
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix();
    }
    update(){
        this.controls.update();
    }

}