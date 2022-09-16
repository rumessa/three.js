
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js';


function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    // camera
    const fov = 45;
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


    // cylinders - pillars
    {
        const geometry = new THREE.CylinderGeometry(0.75, 1, 8, 12);
        const loader = new THREE.TextureLoader();
        function makeInstance(geometry, x, z) {
            const material = new THREE.MeshBasicMaterial({
                color: 0xC0C0C0,
                map: loader.load('https://thumbs.dreamstime.com/b/antique-marble-column-texture-detail-181234917.jpg'),
            }); 

            const cylinder = new THREE.Mesh(geometry, material);
            scene.add(cylinder);

            cylinder.position.set(x, 4, z);

            return cylinder;
        }
        const cylinders = [
            makeInstance(geometry, 16, 16),
            makeInstance(geometry, 16, -16),
            makeInstance(geometry, -16, 16),
            makeInstance(geometry, -16, -16),
        ]; 
    }

    // cylinders 2 - pillar tops 
    {
        const geometry = new THREE.CylinderGeometry(1.25, 0.75, 1, 12);
        const loader = new THREE.TextureLoader();
        function makeInstance(geometry, x, z) {
            const material = new THREE.MeshBasicMaterial({
                color: 0xC0C0C0,
                map: loader.load('https://thumbs.dreamstime.com/b/antique-marble-column-texture-detail-181234917.jpg'),
            }); 

            const cylinder = new THREE.Mesh(geometry, material);
            scene.add(cylinder);

            cylinder.position.set(x, 8, z);

            return cylinder;
        }
        const cylinders = [
            makeInstance(geometry, 16, 16),
            makeInstance(geometry, 16, -16),
            makeInstance(geometry, -16, 16),
            makeInstance(geometry, -16, -16),
        ]; 
    }
            

    // floor
    {
        const planeSize = 40;
        const loader = new THREE.TextureLoader();
        //const texture = loader.load('https://as1.ftcdn.net/v2/jpg/02/71/07/20/1000_F_271072040_PqEdM901zo8g5M8HywHPIxcASzm2CikS.jpg');
        const texture = loader.load('https://st.depositphotos.com/1166351/4122/i/950/depositphotos_41221851-stock-photo-ancient-roman-stone-wall-texture.jpg');
        //const texture = loader.load('data:image/jpeg;base64,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')
        texture.wrapS = THREE.MirroredRepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 8;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
    }
    

    // light
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);
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