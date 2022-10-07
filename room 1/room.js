import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js';


function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.shadowMap.enabled = true;

    // camera
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    // orbit controls
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 5);    // set orbit to 5 units above target
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white");


    // cylinders - pillars
    {
        const geometry = new THREE.CylinderGeometry(0.75, 1, 14, 12);
        const loader = new THREE.TextureLoader();
        function makeInstance(geometry, x, z) {
            const material = new THREE.MeshPhongMaterial({
                //color: 0xC0C0C0,
                map: loader.load('https://thumbs.dreamstime.com/b/antique-marble-column-texture-detail-181234917.jpg'),
            }); 

            const cylinder = new THREE.Mesh(geometry, material);
            scene.add(cylinder);

            cylinder.position.set(x, 9.5, z);
            cylinder.receiveShadow = true;
            cylinder.castShadow = true;

            return cylinder;
        }
        const cylinders = [
            makeInstance(geometry, 16, 16),
            makeInstance(geometry, 16, 8),
            makeInstance(geometry, 16, -8),
            makeInstance(geometry, 16, -16),
            makeInstance(geometry, 16, 0),
            makeInstance(geometry, -16, 0),
            makeInstance(geometry, -16, 8),
            makeInstance(geometry, -16, -8),
            makeInstance(geometry, -16, 16),
            makeInstance(geometry, -16, -16),

            makeInstance(geometry, -8, -16),
            makeInstance(geometry, 8, -16),
            makeInstance(geometry, 0, -16),
        ]; 
    }

    // cylinders 2 - pillar tops 
    {
        const geometry = new THREE.CylinderGeometry(1.25, 0.75, 1, 12);
        const loader = new THREE.TextureLoader();
        function makeInstance(geometry, x, z) {
            const material = new THREE.MeshPhongMaterial({
                //color: 0xC0C0C0,
                map: loader.load('https://thumbs.dreamstime.com/b/antique-marble-column-texture-detail-181234917.jpg'),
            }); 

            const cylinder = new THREE.Mesh(geometry, material);
            scene.add(cylinder);

            cylinder.position.set(x, 16, z);
            cylinder.receiveShadow = true;
            cylinder.castShadow = true;

            return cylinder;
        }
        const cylinders = [
            makeInstance(geometry, 16, 16),
            makeInstance(geometry, 16, 8),
            makeInstance(geometry, 16, -8),
            makeInstance(geometry, 16, -16),
            makeInstance(geometry, 16, 0),
            makeInstance(geometry, -16, 0),
            makeInstance(geometry, -16, 8),
            makeInstance(geometry, -16, -8),
            makeInstance(geometry, -16, 16),
            makeInstance(geometry, -16, -16),

            makeInstance(geometry, -8, -16),
            makeInstance(geometry, 8, -16),
            makeInstance(geometry, 0, -16),
        ]; 
    }
            
    // floor
    {
        const planeSize = 40;
        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://st.depositphotos.com/1166351/4122/i/950/depositphotos_41221851-stock-photo-ancient-roman-stone-wall-texture.jpg');
        texture.wrapS = THREE.MirroredRepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 8;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.BoxGeometry(planeSize, planeSize, 5);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        mesh.receiveShadow = true;
        scene.add(mesh);
    }

    // stairs 
    {
        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://st.depositphotos.com/1166351/4122/i/950/depositphotos_41221851-stock-photo-ancient-roman-stone-wall-texture.jpg');
        texture.wrapS = THREE.MirroredRepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = 40 / 8;
        texture.repeat.set(repeats, repeats);
        const stairMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        function makeInstance(geoh, mat, y, z) {
            const geo = new THREE.BoxGeometry(40, geoh, 1);
            const mesh = new THREE.Mesh(geo, mat);

            mesh.rotation.x = Math.PI * -.5;
            mesh.receiveShadow = true;
            scene.add(mesh);
            mesh.position.set(0, y, z);

            return mesh;
        }

        const stairs = [
            makeInstance(2, stairMat, 1, 21),
            makeInstance(4, stairMat, 0, 22),
            makeInstance(6, stairMat, -1, 23),
            makeInstance(8, stairMat, -2, 24),
        ]
    }

    // roof 
    {
        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://st.depositphotos.com/1166351/4122/i/950/depositphotos_41221851-stock-photo-ancient-roman-stone-wall-texture.jpg');
        texture.wrapS = THREE.MirroredRepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = 40 / 8;
        texture.repeat.set(repeats, repeats);

        const geometry = new THREE.CylinderGeometry( 0.8 / Math.sqrt( 2 ), 1 / Math.sqrt( 2 ), 1, 4, 1 );
        geometry.rotateY( Math.PI / 4 );
        const material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide } );
        const cone = new THREE.Mesh( geometry, material );
        cone.position.set(0, 19, 0);
        scene.add( cone );
        cone.scale.set( 40, 5, 40 );
    }

    // light
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.SpotLight(color, intensity);
        light.castShadow = true;
        light.position.set(0, 30, 0);

        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;

        scene.add(light);
        
        //const helper = new THREE.SpotLightHelper(light);
        //scene.add(helper);
    }

    // painting
    {
        const geo = new THREE.BoxGeometry(10, 10, 0.5);    
        const mat = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load("https://avatars.githubusercontent.com/u/73817977?v=4"),
            side: THREE.FrontSide,
        });
        const painting = new THREE.Mesh(geo, mat);
        painting.position.set(0, 8, -12);

        scene.add(painting);
    }
    
    //for responsive design
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
        renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render() {

        if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();