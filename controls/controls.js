import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/GLTFLoader.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    // camera
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(2.05, 0.75, 2.05);
    camera.lookAt(new THREE.Vector3(0,0,0));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white");

    // add a cube
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({color: "pink"});
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // light
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set( 1, 2, 0.5 );
    directionalLight.position.normalize();
    scene.add(directionalLight);

    // keyboard movements
    var arrow = { left: 37, up: 38, right: 39, down: 40, 'w': 87, 'a': 65, 'd': 68, 's': 83 };
    var delta = 0.05;
    var xAxis = new THREE.Vector3(1,0,0);
    var zAxis = new THREE.Vector3(0,0,1);

    window.addEventListener('keydown', function(event) {
    event.preventDefault();
    switch (event.keyCode) {
        case (arrow.left || 'd'):
        camera.translateOnAxis(xAxis, -delta);
        break;
        case arrow.up || 'w':
        camera.translateOnAxis(zAxis, -delta);
        break;
        case arrow.right || 'a':
        camera.translateOnAxis(xAxis, delta);
        break;
        case arrow.down || 's':
        camera.translateOnAxis(zAxis, delta);
        break;
    }
    });

    function render() {
        resize();  
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    render();
                            
    function resize() {
        var canvas = renderer.domElement;
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        if (canvas.width !== width || canvas.height !== height) {
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    }
}

main();