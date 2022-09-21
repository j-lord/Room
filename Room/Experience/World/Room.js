import * as THREE from 'three';
import Experience from "../Experience.js"
import GSAP from "gsap"

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
        }

// this is to set up the model and color of water
    setModel(){
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true; 
            if(child instanceof THREE.Group){
                child.children.forEach(groupchild => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            if (child.name === "Water") { // this is why naming is important in blender
                child.material = new THREE.MeshPhysicalMaterial(); // this is for the fish tank
                child.material.roughness = 0;
                child.material.color.set(0x549dd2);
                child.material.ior = 8;
                child.material.tranmission = 1;
                // for some reason, this line needed to be added as well 
                child.material.transparent = true;
                child.material.opacity = 0.4;
            }

        if (child.name === "Screen") {
            child.material = new THREE.MeshBasicMaterial({  // this is for the computer screen
                // map: this.resources.items.screen, // commenting this screen play for now
            });
        }

        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.1, 0.1, 0.1);
    }
    // this is for the fish tank animation
    setAnimation(){
    // console.log(this.room.animations)
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    this.swim = this.mixer.clipAction(this.room.animations[0]);
    this.swim.play();
    }

    // listen for mouse movement and normalize x (-1,1)
    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 1) / window.innerWidth;
            this.lerp.target = this.rotation * 0.08;
        });
    }

    resize(){

    }
    update(){
        this.actualRoom.rotation.y = this.lerp.current;
        this
        this.mixer.update(this.time.delta * 0.001);
        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);

    }

}