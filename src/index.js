"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// add styles
//import './style.css'
// three.js
var THREE = require("three");
// create the scene
var scene = new THREE.Scene();
// create the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
// set size
renderer.setSize(window.innerWidth, window.innerHeight);
// add canvas to dom
document.body.appendChild(renderer.domElement);
// add axis to the scene
var axis = new THREE.AxisHelper(10);
scene.add(axis);
// add lights
var light = new THREE.DirectionalLight(0xffffff, 1.0);
light.position.set(100, 100, 100);
scene.add(light);
var light2 = new THREE.DirectionalLight(0xffffff, 1.0);
light2.position.set(-100, 100, -100);
scene.add(light2);
var material = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa,
    wireframe: true
});
// create a box and add it to the scene
var box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
scene.add(box);
box.position.x = 0.5;
box.rotation.y = 0.5;
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;
camera.lookAt(scene.position);
function animate() {
    requestAnimationFrame(animate);
    render();
}
function render() {
    var timer = 0.002 * Date.now();
    box.position.y = 0.5 + 0.5 * Math.sin(timer);
    box.rotation.x += 0.1;
    renderer.render(scene, camera);
}
animate();
//# sourceMappingURL=index.js.map