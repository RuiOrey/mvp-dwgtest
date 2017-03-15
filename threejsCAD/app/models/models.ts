export class Scene extends THREE.Scene
{
}

export class WebGLRenderer extends THREE.WebGLRenderer
{
}

export class DirectionalLight extends THREE.DirectionalLight
{
}

export class Mesh extends THREE.Mesh
{
    material: Material;
    bboxMesh?: BoxHelper;
}
export class MeshNormalMaterial extends THREE.MeshNormalMaterial
{
}

export class MeshLambertMaterial extends THREE.MeshLambertMaterial
{
}
export class MeshPhongMaterial extends THREE.MeshPhongMaterial
{
}

export class Color extends THREE.Color
{
}
export class Material extends THREE.Material
{
    color: Color;
}

export class Vector3 extends THREE.Vector3
{
}
export class Box3 extends THREE.Box3
{
}
export class BoxHelper extends THREE.BoxHelper
{
}

export class Object3D extends THREE.Object3D
{

    transformControl?: TransformControls;
    children: Object3D[];
    bboxMesh?: BoxHelper;
    bboxMesh2?: Box3;

}

export class STLGroup extends Object3D
{

    box?: Box3;

    public addSTL( file: string, meshesArray?: Array<Mesh> )
        {
            let _stlLoader = new STLLoader();
            _stlLoader.load( file, ( geometry ) =>
                {
                    // var material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );
                    //let material = new MeshNormalMaterial();
                    let material: Material;
                    //let meshMaterial = material;
                    if ( geometry.hasColors )
                        {
                            material = new MeshPhongMaterial( {
                                opacity: geometry.alpha,
                                vertexColors: THREE.VertexColors
                            } );
                        }
                    else
                        {
                            material = new MeshLambertMaterial( { side: THREE.DoubleSide } );
                        }

                    let _tempMesh = new Mesh( geometry, material );
                    _tempMesh.castShadow = true;
                    _tempMesh.receiveShadow = true;
                    let bbox = new BoxHelper( _tempMesh );
                    // bbox.update();
                    _tempMesh.add( bbox );
                    //this.testStl.add( new THREE.BoxHelper( this.testStl ) );
                    // this.testStl.geometry.center();
                    _tempMesh.bboxMesh = bbox;
                    let _scale = 0.1;
                    _tempMesh.scale.set( _scale, _scale, _scale );

                    var pivot = new THREE.Object3D();
                    pivot.add( _tempMesh );

                    var destinationChild = _tempMesh;

                    this.add( pivot );

                    meshesArray.push( <Mesh>destinationChild );

                    //this.add( _tempMesh );

                    this.centerMeshes();

                }
            )

        }

    public centerMeshes()
        {

            let children: any[];
            children = this.children;
            let completeBoundingBox = new Box3(); // create a new box which will contain the entire values

            for ( let i = 0, j = children.length; i < j; i++ )
                { // iterate through the children

                    let box = new Box3();
                    box.setFromObject( children[ i ] );

                    box.translate( children[ i ].position ); // translate the geometries bounding box by the meshes position

                    children[ i ].bboxMesh2 = box;
                    let _boxCenter = box.getCenter();
                    completeBoundingBox.expandByPoint( box.max ).expandByPoint( box.min ); // add the max and min values to your completeBoundingBox

                }

            this.box = completeBoundingBox;
            let objectCenter = completeBoundingBox.getCenter();

            console.log( 'This is the center of your Object3D:', objectCenter );

            // You want the center of you bounding box to be at 0|0|0

            for ( let child of children )
                {

                    child.children[ 0 ].geometry.center();
                    child.children[ 0 ].position.x += objectCenter.x;
                    child.children[ 0 ].position.y += objectCenter.y;
                    child.children[ 0 ].position.z += objectCenter.z;

                    //  child.geometry.translate( -objectCenter.x, -objectCenter.y, -objectCenter.z );
                }

            this.position.x -= objectCenter.x;
            this.position.y -= objectCenter.y;
            this.position.z -= objectCenter.z;

        }

    public scaleCenteredGroup( x: number, y: number, z: number )
        {
            let children: Object3D[];
            let scaleVector: Vector3;

            scaleVector = new Vector3( x, y, z )
            children = this.children;

            for ( let i = 0, j = children.length; i < j; i++ )
                { // iterate through the children
                    children[ i ].scale.set( x, y, z );
                }
            this.centerMeshes();
        }
}

