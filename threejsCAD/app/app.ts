/// <reference path="../typings/index.d.ts" />
import  * as NanoGraphics from './models/models'

class TestThreeJs
{
    public container: Window;
    public uiParams: any;
    public stats: Stats;
    public scene: NanoGraphics.Scene;
    public camera: NanoGraphics.Camera;
    public cameras: Array<NanoGraphics.Camera>;
    public actualCameraId: number;
    public ortographicCamera: NanoGraphics.OrthographicCamera;
    public prespectiveCamera: NanoGraphics.PerspectiveCamera;
    public renderer: NanoGraphics.WebGLRenderer;
    public light: NanoGraphics.DirectionalLight;
    public light2: NanoGraphics.DirectionalLight;
    public box: NanoGraphics.Mesh;
    public gridHelper: NanoGraphics.GridHelper;
    public gui: dat.GUI;
    public cameraUI: dat.GUI;
    public cameraParams: any;
    public stlLoader: NanoGraphics.STLLoader;
    public objLoader: NanoGraphics.OBJLoader;
    public testStl: NanoGraphics.Mesh;
    public testSTLGroup: NanoGraphics.STLGroup;
    public testObj: NanoGraphics.Mesh;
    public testObjs: Array <NanoGraphics.Mesh>;
    public testMeshes: Array<NanoGraphics.Mesh>;
    public transformControls: Array <NanoGraphics.TransformControls>;
    public sidesFrustumDivisor: number;
    public initedTransformControl: boolean;
    public transformControl: NanoGraphics.TransformControls;
    public testTextureMaterial: NanoGraphics.MeshBasicMaterial;
    public selectedModel: NanoGraphics.Mesh;

    private initThreeJS( domContainer )
        {

            this.container = domContainer;
            this.selectedModel = null;

            let width = this.container.innerWidth;

            let height = this.container.innerHeight;

            this.initParameters();
            this.initRendererScene( width, height );
            this.initCameras( width, height, this.uiParams.camera );

            this.initLights();
            this.initBox();
            this.initHelpers();
            this.initModels();
            this.initTextures();

            this.initControls();

            this.initGui();

        }

