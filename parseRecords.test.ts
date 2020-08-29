import { observable } from 'mobx';
import parseRecords, {
    parsePart,  
    parseAnnotation,
} from './parseRecords';

it('parse part', () => {
    const lines: string[] = [
        'abc',
        '',
    ];
    const part = parsePart(lines, 0);
    expect(part.lines).toHaveLength(1);
});

it('parse one part then exit', () => {
    const lines: string[] = [
        'abc',
        '',
        'abc',
    ];
    const part = parsePart(lines, 0);
    expect(part.lines).toHaveLength(1);
});

it('parse key value annotation', () => {
    const annotation = parseAnnotation('abc = 123');
    expect(annotation).toEqual({
        key: 'abc',
        value: '123',        
    });
});

it('parse record', () => {
    const lines: string[] = [
        'abc',
        '',
    ];
    const records = parseRecords(lines);
    expect(records).toHaveLength(1);
})

it.skip('parse img', () => {
     const lines: string[] = [
        'abc',
        '(`',
        'img = http://localhost/image.png',
        ')',
    ];
    const records = parseRecords(lines);
    expect(records[0].images).toHaveLength(1);
});

it('parse key value on one line', () => {
     const lines: string[] = [
        '(`abc = 123)',
    ];
    const part = parsePart(lines, 0);
    expect(part.annotations).toContainEqual({
        key: 'abc',
        value: '123',        
    });
});

it('parse 2 records from 2 one liners', () => {
     const lines: string[] = [
        'abc (`abc = 123)',
        '',
        'def (`abc = 123)',
    ];
    const records = parseRecords(lines);
    expect(records).toHaveLength(2);
});

