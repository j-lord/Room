import * as THREE from 'three';
import Experience from "../Experience.js"

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        
        this.setModel();

        }


    setModel(){
        console.log(this.actualRoom);
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
                child.material.color.set(0xffffff);
                child.material.ior = 3;
                child.material.tranmission = 1;
                child.material.opacity = 1;
                console.log(child.material);
                console.log(child);
                // this.scene.add(child.material)
                //  is the same as this.scene.add(child.material)
        }
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.1, 0.1, 0.1);
    }

    resize(){

    }
    update(){
    }

}