export class UIManager extends dat.GUI
{
    /*
     this.uiParams = {
     camera: {
     current: 0,
     available: [
     {
     type: "orthographic"
     },
     {
     type: "perspective"
     },
     {
     type: "isometric"
     }
     ]
     }
     }*/
}

export class GridHelper extends THREE.GridHelper
{
}

export class AxisHelper extends THREE.AxisHelper
{
}

export class OrbitControls extends THREE.OrbitControls
{
    // Mouse buttons swapping in relation to original mappings
    mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.RIGHT, PAN: THREE.MOUSE.MIDDLE };
    params: any;
    // distance when aligning in a axis
    axisDistance: number = 100;

    isometricRotate( axis1: string, axis2: string, antiClockwise?: boolean )
        {
            console.log( "params", this.params );

            if ( !this.params || !this.params.isometricRotation && !this.params.lockRotate )
                {
                    return;
                }

            let _axis1Positive = this.object.position[ axis1 ] > 0;
            let _axis2Positive = this.object.position[ axis2 ] > 0;

            let _sameSignal = _axis1Positive == _axis2Positive;

            if ( antiClockwise )
                {
                    let _temp = axis1;
                    axis1 = axis2;
                    axis2 = _temp;
                }

            if ( _sameSignal )
                {
                    this.object.position[ axis1 ] = -this.object.position[ axis1 ];
                }
            else
                {
                    this.object.position[ axis2 ] = -this.object.position[ axis2 ];
                }
        }

    isometricRotateLeft(): void
        {
            this.isometricRotate( "x", "z" );
        }

    isometricRotateUp(): void
        {
            this.isometricRotate( "z", "y" );
        }

    top(): void
        {
            this.alignInAxis( "y" );
        }

    bottom(): void
        {
            this.alignInAxis( "y", true );
        }

    front(): void
        {
            this.alignInAxis( "z" );
        }

    back(): void
        {
            this.alignInAxis( "z", true );
        }

    right(): void
        {
            this.alignInAxis( "x" );
        }

    left(): void
        {
            this.alignInAxis( "x", true );
        }

    alignInAxis( axis: string, isNegative?: boolean )
        {
            console.log( "align", axis );

            if ( this.params && (this.params.isometricRotation || this.params.lockRotate) )
                {
                    return;
                }

            this.object.position.set( 0, 0, 0 );
            this.object.position[ axis ] = this.axisDistance;
            if ( isNegative )
                {
                    this.object.position[ axis ] = -this.object.position[ axis ];
                }
        }

}

export class TransformControls extends THREE.TransformControls
{
    // Mouse buttons swapping in relation to original mappings
    markedForUpdate: boolean;
    domEl: Window;

    constructor( camera, domElement )
        {
            super( camera, domElement );
            this.domEl = domElement;
        }

}

export class MeshBasicMaterial extends THREE.MeshBasicMaterial
{
}

export class BoxGeometry extends THREE.BoxGeometry
{
}

export class Camera extends THREE.Camera
{
    public controls?: OrbitControls;

    // orthograpic operations
    public left?: number;
    public right?: number;
    public top?: number;
    public bottom?: number;
    public near?: number;
    public far?: number;
    public controlsParams?: any;

    // perspective operations
    public aspect?: number;

    public updateProjectionMatrix?(): void;

    public windowResize?( containerWidth, containerHeight ): void;
}

export class PerspectiveCamera extends THREE.PerspectiveCamera
{
    public controls?: OrbitControls;
    public controlsParams?: any;

    public windowResize( containerWidth, containerHeight )
        {
            this.aspect = containerWidth / containerHeight;
            this.updateProjectionMatrix();
        }

}

export class OrthographicCamera extends THREE.OrthographicCamera
{
    public controls?: OrbitControls;
    public controlsParams?: any;
    public sidesFrustumDivisor?: number;

    public windowResize( containerWidth, containerHeight )
        {
            // update the camera
            this.left = -containerHeight / this.sidesFrustumDivisor;
            this.right = containerHeight / this.sidesFrustumDivisor;
            this.top = containerHeight / this.sidesFrustumDivisor;
            this.bottom = -containerHeight / this.sidesFrustumDivisor;
            this.updateProjectionMatrix();
        }

    public isometricRotation()
        {

        }
}

export class STLLoader extends THREE.STLLoader
{

}

export class OBJLoader extends THREE.OBJLoader
{

}
export class Raycaster extends THREE.Raycaster
{

}



