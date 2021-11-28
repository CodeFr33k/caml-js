import Manifest from './Manifest';

it('converts manifest to files', () => {
    const text = `
        http://localhost/abc.js
    `;
    const manifest = new Manifest(text);
    const files = manifest.toFiles();
    expect(files).toContain('http://localhost/abc.js');
});
