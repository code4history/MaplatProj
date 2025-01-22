import proj4 from 'proj4';

declare function maplatProj4(fromProjection: string, toProjection?: string): proj4.Converter;
declare function maplatProj4<T extends proj4.TemplateCoordinates>(
    toProjection: string,
    coordinates: T
): T;
declare function maplatProj4<T extends proj4.TemplateCoordinates>(
    fromProjection: string,
    toProjection: string,
    coordinates: T
): T;

declare namespace maplatProj4 {
  export var defs: typeof proj4.defs;
  export var Proj: typeof proj4.Proj;
  export var transform: typeof proj4.transform;
}

export default maplatProj4;