import originalProj4 from 'proj4';

type Proj4Args = 
  | [string, string?]
  | [string, proj4.TemplateCoordinates]
  | [string, string, proj4.TemplateCoordinates];

function maplatProj4(...args: Proj4Args) {
  const fromProjection:string = args[0];
  if (args.length === 1 || typeof(args[1]) === 'string') {
    const toProjection:(string | undefined) = args[1] ? args[1] as string : undefined;
    if (args.length === 3) {
      return originalProj4(fromProjection, toProjection!, args[2] as unknown as proj4.TemplateCoordinates);
    } else {
      return originalProj4(fromProjection, toProjection);
    }
  } else {
    return originalProj4(fromProjection, args[1] as proj4.TemplateCoordinates);
  }
}

maplatProj4.defs = originalProj4.defs;
maplatProj4.Proj = originalProj4.Proj;
maplatProj4.transform = originalProj4.transform;

export default maplatProj4;
