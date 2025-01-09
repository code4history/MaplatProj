import { describe, it, expect } from 'vitest';
//import maplatProj4 from '../../src';
import maplatProj4 from 'proj4';
import { testPoints } from './data';

maplatProj4.defs([
  ["EPSG:102018", "+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs"],
  ["testmerc", "+proj=merc +lon_0=5.937 +lat_ts=45.027 +ellps=sphere"],
  ["testmerc2", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +units=m +k=1.0 +nadgrids=@null +no_defs"]
]);
maplatProj4.defs('esriOnline', 'PROJCS["WGS_1984_Web_Mercator_Auxiliary_Sphere",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Mercator_Auxiliary_Sphere"],PARAMETER["False_Easting",0.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",0.0],PARAMETER["Standard_Parallel_1",0.0],PARAMETER["Auxiliary_Sphere_Type",0.0],UNIT["Meter",1.0]]');

describe('Original proj4 test', {}, function() {
  describe('core', {}, function() {
    testPoints.forEach(function(testPoint) {
      describe(testPoint.code, function() {
        let xyAcc = 2,
          llAcc = 6;
        if ('acc' in testPoint) {
          if ('xy' in testPoint.acc!) {
            xyAcc = testPoint.acc.xy!;
          }
          if ('ll' in testPoint.acc!) {
            llAcc = testPoint.acc.ll!;
          }
        }
        const xyEPSLN = Math.pow(10, - 1 * xyAcc);
        const llEPSLN = Math.pow(10, - 1 * llAcc);
        describe('traditional', {}, function() {
          it(`should work with forwards ${xyAcc} ${xyEPSLN}`, function() {
            const proj = new (maplatProj4.Proj as any)(testPoint.code);
            const xy = maplatProj4.transform(maplatProj4.WGS84, proj, maplatProj4.toPoint(testPoint.ll));
            expect(xy.x).toBeCloseTo(testPoint.xy[0], xyEPSLN);
            expect(xy.y).toBeCloseTo(testPoint.xy[1], xyEPSLN);
          });
          it(`should work with backwards ${llAcc} ${llEPSLN}`, function() {
            const proj = new (maplatProj4.Proj as any)(testPoint.code);
            const ll = maplatProj4.transform(proj, maplatProj4.WGS84, maplatProj4.toPoint(testPoint.xy));
            expect(ll.x).toBeCloseTo(testPoint.ll[0], llEPSLN);
            expect(ll.y).toBeCloseTo(testPoint.ll[1], llEPSLN);
          });
        });
      });
    });
  });
});