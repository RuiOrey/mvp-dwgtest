import * as Stats from 'stats-js/build/stats.min.js'
import * as THREE from 'three/build/three.js'

class TestThreeJs {

    stats: Stats;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    light: THREE.DirectionalLight;
    light2: THREE.DirectionalLight;
    box: THREE.BoxGeometry;

    initThreeJS = () => {

        let width = window.innerWidth;

        let height = window.innerHeight;

        console.log( window.innerWidth, window.innerHeight );

        this.initRendererScene( width, height );
        this.initMainCamera( width, height );

        this.initAxisHelper();

        this.initLights();
        this.initBox();

        this.camera.lookAt( this.scene.position );

    }

    private initBox() {
        let material = new THREE.MeshBasicMaterial( {
            color: 0xaaaaaa, wireframe: true
        } );

        // create a box and add it to the scene
        this.box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), material );

        this.scene.add( this.box );

        this.box.position.x = 0.5;
        this.box.rotation.y = 0.5;
    }

    private initMainCamera( width: number, height: number ) {

        let cameraDimensionsDivisor = 128;
        // create the camera
        //this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera = new THREE.OrthographicCamera( -width / cameraDimensionsDivisor, width / cameraDimensionsDivisor, height / cameraDimensionsDivisor, -height / cameraDimensionsDivisor, .1, 1000 );

        this.camera.position.set( 5, 5, 5 );

    }

    private initRendererScene( width: number, height: number ) {
// create the scene
        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer();

        // set size
        this.renderer.setSize( width, height );

        // add canvas to dom
        document.body.appendChild( this.renderer.domElement );
    }

    private initAxisHelper() {
        let axis = new THREE.AxisHelper( 10 );

        this.scene.add( axis );
    }

    private initLights() {

        this.light = new THREE.DirectionalLight( 0xffffff, 1.0 );

        this.light.position.set( 100, 100, 100 );

        this.scene.add( this.light );

        this.light2 = new THREE.DirectionalLight( 0xffffff, 1.0 );

        this.light2.position.set( -100, 100, -100 );

        this.scene.add( this.light2 );
    }

    animate = () => {
        requestAnimationFrame( () => {
            this.animate()
        } );
        this.render();
    }

    function

    render = () => {
        this.stats.begin();
        let timer = 0.002 * Date.now();
        this.box.position.y = 0.5 + 0.5 * Math.sin( timer );
        this.box.rotation.x += 0.1;
        this.stats.end();
        this.renderer.render( this.scene, this.camera );
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
let _test = new TestThreeJs();

// hack to put object on global context
(<any>window)._test = _test;
(<any>window).THREE = THREE;
document.body.appendChild( _test.stats.domElement );