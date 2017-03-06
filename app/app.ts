import * as Stats from 'stats-js/build/stats.min.js'
import * as THREE from 'three/build/three.js'

class Test {

    user: string;
    stats: any;
    scene: any;
    camera: any;
    renderer: any;
    light: any;
    light2: any;
    box: any;


    initThreeJS = () => {

        let width = window.innerWidth;
        let height = window.innerHeight;

        console.log(window.innerWidth, window.innerHeight);
        let cameraDimensionsDivisor = 128;

        // create the scene
        this.scene = new THREE.Scene();

        // create the camera
        //this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera = new THREE.OrthographicCamera(-width / cameraDimensionsDivisor, width / cameraDimensionsDivisor, height / cameraDimensionsDivisor, -height / cameraDimensionsDivisor, .1, 1000);


        this.renderer = new THREE.WebGLRenderer();

        // set size
        this.renderer.setSize(width, height);

        // add canvas to dom
        document.body.appendChild(this.renderer.domElement);

        // add axis to the scene
        let axis = new THREE.AxisHelper(10);

        this.scene.add(axis);

        // add lights
        this.light = new THREE.DirectionalLight(0xffffff, 1.0);

        this.light.position.set(100, 100, 100);

        this.scene.add(this.light);

        this.light2 = new THREE.DirectionalLight(0xffffff, 1.0);

        this.light2.position.set(-100, 100, -100);

        this.scene.add(this.light2);

        let material = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            wireframe: true
        });

        // create a box and add it to the scene
        this.box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

        this.scene.add(this.box);

        this.box.position.x = 0.5;
        this.box.rotation.y = 0.5;

        this.camera.position.x = 5;
        this.camera.position.y = 5;
        this.camera.position.z = 5;

        this.camera.lookAt(this.scene.position);


    }


    animate = () => {
        requestAnimationFrame(()=> {
            this.animate()
        });
        this.render();
    }

    function

    render = () => {
        this.stats.begin();
        let timer = 0.002 * Date.now();
        this.box.position.y = 0.5 + 0.5 * Math.sin(timer);
        this.box.rotation.x += 0.1;
        this.stats.end();
        this.renderer.render(this.scene, this.camera);
    }


    initStats = () => {
        this.stats = new Stats();
        // this.stats.setMode(1); // 0: fps, 1: ms, 2: mb, 3+: custom

        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';

    }

    constructor() {
        this.initThreeJS();
        this.initStats();

        this.animate();
    }
}
let _test = new Test();

// hack to put object on global context
(<any>window)._test = _test;
(<any>window).THREE = THREE;
document.body.appendChild(_test.stats.domElement);