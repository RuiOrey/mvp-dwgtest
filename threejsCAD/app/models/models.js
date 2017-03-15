System.register([], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var Scene, WebGLRenderer, DirectionalLight, Mesh, MeshNormalMaterial, MeshLambertMaterial, MeshPhongMaterial, Color, Material, Vector3, Box3, BoxHelper, Object3D, STLGroup, UIManager, GridHelper, AxisHelper, OrbitControls, TransformControls, MeshBasicMaterial, BoxGeometry, Camera, PerspectiveCamera, OrthographicCamera, STLLoader, OBJLoader, Raycaster;
    return {
        setters: [],
        execute: function () {
            Scene = (function (_super) {
                __extends(Scene, _super);
                function Scene() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Scene;
            }(THREE.Scene));
            exports_1("Scene", Scene);
            WebGLRenderer = (function (_super) {
                __extends(WebGLRenderer, _super);
                function WebGLRenderer() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return WebGLRenderer;
            }(THREE.WebGLRenderer));
            exports_1("WebGLRenderer", WebGLRenderer);
            DirectionalLight = (function (_super) {
                __extends(DirectionalLight, _super);
                function DirectionalLight() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return DirectionalLight;
            }(THREE.DirectionalLight));
            exports_1("DirectionalLight", DirectionalLight);
            Mesh = (function (_super) {
                __extends(Mesh, _super);
                function Mesh() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Mesh;
            }(THREE.Mesh));
            exports_1("Mesh", Mesh);
            MeshNormalMaterial = (function (_super) {
                __extends(MeshNormalMaterial, _super);
                function MeshNormalMaterial() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return MeshNormalMaterial;
            }(THREE.MeshNormalMaterial));
            exports_1("MeshNormalMaterial", MeshNormalMaterial);
            MeshLambertMaterial = (function (_super) {
                __extends(MeshLambertMaterial, _super);
                function MeshLambertMaterial() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return MeshLambertMaterial;
            }(THREE.MeshLambertMaterial));
            exports_1("MeshLambertMaterial", MeshLambertMaterial);
            MeshPhongMaterial = (function (_super) {
                __extends(MeshPhongMaterial, _super);
                function MeshPhongMaterial() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return MeshPhongMaterial;
            }(THREE.MeshPhongMaterial));
            exports_1("MeshPhongMaterial", MeshPhongMaterial);
            Color = (function (_super) {
                __extends(Color, _super);
                function Color() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Color;
            }(THREE.Color));
            exports_1("Color", Color);
            Material = (function (_super) {
                __extends(Material, _super);
                function Material() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Material;
            }(THREE.Material));
            exports_1("Material", Material);
            Vector3 = (function (_super) {
                __extends(Vector3, _super);
                function Vector3() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Vector3;
            }(THREE.Vector3));
            exports_1("Vector3", Vector3);
            Box3 = (function (_super) {
                __extends(Box3, _super);
                function Box3() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Box3;
            }(THREE.Box3));
            exports_1("Box3", Box3);
            BoxHelper = (function (_super) {
                __extends(BoxHelper, _super);
                function BoxHelper() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return BoxHelper;
            }(THREE.BoxHelper));
            exports_1("BoxHelper", BoxHelper);
            Object3D = (function (_super) {
                __extends(Object3D, _super);
                function Object3D() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Object3D;
            }(THREE.Object3D));
            exports_1("Object3D", Object3D);
            STLGroup = (function (_super) {
                __extends(STLGroup, _super);
                function STLGroup() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                STLGroup.prototype.addSTL = function (file, meshesArray) {
                    var _this = this;
                    var _stlLoader = new STLLoader();
                    _stlLoader.load(file, function (geometry) {
                        // var material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
                        //let material = new MeshNormalMaterial();
                        var material;
                        //let meshMaterial = material;
                        if (geometry.hasColors) {
                            material = new MeshPhongMaterial({
                                opacity: geometry.alpha,
                                vertexColors: THREE.VertexColors
                            });
                        }
                        else {
                            material = new MeshLambertMaterial({ side: THREE.DoubleSide });
                        }
                        var _tempMesh = new Mesh(geometry, material);
                        _tempMesh.castShadow = true;
                        _tempMesh.receiveShadow = true;
                        var bbox = new BoxHelper(_tempMesh);
                        // bbox.update();
                        _tempMesh.add(bbox);
                        //this.testStl.add( new THREE.BoxHelper( this.testStl ) );
                        // this.testStl.geometry.center();
                        _tempMesh.bboxMesh = bbox;
                        var _scale = 0.1;
                        _tempMesh.scale.set(_scale, _scale, _scale);
                        var pivot = new THREE.Object3D();
                        pivot.add(_tempMesh);
                        var destinationChild = _tempMesh;
                        _this.add(pivot);
                        meshesArray.push(destinationChild);
                        //this.add( _tempMesh );
                        _this.centerMeshes();
                    });
                };
                STLGroup.prototype.centerMeshes = function () {
                    var children;
                    children = this.children;
                    var completeBoundingBox = new Box3(); // create a new box which will contain the entire values
                    for (var i = 0, j = children.length; i < j; i++) {
                        var box = new Box3();
                        box.setFromObject(children[i]);
                        box.translate(children[i].position); // translate the geometries bounding box by the meshes position
                        children[i].bboxMesh2 = box;
                        var _boxCenter = box.getCenter();
                        completeBoundingBox.expandByPoint(box.max).expandByPoint(box.min); // add the max and min values to your completeBoundingBox
                    }
                    this.box = completeBoundingBox;
                    var objectCenter = completeBoundingBox.getCenter();
                    console.log('This is the center of your Object3D:', objectCenter);
                    // You want the center of you bounding box to be at 0|0|0
                    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                        var child = children_1[_i];
                        child.children[0].geometry.center();
                        child.children[0].position.x += objectCenter.x;
                        child.children[0].position.y += objectCenter.y;
                        child.children[0].position.z += objectCenter.z;
                        //  child.geometry.translate( -objectCenter.x, -objectCenter.y, -objectCenter.z );
                    }
                    this.position.x -= objectCenter.x;
                    this.position.y -= objectCenter.y;
                    this.position.z -= objectCenter.z;
                };
                STLGroup.prototype.scaleCenteredGroup = function (x, y, z) {
                    var children;
                    var scaleVector;
                    scaleVector = new Vector3(x, y, z);
                    children = this.children;
                    for (var i = 0, j = children.length; i < j; i++) {
                        children[i].scale.set(x, y, z);
                    }
                    this.centerMeshes();
                };
                return STLGroup;
            }(Object3D));
            exports_1("STLGroup", STLGroup);
            UIManager = (function (_super) {
                __extends(UIManager, _super);
                function UIManager() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return UIManager;
            }(dat.GUI));
            exports_1("UIManager", UIManager);
            GridHelper = (function (_super) {
                __extends(GridHelper, _super);
                function GridHelper() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return GridHelper;
            }(THREE.GridHelper));
            exports_1("GridHelper", GridHelper);
            AxisHelper = (function (_super) {
                __extends(AxisHelper, _super);
                function AxisHelper() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return AxisHelper;
            }(THREE.AxisHelper));
            exports_1("AxisHelper", AxisHelper);
            OrbitControls = (function (_super) {
                __extends(OrbitControls, _super);
                function OrbitControls() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    // Mouse buttons swapping in relation to original mappings
                    _this.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.RIGHT, PAN: THREE.MOUSE.MIDDLE };
                    // distance when aligning in a axis
                    _this.axisDistance = 100;
                    return _this;
                }
                OrbitControls.prototype.isometricRotate = function (axis1, axis2, antiClockwise) {
                    console.log("params", this.params);
                    if (!this.params || !this.params.isometricRotation && !this.params.lockRotate) {
                        return;
                    }
                    var _axis1Positive = this.object.position[axis1] > 0;
                    var _axis2Positive = this.object.position[axis2] > 0;
                    var _sameSignal = _axis1Positive == _axis2Positive;
                    if (antiClockwise) {
                        var _temp = axis1;
                        axis1 = axis2;
                        axis2 = _temp;
                    }
                    if (_sameSignal) {
                        this.object.position[axis1] = -this.object.position[axis1];
                    }
                    else {
                        this.object.position[axis2] = -this.object.position[axis2];
                    }
                };
                OrbitControls.prototype.isometricRotateLeft = function () {
                    this.isometricRotate("x", "z");
                };
                OrbitControls.prototype.isometricRotateUp = function () {
                    this.isometricRotate("z", "y");
                };
                OrbitControls.prototype.top = function () {
                    this.alignInAxis("y");
                };
                OrbitControls.prototype.bottom = function () {
                    this.alignInAxis("y", true);
                };
                OrbitControls.prototype.front = function () {
                    this.alignInAxis("z");
                };
                OrbitControls.prototype.back = function () {
                    this.alignInAxis("z", true);
                };
                OrbitControls.prototype.right = function () {
                    this.alignInAxis("x");
                };
                OrbitControls.prototype.left = function () {
                    this.alignInAxis("x", true);
                };
                OrbitControls.prototype.alignInAxis = function (axis, isNegative) {
                    console.log("align", axis);
                    if (this.params && (this.params.isometricRotation || this.params.lockRotate)) {
                        return;
                    }
                    this.object.position.set(0, 0, 0);
                    this.object.position[axis] = this.axisDistance;
                    if (isNegative) {
                        this.object.position[axis] = -this.object.position[axis];
                    }
                };
                return OrbitControls;
            }(THREE.OrbitControls));
            exports_1("OrbitControls", OrbitControls);
            TransformControls = (function (_super) {
                __extends(TransformControls, _super);
                function TransformControls(camera, domElement) {
                    var _this = _super.call(this, camera, domElement) || this;
                    _this.domEl = domElement;
                    return _this;
                }
                return TransformControls;
            }(THREE.TransformControls));
            exports_1("TransformControls", TransformControls);
            MeshBasicMaterial = (function (_super) {
                __extends(MeshBasicMaterial, _super);
                function MeshBasicMaterial() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return MeshBasicMaterial;
            }(THREE.MeshBasicMaterial));
            exports_1("MeshBasicMaterial", MeshBasicMaterial);
            BoxGeometry = (function (_super) {
                __extends(BoxGeometry, _super);
                function BoxGeometry() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return BoxGeometry;
            }(THREE.BoxGeometry));
            exports_1("BoxGeometry", BoxGeometry);
            Camera = (function (_super) {
                __extends(Camera, _super);
                function Camera() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Camera;
            }(THREE.Camera));
            exports_1("Camera", Camera);
            PerspectiveCamera = (function (_super) {
                __extends(PerspectiveCamera, _super);
                function PerspectiveCamera() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                PerspectiveCamera.prototype.windowResize = function (containerWidth, containerHeight) {
                    this.aspect = containerWidth / containerHeight;
                    this.updateProjectionMatrix();
                };
                return PerspectiveCamera;
            }(THREE.PerspectiveCamera));
            exports_1("PerspectiveCamera", PerspectiveCamera);
            OrthographicCamera = (function (_super) {
                __extends(OrthographicCamera, _super);
                function OrthographicCamera() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                OrthographicCamera.prototype.windowResize = function (containerWidth, containerHeight) {
                    // update the camera
                    this.left = -containerHeight / this.sidesFrustumDivisor;
                    this.right = containerHeight / this.sidesFrustumDivisor;
                    this.top = containerHeight / this.sidesFrustumDivisor;
                    this.bottom = -containerHeight / this.sidesFrustumDivisor;
                    this.updateProjectionMatrix();
                };
                OrthographicCamera.prototype.isometricRotation = function () {
                };
                return OrthographicCamera;
            }(THREE.OrthographicCamera));
            exports_1("OrthographicCamera", OrthographicCamera);
            STLLoader = (function (_super) {
                __extends(STLLoader, _super);
                function STLLoader() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return STLLoader;
            }(THREE.STLLoader));
            exports_1("STLLoader", STLLoader);
            OBJLoader = (function (_super) {
                __extends(OBJLoader, _super);
                function OBJLoader() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return OBJLoader;
            }(THREE.OBJLoader));
            exports_1("OBJLoader", OBJLoader);
            Raycaster = (function (_super) {
                __extends(Raycaster, _super);
                function Raycaster() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Raycaster;
            }(THREE.Raycaster));
            exports_1("Raycaster", Raycaster);
        }
    };
});
//# sourceMappingURL=models.js.map