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
      const func = maplatProj4(fromProjection, toProjection!) as proj4.Converter;
      return func.forward(args[2] as unknown as proj4.TemplateCoordinates);
    } else {
      const from = originalProj4(fromProjection);
      if (toProjection) {
        const to = originalProj4(toProjection);
        if (from && to) {
          return {
            forward: function(coordinates: proj4.TemplateCoordinates) {
              return to.forward(from.inverse(coordinates));
            },
            inverse: function(coordinates: proj4.TemplateCoordinates) {
              return from.forward(to.inverse(coordinates));
            }
          };
        } else {
          throw new Error(`Projection definition error: ${fromProjection} ${toProjection}`);
        }
      } else return from;
    }
  } else {
    const func = originalProj4(fromProjection);
    return func.forward(args[1] as proj4.TemplateCoordinates);
  }
}

maplatProj4.defs = originalProj4.defs;
maplatProj4.Proj = originalProj4.Proj;
maplatProj4.transform = function(source: originalProj4.InterfaceProjection, dest: originalProj4.InterfaceProjection, point: proj4.InterfaceCoordinates) {
  console.log(source);
  console.log(`transform: ${JSON.stringify(point)}`);
  return originalProj4.toPoint(dest.forward(source.inverse([point.x, point.y])));  
  //return originalProj4.transform(source, dest, point);
};
maplatProj4.toPoint = originalProj4.toPoint;
maplatProj4.WGS84 = originalProj4.WGS84;

export default maplatProj4;
