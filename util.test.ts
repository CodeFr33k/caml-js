import * as util from './util';

it('eval javascript', () => {
    const fn = util.evalFn(`
       function(x) {
           return x === 1;
       }
   `);
    expect(fn(1)).toBeTruthy();

});

it('match URIs', () => {
    const uris = util.matchUris('hello file:///localhost/hello hello');
    expect(uris[0]).toBe('file:///localhost/hello');
});

it('match key-value', () => {
    const keyValue = util.matchKeyValue('   key foo = value bar');
    expect(keyValue).toMatchObject({
        key: 'key foo',
        value: 'value bar',        
    });
});

it('match tag', () => {
    const tag = util.matchTag('   tag name');
    expect(tag).toBe('tag name');
});

