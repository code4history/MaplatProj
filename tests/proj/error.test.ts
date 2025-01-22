import { describe, it, expect } from 'vitest';
import maplatProj4 from '@/.';

describe('Throwing Error Test', {}, function() {
  it('defs test', function() {
    maplatProj4.defs([["OriginalCode", '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees']]);

    const wmts = maplatProj4('OriginalCode');
    const t = maplatProj4('EPSG:4326');
    //console.log(t);
    //console.log(wmts);
    const s = { forward: wmts.forward, inverse: wmts.inverse};
    //console.log(s.forward([135, 35]));
    //console.log(s.inverse([135, 35]));
    //console.log(maplatProj4('EPSG:4326', 'OriginalCode', [135, 35]));
    expect(1).toBe(1);
  });
});