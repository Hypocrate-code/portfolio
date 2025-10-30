"use client"


import { gsap } from "gsap";




import { useEffect } from 'react';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons.js';

import { DRACOLoader } from 'three/examples/jsm/Addons.js';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';

import Image from 'next/image';

import lune from "../../../public/lu/loader/lune.png"
// import text from "/lu/loader/text.png"
import dev_by_hypocrate from "../../../public/lu/loader/dev_by_hypocrate.png"


function Lu() {
    useEffect(() => {
        
        const loader = document.querySelector(".loader");
        const manager = new THREE.LoadingManager();

        const updateCamera = (cam : THREE.PerspectiveCamera) => {
            if (window.innerWidth > 250 && window.innerWidth <= 350) {
                // console.log(camera)                    
                cam.fov = 90;
                // cam.position.fromArray([ 40.4065455548676, 25.25047987460781, 37.87808559996682 ]);
                // cam.quaternion.fromArray([ -0.19591440505572982, 0.38657323466678334, 0.08440840062269932, 0.89724796017335 ]);
                cam.position.fromArray([25.20168922495842, 15.37553343330217, 22.15704916083716]);
                cam.quaternion.fromArray([ -0.18197653209566625, 0.411422189022287, 0.0842064045613917, 0.889115068805713 ]);
            }
            else if (window.innerWidth > 350 && window.innerWidth <= 450) {
                
                cam.fov = 80;

                cam.position.fromArray([ 24.13186558858966, 14.85987113040177, 23.451919677961737 ]);
                cam.quaternion.fromArray([ -0.18398120827118758, 0.39016267391401577, 0.07987967561857998, 0.8986340970107964 ]);
                
            }
            else if (window.innerWidth > 450 && window.innerWidth <= 550) {
                cam.fov = 70;
                cam.position.fromArray([ 23.790708977711276, 14.77876705881797, 23.856837057198838 ]);
                cam.quaternion.fromArray([ -0.18614124535440443, 0.38339802191219846, 0.07919386607019217, 0.9011579912249468 ]);
                
            }
            else if (window.innerWidth > 550 && window.innerWidth <= 650) {
                cam.fov = 60;
                
                cam.position.fromArray([ 25.598374721208856, 14.544312260532255, 23.815641988289553 ]);
                cam.quaternion.fromArray([ -0.17928697176579342, 0.39735052190008197, 0.0794672243405337, 0.8964673472895682 ]);
                
            }
            else if (window.innerWidth > 650 && window.innerWidth <= 750) {
                cam.fov = 50;
                cam.position.fromArray([ 27.89133918649364, 15.676916531961552, 25.329112647654252 ]);
                cam.quaternion.fromArray([ -0.178709370809948, 0.4038035261241124, 0.08075777841352959, 0.8935792378408067 ]);
                
            }
            else {
                cam.fov = 27.2;
                cam.position.fromArray([ 40.93281781873794, 21.58863795222621, 36.303748934892646 ]);
                cam.quaternion.fromArray([ -0.164410702971, 0.4083242636258588, 0.07502818601132932, 0.8947687901278358 ]);
                
            }
        }


        if (loader) {
            manager.onLoad = function () {
                loader.classList.add('loader-none');
            }
        }

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        const TextureMap = {
            1: "/lu/textures/1.webp",
            2: "/lu/textures/2.webp",
            3: "/lu/textures/3.webp",
            4: "/lu/textures/4.webp",
            5: "/lu/textures/5.webp",
            6: "/lu/textures/6.webp",
            7: "/lu/textures/7.webp",
            8: "/lu/textures/8.webp",
            9: "/lu/textures/9.webp"
        }

        const LoadedTexture: Record<string, THREE.Texture> = {};

        const textureLoader = new THREE.TextureLoader();
        
        Object.entries(TextureMap).forEach(([key, val]) => {
            const texture = textureLoader.load(val);
            texture.flipY = false;
            texture.colorSpace = THREE.SRGBColorSpace;
            LoadedTexture[key] = texture;
        })

        const gltfLoader = new GLTFLoader(manager);
        
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/lu/draco/')
        gltfLoader.setDRACOLoader(dracoLoader);
        
        const scene = new THREE.Scene();
    
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const camera = new THREE.PerspectiveCamera(
            27.2,
            // 90,
            sizes.width / sizes.height,
            0.1,
            1000
        )

        updateCamera(camera);
        // camera.lookAt(6, 4, 6    );

        gsap.from(camera.position, {
            duration: 3,
            z: camera.position.z,
            y: camera.position.y,
            x: 4,
            ease: "power2.out",
        });
        gsap.from(camera.quaternion, {
            duration: 3,
            x: 0.2,
            y: camera.position.y,
            z: camera.position.z,
            ease: "power2.out",
        });




                    // camera.position.z = 10;
        camera.updateProjectionMatrix();

        interface ClickableMesh {
            mesh: THREE.Mesh;
            url: string;
        }

        const clickableMeshes: ClickableMesh[] = [];        

        // --- Événements souris ---
        function onMouseMove(event : MouseEvent) {
            // Normaliser les coordonnées de la souris
            mouse.x = (event.clientX / sizes.width) * 2 - 1;
            mouse.y = -(event.clientY / sizes.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(clickableMeshes.map( obj => obj.mesh ));

            // Si on survole le mesh → curseur pointer
            
            document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
        }

        function onClick(event : MouseEvent) {
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(clickableMeshes.map( obj => obj.mesh ));

            if (intersects.length > 0) {
                // 🔗 Redirection ici :
                const clickedMesh = intersects[0].object;
                const found = clickableMeshes.find(c => c.mesh === clickedMesh);
                if (found) {
                    window.location.href = found.url;
                }
            }
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onClick);

        gltfLoader.load(

            'lu/models/ROOM_v15-v1.glb',
            (glb) => {
                glb.scene.traverse(child =>{
                    // console.log(child);
                    
                    if (child instanceof THREE.Mesh) {
                        if (Object.keys(TextureMap).includes(child.name)) {
                            const material = new THREE.MeshBasicMaterial({
                                map: LoadedTexture[child.name]
                            })
                            child.material = material;
                            if (child.material.map) {
                                child.material.map.minFilter = THREE.LinearFilter;
                            }
                        }
                        else if (child.name === "pc") {
                            const video = document.createElement('video');
                            video.src = '/lu/textures/HypLoad_extrait.mov';
                            video.loop = true;
                            video.muted = true;
                            video.playsInline = true;
                            video.play();

                            const videoTexture = new THREE.VideoTexture(video);
                            videoTexture.flipY = false;
                            videoTexture.colorSpace = THREE.SRGBColorSpace;

                            const material = new THREE.MeshBasicMaterial({ map: videoTexture })
                            child.material = material;

                        }
                        else if (child.name === "lu" || child.name === "hypo") {
                            const material = new THREE.MeshStandardMaterial({
                                emissive: new THREE.Color(0xad892b),
                                emissiveIntensity: 2,                 
                                color: 0xad892b                     
                            });

                            child.material = material;

                            const mesh = child as THREE.Mesh;


                            const box = new THREE.Box3().setFromObject(child);
                            const size = new THREE.Vector3();
                            const center = new THREE.Vector3();
                            box.getSize(size);
                            box.getCenter(center);

                            const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);

                            const materialBlock = new THREE.MeshBasicMaterial({
                                transparent: true,
                                opacity: 0

                            });
                            const block = new THREE.Mesh(geometry, materialBlock) as THREE.Mesh;

                            block.position.copy(center);
                    
                            switch (child.name) {
                                case "lu":
                                    clickableMeshes.push({ mesh: block, url: "https://instagram.com/jl.lucien" });
                                    break;
                                        
                                default:
                                    clickableMeshes.push({ mesh: block, url: "https://instagram.com/hypocr4te" });
                                    break;
                            }
                                    
                            scene.add(block);

                        }
                        
                    }
                })
                scene.add(glb.scene);
           }
        )

        const canvas = document.getElementById('threeCanvas');
        
        if (canvas) {
            const renderer = new THREE.WebGLRenderer({
                canvas,
                antialias: false 
                 
            });

            renderer.dispose();
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x0a0733);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enablePan = false;
            controls.enableDamping = true;
            controls.dampingFactor = 0.04;
            controls.update();
            controls.target.set(6, 4, 6);
            controls.minPolarAngle = 0;
            controls.maxPolarAngle = Math.PI/2;
            controls.minAzimuthAngle = 0;
            controls.maxAzimuthAngle = Math.PI/2;
            controls.minDistance = 6;
            controls.maxDistance = 60;


            document.body.appendChild(renderer.domElement);

            
            
            
            





            const animate = () => {
                controls.update();
                // console.log('pos', camera.position.toArray());
                // console.log('quat', camera.quaternion.toArray());
                // console.log('pos', camera.position.toArray());
                // console.log('qat', camera.quaternion.toArray());
                renderer.render(scene, camera);
                window.requestAnimationFrame(animate);
            }
            animate();

            window.addEventListener("resize", () => {
                sizes.width = window.innerWidth;
                sizes.height = window.innerHeight;
                
                // Update camera
                camera.aspect = sizes.width / sizes.height;
                camera.updateProjectionMatrix();
                updateCamera(camera);
                
                // Update renderer
                renderer.setSize(sizes.width, sizes.height);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            })
            updateCamera(camera);

        }







    }, [])
    return (
        <>
            <div className="loader">
                <div className="container">
                    <div id="lune" className="lune-container">
                        <Image
                            src={lune}
                            alt='logo lune'
                        />
                    </div>
                </div>
            </div>
            <canvas id='threeCanvas'/>
        </>
    )

}

export default Lu