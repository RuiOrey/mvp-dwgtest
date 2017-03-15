declare namespace THREE
{
    export class OBJLoader
    {
        constructor( manager?: THREE.LoadingManager );

        load( url: string,
              onLoad: ( model: any ) => void,
              onProgress?: ( request: ProgressEvent ) => void,
              onError?: ( event: ErrorEvent ) => void ): void;

        parse( data: string ): boolean;
    }
}
