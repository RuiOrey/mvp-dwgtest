System.register(["./models/models"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NanoGraphics, TestThreeJs, _test;
    return {
        setters: [
            function (NanoGraphics_1) {
                NanoGraphics = NanoGraphics_1;
            }
        ],
        execute: function () {
            TestThreeJs = (function () {
                function TestThreeJs(domContainer) {
                    var _this = this;
                    this.selectedModel = null;
                    this.initedTransformControl = false;
                    this.initThreeJS(domContainer);
                    this.initStats();
                    this.animate();
                    this.renderer.domElement.addEventListener('dblclick', function (event) { _this.clickSelect(event); });
                }
                TestThreeJs.prototype.initThreeJS = function (domContainer) {
                    this.container = domContainer;
                    this.selectedModel = null;
                    var width = this.container.innerWidth;
                    var height = this.container.innerHeight;
                    this.initParameters();
                    this.initRendererScene(width, height);
                    this.initCameras(width, height, this.uiParams.camera);
                    this.initLights();
                    this.initBox();
                    this.initHelpers();
                    this.initModels();
                    this.initTextures();
                    this.initControls();
                    this.initGui();
                };
                TestThreeJs.prototype.initParameters = function () {
                    this.uiParams = {
                        camera: {
                            current: 2,
                            available: [
                                {
                                    name: "Orthographic",
                                    type: "orthographic",
                                    near: .1,
                                    far: 1000,
                                    rotationAngle: 45,
                                    position: { x: 0, y: 0, z: 100 },
                                    lookAt: { x: 0, y: 0, z: 0 },
                                    zoom: 0.1,
                                    sidesFrustumDivisor: 128,
                                    controlsParams: {
                                        lockRotation: true
                                    }
                                },
                                {
                                    name: "Perspective",
                                    type: "perspective",
                                    fov: 45,
                                    near: 1,
                                    far: 1000000,
                                    lookAt: { x: 0, y: 0, z: 0 },
                                    position: { x: 120, y: 60, z: 180 }
                                },
                                {
                                    name: "Isometric",
                                    type: "orthographic",
                                    near: .1,
                                    far: 1000,
                                    controlsParams: {
                                        isometricRotation: true
                                    },
                                    position: { x: 100, y: 100, z: 100 },
                                    zoom: 0.1,
                                    lookAt: { x: 0, y: 0, z: 0 },
                                    sidesFrustumDivisor: 128
                                }
                            ],
                            ui: {
                                camerasIds: {}
                            },
                            "isometric": {}
                        }
                    };
                    console.log("uiParams", this.uiParams);
                };
                TestThreeJs.prototype.initModels = function () {
                    this.testMeshes = [];
                    this.loadSTLModel();
                    //   this.loadOBJModel();
                };
                TestThreeJs.prototype.initTextures = function () {
                    var _this = this;
                    // instantiate a loader
                    var loader = new THREE.TextureLoader();
                    // load a resource
                    loader.load(
                    // resource URL
                    'assets/textures/UV_Grid_Sm.jpg', 
                    // Function when resource is loaded
                    function (texture) {
                        // do something with the texture
                        _this.testTextureMaterial = new THREE.MeshLambertMaterial({
                            map: texture
                            // vertexColors: THREE.VertexColors
                        });
                    }, 
                    // Function called when download progresses
                    function (xhr) {
                        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                    }, 
                    // Function called when download errors
                    function (xhr) {
                        console.log('An error happened');
                    });
                };
                TestThreeJs.prototype.loadSTLModel = function () {
                    this.testSTLGroup = new NanoGraphics.STLGroup();
                    this.scene.add(this.testSTLGroup);
                    var files = ['/assets/objects/stl/flanges/57725120-21-class_150_flange_nps_1_2_lwn_rf_20/class_150_flange_nps_1_2_lwn_rf_20.stl',
                        '/assets/objects/stl/batch_objects/terminal petroleiro_large.stl',
                        '/assets/objects/stl/batch_objects/coalescedor-gabriel1.stl',
                        '/assets/objects/stl/03092017/13.stl',
                        '/assets/objects/stl/03092017/13001.stl',
                        '/assets/objects/stl/03092017/13002.stl',
                        '/assets/objects/luis/CubeSphere.stl',
                        '/assets/objects/luis/teste.stl'
                    ];
                    this.testSTLGroup.addSTL(files[3], this.testMeshes);
                    this.testSTLGroup.addSTL(files[4], this.testMeshes);
                    this.testSTLGroup.addSTL(files[5], this.testMeshes);
                };
                TestThreeJs.prototype.attachTransformControl = function (_mesh, newCamera) {
                    if (newCamera || this.transformControl === undefined) {
                        this.transformControl = new NanoGraphics.TransformControls(this.camera, this.renderer.domElement);
                        this.scene.add(this.transformControl);
                    }
                    this.transformControl.detach();
                    //this.transformControl.attach( _mesh );
                    this.transformControl.attach(_mesh.bboxMesh);
                    _mesh.transformControl = this.transformControl;
                    //this.initedTransformControl = true;
                };
                TestThreeJs.prototype.loadOBJModel = function () {
                    var _this = this;
                    this.objLoader = new NanoGraphics.OBJLoader();
                    this.testObjs = [];
                    var files = ['/assets/objects/obj/testobj.obj',
                        '/assets/objects/luis/CubeSphere.obj'
                    ];
                    this.objLoader.load(files[1], function (object) {
                        object.traverse(function (child) {
                            if (child instanceof THREE.Mesh) {
                                _this.testObjs.push(child);
                                _this.testMeshes.push(child);
                            }
                        });
                        object.position.y = 0;
                        _this.scene.add(object);
                        _this.testObj = object;
                        // this.testObj.geometry.center();
                        // this.testObj.scale.set( _scl, _scl, _scl )
                    });
                };
                //controls need to be attached to camera
                TestThreeJs.prototype.initControls = function () {
                    for (var _i = 0, _a = this.cameras; _i < _a.length; _i++) {
                        var _camera = _a[_i];
                        _camera.controls = new NanoGraphics.OrbitControls(_camera, this.renderer.domElement);
                        var _cameraParams = _camera.controlsParams;
                        _camera.controls.params = _cameraParams;
                        if (_cameraParams) {
                            console.log(_cameraParams);
                            _camera.controls.enableRotate = !(_cameraParams.lockRotation || _cameraParams.isometricRotation);
                        }
                    }
                    this.setMainCamera(this.uiParams.camera.current);
                };
                TestThreeJs.prototype.initHelpers = function () {
                    this.initAxisHelper();
                    this.initGridHelper();
                };
                TestThreeJs.prototype.initGridHelper = function () {
                    var size = 100;
                    var divisions = 100;
                    this.gridHelper = new NanoGraphics.GridHelper(size, divisions);
                    // this.scene.add( this.gridHelper );
                    this.gridHelper.geometry.rotateX(Math.PI / 2);
                    //needed to not overlap the axis helper
                    this.gridHelper.position.z -= 0.001;
                    this.scene.add(this.gridHelper);
                };
                TestThreeJs.prototype.initBox = function () {
                    var material = new NanoGraphics.MeshBasicMaterial({
                        color: 0xaaaaaa, wireframe: true
                    });
                    // create a box and add it to the scene
                    this.box = new NanoGraphics.Mesh(new NanoGraphics.BoxGeometry(1, 1, 1), material);
                    this.scene.add(this.box);
                    this.box.position.x = 10.5;
                    this.box.rotation.y = 20.5;
                };
                TestThreeJs.prototype.initCameras = function (width, height, cameraParmeters) {
                    if (cameraParmeters === undefined || cameraParmeters.available === undefined) {
                        console.log("initCameras - No Cameras have been declared on parameters");
                        return;
                    }
                    this.cameras = [];
                    for (var _i = 0, _a = cameraParmeters.available; _i < _a.length; _i++) {
                        var _camera = _a[_i];
                        console.log(_camera);
                        this.initCamera(_camera);
                        var _name = _camera.name;
                        var _length = this.cameras.length - 1;
                        this.uiParams.camera.ui.camerasIds[_name] = _length;
                    }
                    this.actualCameraId = cameraParmeters.current ? cameraParmeters.current : 0;
                    this.setMainCamera(this.actualCameraId);
                };
                TestThreeJs.prototype.updateCameras = function () {
                    console.log("changed cameras");
                    this.setMainCamera(this.uiParams.camera.current);
                };
                TestThreeJs.prototype.initCamera = function (cameraParameters) {
                    var _camera;
                    switch (cameraParameters.type) {
                        case "orthographic":
                            _camera = this.initOrtographicCamera(cameraParameters);
                            break;
                        case "perspective":
                            _camera = this.initPrespectiveCamera(cameraParameters);
                            break;
                        default:
                            console.log("initCamera - no camera type specified.");
                            break;
                    }
                    if (_camera) {
                        this.cameras.push(_camera);
                    }
                };
                TestThreeJs.prototype.setMainCamera = function (id) {
                    this.camera = this.cameras[id];
                    if (this.camera.controls) {
                        for (var _i = 0, _a = this.cameras; _i < _a.length; _i++) {
                            var camera = _a[_i];
                            camera.controls.enableRotate = false;
                            camera.controls.enableDamping = false;
                            camera.controls.enableKeys = false;
                            camera.controls.enablePan = false;
                            camera.controls.enableZoom = false;
                        }
                        var _controlParams = this.camera.controlsParams;
                        this.camera.controls.enableDamping = _controlParams ? !_controlParams.lockDamping : true;
                        this.camera.controls.enableKeys = _controlParams ? !_controlParams.lockKeys : true;
                        this.camera.controls.enablePan = _controlParams ? !_controlParams.lockPan : true;
                        this.camera.controls.enableZoom = _controlParams ? !_controlParams.lockZoom : true;
                        this.camera.controls.enableRotate = _controlParams ? !(_controlParams.lockRotation || _controlParams.isometricRotation) : true;
                    }
                    this.actualCameraId = id;
                    if (this.selectedModel !== null) {
                        this.transformControl.detach();
                        this.transformControl.dispose();
                        this.transformControl.parent.remove(this.transformControl);
                        this.attachTransformControl(this.selectedModel, true);
                    }
                };
                TestThreeJs.prototype.initPrespectiveCamera = function (cameraParameters) {
                    var _camera = new NanoGraphics.PerspectiveCamera(45, this.container.innerWidth / this.container.innerHeight, 0.1, 1000);
                    _camera.lookAt(this.scene.position);
                    if (cameraParameters.fov) {
                        _camera.fov = cameraParameters.fov;
                    }
                    if (cameraParameters.near) {
                        _camera.near = cameraParameters.near;
                    }
                    if (cameraParameters.far) {
                        _camera.far = cameraParameters.far;
                    }
                    if (cameraParameters.position) {
                        console.log(cameraParameters.position);
                        _camera.position.set(cameraParameters.position.x, cameraParameters.position.y, cameraParameters.position.z);
                    }
                    if (cameraParameters.lookAt) {
                        _camera.lookAt(new NanoGraphics.Vector3(cameraParameters.lookAt.x, cameraParameters.lookAt.y, cameraParameters.lookAt.z));
                    }
                    if (cameraParameters.name) {
                        _camera.name = cameraParameters.name;
                    }
                    _camera.updateProjectionMatrix();
                    _camera.controlsParams = (cameraParameters.controlsParams !== undefined) ? cameraParameters.controlsParams : null;
                    this.prespectiveCamera = _camera; //for debug only
                    _camera.updateProjectionMatrix();
                    return _camera;
                };
                TestThreeJs.prototype.initOrtographicCamera = function (cameraParameters) {
                    // get width and height
                    var width = this.container.innerWidth;
                    var height = this.container.innerHeight;
                    // get values from parameters or assign defaults
                    var _sidesFrustumDivisor = cameraParameters.sidesFrustumDivisor ? cameraParameters.sidesFrustumDivisor : 128;
                    var _near = cameraParameters.near ? cameraParameters.near : .1;
                    var _far = cameraParameters.far ? cameraParameters.far : 1000;
                    var _position = cameraParameters.position ? cameraParameters.position : { x: 100, y: 100, z: 100 };
                    var _name = cameraParameters.name ? cameraParameters.name : "unnamed orto camera";
                    var _lookAt = cameraParameters.lookAt ? cameraParameters.lookAt : { x: 0, y: 0, z: 0 };
                    var _controlsParameters = (cameraParameters.controlsParams !== undefined) ? cameraParameters.controlsParams : null;
                    var _zoom = (cameraParameters.zoom !== undefined) ? cameraParameters.zoom : 1;
                    //inits the camera
                    var _ortographicCamera = new NanoGraphics.OrthographicCamera(-width / _sidesFrustumDivisor, width / _sidesFrustumDivisor, height / _sidesFrustumDivisor, -height / _sidesFrustumDivisor, _near, _far);
                    // assign not inited values
                    _ortographicCamera.position.set(_position.x, _position.y, _position.z);
                    _ortographicCamera.name = _name;
                    _ortographicCamera.zoom = _zoom;
                    _ortographicCamera.controlsParams = _controlsParameters;
                    _ortographicCamera.lookAt(new NanoGraphics.Vector3(_lookAt.x, _lookAt.y, _lookAt.z));
                    _ortographicCamera.sidesFrustumDivisor = _sidesFrustumDivisor;
                    _ortographicCamera.updateProjectionMatrix();
                    return _ortographicCamera;
                };
                TestThreeJs.prototype.initRendererScene = function (width, height) {
                    // create the scene
                    this.scene = new NanoGraphics.Scene();
                    this.renderer = new NanoGraphics.WebGLRenderer();
                    // set size
                    this.renderer.setSize(width, height);
                    this.renderer.setClearColor(0x111111, 1);
                    this.renderer.shadowMapEnabled = true;
                    // add canvas to dom
                    document.body.appendChild(this.renderer.domElement);
                };
                TestThreeJs.prototype.initAxisHelper = function () {
                    var axis = new NanoGraphics.AxisHelper(10);
                    this.scene.add(axis);
                };
                TestThreeJs.prototype.initLights = function () {
                    this.light = new NanoGraphics.DirectionalLight(0xffffff, 1.0);
                    this.light.position.set(10000, 10000, 10000);
                    this.scene.add(this.light);
                    this.light2 = new NanoGraphics.DirectionalLight(0xffffff, 1.0);
                    this.light2.position.set(-10000, 10000, -10000);
                    this.scene.add(this.light2);
                };
                TestThreeJs.prototype.cameraIsometricRotateLeft = function () {
                    this.camera.controls.isometricRotateLeft();
                };
                TestThreeJs.prototype.cameraIsometricRotateUp = function () {
                    this.camera.controls.isometricRotateUp();
                };
                TestThreeJs.prototype.cameraTop = function () {
                    this.camera.controls.top();
                };
                TestThreeJs.prototype.cameraBottom = function () {
                    this.camera.controls.bottom();
                };
                TestThreeJs.prototype.cameraLeft = function () {
                    this.camera.controls.left();
                };
                TestThreeJs.prototype.cameraRight = function () {
                    this.camera.controls.right();
                };
                TestThreeJs.prototype.cameraFront = function () {
                    this.camera.controls.front();
                };
                TestThreeJs.prototype.cameraBack = function () {
                    this.camera.controls.back();
                };
                TestThreeJs.prototype.initGui = function () {
                    var _this = this;
                    this.gui = new dat.GUI();
                    this.cameraUI = this.gui.addFolder('Cameras');
                    console.log(this.uiParams.camera.current, this.uiParams.camera.ui.camerasIds);
                    this.cameraUI.add(this.uiParams.camera, 'current', this.uiParams.camera.ui.camerasIds).listen().onChange(function () { _this.updateCameras(); });
                    this.cameraUI.add(this, 'cameraIsometricRotateLeft');
                    this.cameraUI.add(this, 'cameraIsometricRotateUp');
                    this.cameraUI.add(this, 'cameraTop');
                    this.cameraUI.add(this, 'cameraBottom');
                    this.cameraUI.add(this, 'cameraLeft');
                    this.cameraUI.add(this, 'cameraRight');
                    this.cameraUI.add(this, 'cameraFront');
                    this.cameraUI.add(this, 'cameraBack');
                    this.cameraUI.open();
                };
                TestThreeJs.prototype.onWindowResize = function () {
                    this.renderer.setSize(this.container.innerWidth, this.container.innerHeight);
                    this.camera.windowResize(this.container.innerWidth, this.container.innerHeight);
                };
                TestThreeJs.prototype.animate = function () {
                    var _this = this;
                    this.camera.controls.update();
                    requestAnimationFrame(function () {
                        _this.animate();
                    });
                    this.render();
                };
                TestThreeJs.prototype.render = function () {
                    this.stats.begin();
                    var timer = 0.002 * Date.now();
                    this.box.position.y = 0.5 + 0.5 * Math.sin(timer);
                    this.box.rotation.x += 0.1;
                    this.stats.end();
                    this.renderer.render(this.scene, this.camera);
                };
                TestThreeJs.prototype.initStats = function () {
                    this.stats = new Stats();
                    // this.stats.setMode(1); // 0: fps, 1: ms, 2: mb, 3+: custom_typings
                    document.body.appendChild(this.stats.domElement);
                    this.stats.domElement.style.position = 'absolute';
                    this.stats.domElement.style.left = '0px';
                    this.stats.domElement.style.top = '0px';
                };
                TestThreeJs.prototype.clickSelect = function (event) {
                    event.preventDefault();
                    var mouse3D = new NanoGraphics.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
                    var raycaster = new NanoGraphics.Raycaster();
                    raycaster.setFromCamera(mouse3D, this.camera);
                    var intersects = raycaster.intersectObjects(this.testMeshes);
                    console.log("intersected", intersects);
                    this.selectedModel = null;
                    if (intersects.length > 0) {
                        this.selectedModel = (intersects[0].object);
                        this.selectedModel.material.color.setHex(Math.random() * 0xffffff);
                        this.attachTransformControl(this.selectedModel);
                        // intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
                    }
                };
                return TestThreeJs;
            }());
            _test = new TestThreeJs(window);
            // hack to put object on global context - to debug
            window._test = _test;
            window.dat = dat;
            window.NanoGraphics = NanoGraphics;
            //exported scene to allow threejs browser inspector addon
            window.scene = _test.scene;
            window.onresize = function (event) {
                _test.onWindowResize();
            };
        }
    };
});
//# sourceMappingURL=app.js.map