import Record from './Record';
import * as util from './util';

export default function  parseRecords(lines: string[]) {
    const result = lines.reduce((result: any, line: string) => {
       if(!result.record && line){
            result.record = new Record();
            result.records.push(result.record);
        }
        if(result.record) {
            result.record.lines.push(line);
        }
        const match = line.match(/\(`(.+)\)/);
        let tmp = line;
        if(match) {
            result.isReadingData = true;
            tmp = match[1];
        }
        else if(line.startsWith('(`')) {
            result.isReadingData = true;
            return result;
        }
        else if(line.startsWith(')')) {
            result.isReadingData = false;
            return result;
        }
        if(result.isReadingData) {
            const match = util.matchKeyValue(tmp);
            const tag = util.matchTag(tmp);
            if(match) {
                result.record.annotations.push({
                    key: match.key,
                    value: match.value,
                });
                if(match.key === 'img') {
                    const uris = util.matchUris(match.value);
                    if(uris.length > 0) {
                        // NOTE: only supports one image uri currently
                        // per key-value
                        result.record.images.push(uris[0]);
                    }
                }
            } else if(tag) {
                result.record.annotations.push(tag);
            }
        }
        if(match || !line && !result.isReadingData) {
            result.record = undefined;
            result.isReadingDate = false;
        }
        return result;
    }, {
        records: [],
        record: undefined,
        isReadingData: false,
    });
    return result.records.reverse();
}

