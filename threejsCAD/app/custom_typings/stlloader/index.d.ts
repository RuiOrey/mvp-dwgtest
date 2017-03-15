/**
 * Description: A THREE loader for STL ASCII files, as created by Solidworks and other CAD programs.
 *
 * Supports both binary and ASCII encoded files, with automatic detection of type.
 *
 * The loader returns a non-indexed buffer geometry.
 *
 * Limitations:
 * Binary decoding supports "Magics" color format (http://en.wikipedia.org/wiki/STL_(file_format)#Color_in_binary_STL)
 */

declare namespace THREE
{
    export class STLLoader
    {
        constructor( manager?: THREE.LoadingManager );

        load( url: string,
              onLoad: ( model: any ) => void,
              onProgress?: ( request: ProgressEvent ) => void,
              onError?: ( event: ErrorEvent ) => void ): void;

        parse( data: string ): boolean;
    }
}