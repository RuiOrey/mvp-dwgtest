import * as Stats from '/stats-js/build/stats.min.js'
import * as THREE from 'three/build/three.js'

class Test {
    user: string;
    stats: any;

    initThreeJS = () => {

        // create the scene
        let scene = new THREE.Scene()

        // create the camera
        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        let renderer = new THREE.WebGLRenderer()

        // set size
        renderer.setSize(window.innerWidth, window.innerHeight)

        // add canvas to dom
        document.body.appendChild(renderer.domElement)

        // add axis to the scene
        let axis = new THREE.AxisHelper(10)

        scene.add(axis)

        // add lights
        let light = new THREE.DirectionalLight(0xffffff, 1.0)

        light.position.set(100, 100, 100)

        scene.add(light)

        let light2 = new THREE.DirectionalLight(0xffffff, 1.0)

        light2.position.set(-100, 100, -100)

        scene.add(light2)

        let material = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa,
            wireframe: true
        })

        // create a box and add it to the scene
        let box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)

        scene.add(box)

        box.position.x = 0.5
        box.rotation.y = 0.5

        camera.position.x = 5
        camera.position.y = 5
        camera.position.z = 5

        camera.lookAt(scene.position)

        function animate(): void {
            requestAnimationFrame(animate)
            render()
        }

        function render(): void {
            let timer = 0.002 * Date.now()
            box.position.y = 0.5 + 0.5 * Math.sin(timer)
            box.rotation.x += 0.1
            renderer.render(scene, camera)
        }

        animate()
    }

    greeter = (person) => {
        return "Hello, " + person;
    }

    initStats = () => {
        this.stats = new Stats();
        this.stats.setMode(1); // 0: fps, 1: ms, 2: mb, 3+: custom

        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';

    }

    constructor() {
        this.user = "Jane User";
        document.body.innerHTML = this.greeter(this.user);
        this.initStats();
    }
}
let _test = new Test();

// hack to put object on global context
(<any>window)._test = _test;
(<any>window).THREE = THREE;
document.body.appendChild(_test.stats.domElement);