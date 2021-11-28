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

it('compute lines from records', () => {
    const store = new Store();
    const record = new Record();
    record.lines.push('abc');
    record.lines.push('');
    store.records.push(record);
    expect(store.lines).toContain('abc');
});

it('keep lines from records that pass reduction', () => {
    const store = new Store();
    const record = new Record();
    record.lines.push('abc');
    record.lines.push('');
    store.records.push(record);
    store.addReducer(function(records: any) {
        return records;
    });
    expect(store.lines).toHaveLength(2);
});

it('remove lines from records that fail reduction', () => {
    const store = new Store();
    const record = new Record();
    record.lines.push('abc');
    record.lines.push('');
    store.records.push(record);
    store.addReducer(function(records: any) {
        return [];
    });
    expect(store.lines).toHaveLength(0);
});

it('display user data when modified by reducer', () => {
    const store = new Store();
    const record = new Record();
    record.lines.push('abc');
    record.lines.push('');
    store.records.push(record);
    store.addReducer(function(records: any) {
        records[0].userData.push('123');
        return records;
    });
    expect(store.lines).toHaveLength(5);
});

it('loads images', () => {
    const store = new Store();
    const record = new Record();
    record.images.push('http://localhost/abc.png');
    store.records.push(record);
    expect(store.images).toHaveLength(1);
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