    private initParameters()
        {
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
                            }
                            ,
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
            }
            console.log( "uiParams", this.uiParams );
        }

    private initModels()
        {
            this.testMeshes = [];
            this.loadSTLModel();
            //   this.loadOBJModel();
        }

    private initTextures()
        {
            // instantiate a loader
            let loader = new THREE.TextureLoader();

            // load a resource
            loader.load(
                // resource URL
                'assets/textures/UV_Grid_Sm.jpg',
                // Function when resource is loaded
                ( texture ) =>
                {
                    // do something with the texture
                    this.testTextureMaterial = new THREE.MeshLambertMaterial( {
                        map: texture
                        // vertexColors: THREE.VertexColors
                    } );
                },
                // Function called when download progresses
                function ( xhr )
                {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                // Function called when download errors
                function ( xhr )
                {
                    console.log( 'An error happened' );
                }
            );
        }

    private loadSTLModel()
        {

            this.testSTLGroup = new NanoGraphics.STLGroup();
            this.scene.add( this.testSTLGroup );

            let files =
                [ '/assets/objects/stl/flanges/57725120-21-class_150_flange_nps_1_2_lwn_rf_20/class_150_flange_nps_1_2_lwn_rf_20.stl',
                  '/assets/objects/stl/batch_objects/terminal petroleiro_large.stl',
                  '/assets/objects/stl/batch_objects/coalescedor-gabriel1.stl',
                  '/assets/objects/stl/03092017/13.stl',
                  '/assets/objects/stl/03092017/13001.stl',
                  '/assets/objects/stl/03092017/13002.stl',
                  '/assets/objects/luis/CubeSphere.stl',
                  '/assets/objects/luis/teste.stl'
                ];

            this.testSTLGroup.addSTL( files[ 3 ], this.testMeshes );
            this.testSTLGroup.addSTL( files[ 4 ], this.testMeshes );
            this.testSTLGroup.addSTL( files[ 5 ], this.testMeshes );

        }

    private attachTransformControl( _mesh: NanoGraphics.Object3D, newCamera?: boolean )
        {
            if ( newCamera || this.transformControl === undefined )
                {
                    this.transformControl = new NanoGraphics.TransformControls( this.camera, this.renderer.domElement );
                    this.scene.add( this.transformControl );
                }
            this.transformControl.detach();
            //this.transformControl.attach( _mesh );
            this.transformControl.attach( _mesh.bboxMesh );
            _mesh.transformControl = this.transformControl;

            //this.initedTransformControl = true;

        }

    private loadOBJModel()
        {
            this.objLoader = new NanoGraphics.OBJLoader();

            this.testObjs = [];

            let files =
                [ '/assets/objects/obj/testobj.obj',
                  '/assets/objects/luis/CubeSphere.obj'
                ];

            this.objLoader.load( files[ 1 ], ( object ) =>
            {
                object.traverse( ( child ) =>
                {
                    if ( child instanceof THREE.Mesh )
                        {
                            this.testObjs.push( <NanoGraphics.Mesh>child );

                            this.testMeshes.push( <NanoGraphics.Mesh>child );

                        }
                } );

                object.position.y = 0;
                this.scene.add( object );
                this.testObj = object;
                // this.testObj.geometry.center();
                // this.testObj.scale.set( _scl, _scl, _scl )
            } )
        }

    //controls need to be attached to camera
    private initControls()
        {
            for ( let _camera of this.cameras )
                {
                    _camera.controls = new NanoGraphics.OrbitControls( _camera, this.renderer.domElement );
                    let _cameraParams = _camera.controlsParams;
                    _camera.controls.params = _cameraParams;
                    if ( _cameraParams )
                        {
                            console.log( _cameraParams );
                            _camera.controls.enableRotate = !(_cameraParams.lockRotation || _cameraParams.isometricRotation);
                        }

                }
            this.setMainCamera( this.uiParams.camera.current );
        }

    private initHelpers()
        {

            this.initAxisHelper();
            this.initGridHelper();
        }

    private initGridHelper()
        {
            let size = 100;
            let divisions = 100;

            this.gridHelper = new NanoGraphics.GridHelper( size, divisions );
            // this.scene.add( this.gridHelper );

            this.gridHelper.geometry.rotateX( Math.PI / 2 );

            //needed to not overlap the axis helper
            this.gridHelper.position.z -= 0.001;

            this.scene.add( this.gridHelper );
        }

    private initBox()
        {
            let material = new NanoGraphics.MeshBasicMaterial( {
                color: 0xaaaaaa, wireframe: true
            } );

            // create a box and add it to the scene
            this.box = new NanoGraphics.Mesh( new NanoGraphics.BoxGeometry( 1, 1, 1 ), material );

            this.scene.add( this.box );

            this.box.position.x = 10.5;
            this.box.rotation.y = 20.5;
        }

    private initCameras( width: number, height: number, cameraParmeters: any )
        {

            if ( cameraParmeters === undefined || cameraParmeters.available === undefined )
                {
                    console.log( "initCameras - No Cameras have been declared on parameters" );
                    return;
                }

            this.cameras = [];

            for ( let _camera of cameraParmeters.available )
                {
                    console.log( _camera );
                    this.initCamera( _camera );
                    let _name = _camera.name;
                    let _length = this.cameras.length - 1;
                    this.uiParams.camera.ui.camerasIds[ _name ] = _length;
                }

            this.actualCameraId = cameraParmeters.current ? cameraParmeters.current : 0;
            this.setMainCamera( this.actualCameraId );

        }

    private updateCameras()
        {
            console.log( "changed cameras" );
            this.setMainCamera( this.uiParams.camera.current );
        }

    private initCamera( cameraParameters: any )
        {
            let _camera: NanoGraphics.Camera;

            switch ( cameraParameters.type )
            {
                case "orthographic":
                    _camera = this.initOrtographicCamera( cameraParameters );
                    break;
                case "perspective":
                    _camera = this.initPrespectiveCamera( cameraParameters );
                    break;
                default:
                    console.log( "initCamera - no camera type specified." );
                    break;
            }

            if ( _camera )
                {
                    this.cameras.push( _camera );
                }

        }

    private setMainCamera( id )
        {

            this.camera = this.cameras[ id ];
            if ( this.camera.controls )
                {
                    for ( let camera of this.cameras )
                        {
                            camera.controls.enableRotate = false;
                            camera.controls.enableDamping = false;
                            camera.controls.enableKeys = false;
                            camera.controls.enablePan = false;
                            camera.controls.enableZoom = false;
                        }

                    let _controlParams = this.camera.controlsParams;

                    this.camera.controls.enableDamping = _controlParams ? !_controlParams.lockDamping : true;
                    this.camera.controls.enableKeys = _controlParams ? !_controlParams.lockKeys : true;
                    this.camera.controls.enablePan = _controlParams ? !_controlParams.lockPan : true;
                    this.camera.controls.enableZoom = _controlParams ? !_controlParams.lockZoom : true;
                    this.camera.controls.enableRotate = _controlParams ? !(_controlParams.lockRotation || _controlParams.isometricRotation) : true;
                }
            this.actualCameraId = id;
            if ( this.selectedModel !== null )
                {
                    this.transformControl.detach();
                    this.transformControl.dispose();
                    this.transformControl.parent.remove( this.transformControl );
                    this.attachTransformControl( this.selectedModel, true );
                }
        }

    private initPrespectiveCamera( cameraParameters )
        {
            let _camera = new NanoGraphics.PerspectiveCamera(
                45,
                this.container.innerWidth / this.container.innerHeight,
                0.1,
                1000
            );
            _camera.lookAt( this.scene.position );

            if ( cameraParameters.fov )
                {
                    _camera.fov = cameraParameters.fov;
                }
            if ( cameraParameters.near )
                {
                    _camera.near = cameraParameters.near;
                }
            if ( cameraParameters.far )
                {
                    _camera.far = cameraParameters.far;
                }

            if ( cameraParameters.position )
                {
                    console.log( cameraParameters.position );
                    _camera.position.set( cameraParameters.position.x, cameraParameters.position.y, cameraParameters.position.z );
                }
            if ( cameraParameters.lookAt )
                {
                    _camera.lookAt( new NanoGraphics.Vector3( cameraParameters.lookAt.x, cameraParameters.lookAt.y, cameraParameters.lookAt.z ) );
                }
            if ( cameraParameters.name )
                {
                    _camera.name = cameraParameters.name;
                }

            _camera.updateProjectionMatrix();
            _camera.controlsParams = (cameraParameters.controlsParams !== undefined) ? cameraParameters.controlsParams : null;

            this.prespectiveCamera = _camera;//for debug only
            _camera.updateProjectionMatrix();
            return _camera;
        }

    private initOrtographicCamera( cameraParameters )
        {
            // get width and height
            let width = this.container.innerWidth;
            let height = this.container.innerHeight;

            // get values from parameters or assign defaults
            let _sidesFrustumDivisor = cameraParameters.sidesFrustumDivisor ? cameraParameters.sidesFrustumDivisor : 128;
            let _near = cameraParameters.near ? cameraParameters.near : .1;
            let _far = cameraParameters.far ? cameraParameters.far : 1000;
            let _position = cameraParameters.position ? cameraParameters.position : { x: 100, y: 100, z: 100 };
            let _name = cameraParameters.name ? cameraParameters.name : "unnamed orto camera";
            let _lookAt = cameraParameters.lookAt ? cameraParameters.lookAt : { x: 0, y: 0, z: 0 };
            let _controlsParameters = (cameraParameters.controlsParams !== undefined) ? cameraParameters.controlsParams : null;
            let _zoom = (cameraParameters.zoom !== undefined) ? cameraParameters.zoom : 1;

            //inits the camera
            let _ortographicCamera = new NanoGraphics.OrthographicCamera(
                -width / _sidesFrustumDivisor,
                width / _sidesFrustumDivisor,
                height / _sidesFrustumDivisor,
                -height / _sidesFrustumDivisor,
                _near,
                _far
            );

            // assign not inited values
            _ortographicCamera.position.set( _position.x, _position.y, _position.z );
            _ortographicCamera.name = _name;
            _ortographicCamera.zoom = _zoom;
            _ortographicCamera.controlsParams = _controlsParameters;
            _ortographicCamera.lookAt( new NanoGraphics.Vector3( _lookAt.x, _lookAt.y, _lookAt.z ) );
            _ortographicCamera.sidesFrustumDivisor = _sidesFrustumDivisor;

            _ortographicCamera.updateProjectionMatrix()

            return _ortographicCamera;
        }

    private initRendererScene( width: number, height: number )
        {
            // create the scene
            this.scene = new NanoGraphics.Scene();

            this.renderer = new NanoGraphics.WebGLRenderer();

            // set size
            this.renderer.setSize( width, height );

            this.renderer.setClearColor( 0x111111, 1 );

            this.renderer.shadowMapEnabled = true;

            // add canvas to dom
            document.body.appendChild( this.renderer.domElement );
        }

    private initAxisHelper()
        {
            let axis = new NanoGraphics.AxisHelper( 10 );

            this.scene.add( axis );
        }

    private initLights()
        {

            this.light = new NanoGraphics.DirectionalLight( 0xffffff, 1.0 );

            this.light.position.set( 10000, 10000, 10000 );

            this.scene.add( this.light );

            this.light2 = new NanoGraphics.DirectionalLight( 0xffffff, 1.0 );

            this.light2.position.set( -10000, 10000, -10000 );

            this.scene.add( this.light2 );
        }

    cameraIsometricRotateLeft()
        {
            this.camera.controls.isometricRotateLeft();
        }

    cameraIsometricRotateUp()
        {
            this.camera.controls.isometricRotateUp();
        }

    cameraTop()
        {
            this.camera.controls.top();
        }

    cameraBottom()
        {
            this.camera.controls.bottom();
        }

    cameraLeft()
        {
            this.camera.controls.left();
        }

    cameraRight()
        {
            this.camera.controls.right();
        }

    cameraFront()
        {
            this.camera.controls.front();
        }

    cameraBack()
        {
            this.camera.controls.back();
        }

    private initGui()
        {
            this.gui = new dat.GUI();
            this.cameraUI = this.gui.addFolder( 'Cameras' );
            console.log( this.uiParams.camera.current, this.uiParams.camera.ui.camerasIds );
            this.cameraUI.add( this.uiParams.camera, 'current', this.uiParams.camera.ui.camerasIds ).listen().onChange( () => {this.updateCameras()} );
            this.cameraUI.add( this, 'cameraIsometricRotateLeft' );
            this.cameraUI.add( this, 'cameraIsometricRotateUp' );
            this.cameraUI.add( this, 'cameraTop' );
            this.cameraUI.add( this, 'cameraBottom' );
            this.cameraUI.add( this, 'cameraLeft' );
            this.cameraUI.add( this, 'cameraRight' );
            this.cameraUI.add( this, 'cameraFront' );
            this.cameraUI.add( this, 'cameraBack' );
            this.cameraUI.open();
        }

    onWindowResize()
        {

            this.renderer.setSize( this.container.innerWidth, this.container.innerHeight );

            this.camera.windowResize( this.container.innerWidth, this.container.innerHeight );

        }

    animate()
        {
            this.camera.controls.update();
            requestAnimationFrame( () =>
            {
                this.animate()
            } );
            this.render();
        }

    render()
        {
            this.stats.begin();
            let timer = 0.002 * Date.now();
            this.box.position.y = 0.5 + 0.5 * Math.sin( timer );
            this.box.rotation.x += 0.1;
            this.stats.end();
            this.renderer.render( this.scene, this.camera );
        }

    private initStats()
        {
            this.stats = new Stats();
            // this.stats.setMode(1); // 0: fps, 1: ms, 2: mb, 3+: custom_typings
            document.body.appendChild( this.stats.domElement );
            this.stats.domElement.style.position = 'absolute';
            this.stats.domElement.style.left = '0px';
            this.stats.domElement.style.top = '0px';

        }

    clickSelect( event )
        {
            event.preventDefault();
            let mouse3D = new NanoGraphics.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,
                -( event.clientY / window.innerHeight ) * 2 + 1,
                0.5 );
            let raycaster = new NanoGraphics.Raycaster();
            raycaster.setFromCamera( mouse3D, this.camera );
            let intersects = raycaster.intersectObjects( this.testMeshes );
            console.log( "intersected", intersects );
            this.selectedModel = null;
            if ( intersects.length > 0 )
                {
                    this.selectedModel = <NanoGraphics.Mesh>(intersects[ 0 ].object);
                    this.selectedModel.material.color.setHex( Math.random() * 0xffffff );
                    this.attachTransformControl( this.selectedModel );
                    // intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
                }
        }

    constructor( domContainer )
        {
            this.selectedModel = null;
            this.initedTransformControl = false;
            this.initThreeJS( domContainer );
            this.initStats();

            this.animate();

            this.renderer.domElement.addEventListener( 'dblclick', ( event ) => {this.clickSelect( event ); } );
        }
}
const _test = new TestThreeJs( window );

// hack to put object on global context - to debug
(<any>window)._test = _test;
(<any>window).dat = dat;
(<any>window).NanoGraphics = NanoGraphics;

//exported scene to allow threejs browser inspector addon
(<any>window).scene = _test.scene;

window.onresize = ( event ) =>
    {
        _test.onWindowResize();
    }