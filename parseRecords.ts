import Record from './Record';
import Part from './Part';
import * as util from './util';

export function parseAnnotation(record: Record, line: string) {
    const match = util.matchKeyValue(line);
    if(match) {
        if(match.key === '@id') {
            record.id = match.value;
        }
        if(match.key === 'img') {
            const uris = util.matchUris(match.value);
            if(uris.length > 0) {
                // NOTE: only supports one image uri currently
                // per key-value
                record.images.push(uris[0]);
            }
        }
        if(match.key === 'video') {
            const uris = util.matchUris(match.value);
            if(uris.length > 0) {
                // NOTE: only supports one video uri currently
                // per key-value
                record.videos.push(uris[0]);
            }
        }
        return {
            key: match.key,
            value: match.value,
        };
    }
    const tag = util.matchTag(line);
    if(tag) {
        return tag
    }
    return '';
}

export function parsePart(record: Record, lines: string[], start: number): Part {
    let isReadingData = false;
    const part = new Part;
    for(let i = start; i < lines.length; i++) {
        const line = lines[i];
        if(!line && !isReadingData) {
            break;
        }
        part.lines.push(line);
        if(!line && isReadingData) {
            continue;
        }
        const match = line.match(/\(`(.+)\)/);
        if(match) {
            const annotation = parseAnnotation(record, match[1]);
            part.annotations.push(annotation);
            break;
        }
        else if(line.startsWith('(`')) {
            isReadingData = true;
            continue;
        }
        else if(line.startsWith(')')) {
            isReadingData = false;
            continue; 
        }
        if(isReadingData) {
            const annotation = parseAnnotation(record, line);
            if(annotation) {
                part.annotations.push(annotation);
            }
        }
    }
    return part;
}

export default function  parseRecords(lines: string[]) {
    const records: Record[] = [];
    let record = null;
    for(let i = 0; i < lines.length;) {
        const line = lines[i];
        if(!record && line) {
            record = new Record;
            records.push(record);
        }
        if(!record && !line) {
            i += 1;
            continue;
        }
        if(!line) {
            if(!record!.id) {
                const lines = record!.lines;
                const sample = lines[0] + lines[1];
                record!.id = '' + sample.hashCode();
            }
            record = null;
            continue;
        }
        const part = parsePart(record!, lines, i);
        record!.parts.push(part);
        i += part.lines.length;
    }
    return records.reverse();
}

