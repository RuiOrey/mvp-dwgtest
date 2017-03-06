"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stats = require("stats-js/build/stats.min.js");
var THREE = require("three/build/three.js");
var TestThreeJs = (function () {
    function TestThreeJs() {
        var _this = this;
        this.initThreeJS = function () {
            var width = window.innerWidth;
            var height = window.innerHeight;
            console.log(window.innerWidth, window.innerHeight);
            _this.initRendererScene(width, height);
            _this.initMainCamera(width, height);
            _this.initAxisHelper();
            _this.initLights();
            _this.initBox();
            _this.camera.lookAt(_this.scene.position);
        };
        this.animate = function () {
            requestAnimationFrame(function () {
                _this.animate();
            });
            _this.render();
        };
        this.render = function () {
            _this.stats.begin();
            var timer = 0.002 * Date.now();
            _this.box.position.y = 0.5 + 0.5 * Math.sin(timer);
            _this.box.rotation.x += 0.1;
            _this.stats.end();
            _this.renderer.render(_this.scene, _this.camera);
        };
        this.initStats = function () {
            _this.stats = new Stats();
            // this.stats.setMode(1); // 0: fps, 1: ms, 2: mb, 3+: custom
            _this.stats.domElement.style.position = 'absolute';
            _this.stats.domElement.style.left = '0px';
            _this.stats.domElement.style.top = '0px';
        };
        this.initThreeJS();
        this.initStats();
        this.animate();
    }
    TestThreeJs.prototype.initBox = function () {
        var material = new THREE.MeshBasicMaterial({
            color: 0xaaaaaa, wireframe: true
        });
        // create a box and add it to the scene
        this.box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
        this.scene.add(this.box);
        this.box.position.x = 0.5;
        this.box.rotation.y = 0.5;
    };
    TestThreeJs.prototype.initMainCamera = function (width, height) {
        var cameraDimensionsDivisor = 128;
        // create the camera
        //this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera = new THREE.OrthographicCamera(-width / cameraDimensionsDivisor, width / cameraDimensionsDivisor, height / cameraDimensionsDivisor, -height / cameraDimensionsDivisor, .1, 1000);
        this.camera.position.set(5, 5, 5);
    };
    TestThreeJs.prototype.initRendererScene = function (width, height) {
        // create the scene
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        // set size
        this.renderer.setSize(width, height);
        // add canvas to dom
        document.body.appendChild(this.renderer.domElement);
    };
    TestThreeJs.prototype.initAxisHelper = function () {
        var axis = new THREE.AxisHelper(10);
        this.scene.add(axis);
    };
    TestThreeJs.prototype.initLights = function () {
        this.light = new THREE.DirectionalLight(0xffffff, 1.0);
        this.light.position.set(100, 100, 100);
        this.scene.add(this.light);
        this.light2 = new THREE.DirectionalLight(0xffffff, 1.0);
        this.light2.position.set(-100, 100, -100);
        this.scene.add(this.light2);
    };
    return TestThreeJs;
}());
var _test = new TestThreeJs();
// hack to put object on global context
window._test = _test;
window.THREE = THREE;
document.body.appendChild(_test.stats.domElement);
//# sourceMappingURL=app.js.map