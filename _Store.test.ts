import { observe } from 'mobx';
import Record from './Record';
import Store from './_Store';
import * as Uri from './Uri';
jest.mock('./Uri');

it('load records when reader changes', (done) => {
    const store = new Store();
    store.records = {
        load: jest.fn(),
    }; 
    store.reader.read('abc');
    store.reader.read('\n');
    const disposer = observe(store.reader.lines, (delta: any) => {
        expect(store.records.load).toHaveBeenCalled();
        disposer();
        done();
    });
    store.reader.end();
});

it('load javascript file', async () => {
    (Uri.fetchText as jest.Mock).mockReturnValueOnce(Promise.resolve('() => {}'));
    const store = new Store();
    const file = 'http://localhost/noop.js';
    await store.loadFile(file);
    expect(store.reducers).toHaveLength(1);
});

it('load caml file', async () => {
    (Uri.fetchText as jest.Mock).mockReturnValueOnce(Promise.resolve('abc\n'));
    const store = new Store();
    const file = 'http://localhost/abc.caml';
    await store.loadFile(file);
    expect(store.records).toHaveLength(1);
});

it('load html file', async () => {
    (Uri.fetchText as jest.Mock).mockReturnValueOnce(Promise.resolve('<div></div>'));
    const store = new Store();
    const file = 'http://localhost/abc.html';
    await store.loadFile(file);
    expect(store.htmls).toHaveLength(1);
});

