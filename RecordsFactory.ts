import parseRecords from './parseRecords';
import {
    observe,
    observable,
} from 'mobx';

function create() {
    const records = observable([]);
    const customFunctions: any = {
       load(lines: any) {
           const newRecords = parseRecords(lines);
           records.replace(records.concat(newRecords as any));    
        },
    };
    return new Proxy(records, {
        set (target: any, property: any, value: any) {
            target[property] = value;
            return true;
        },
        has (target, property) {
            return property in customFunctions || property in target;
        },
        get (target, property) {
            if (typeof property === 'string' && property in customFunctions) {
                return customFunctions[property].bind(target);
            }
            else {
                return target[property];
            }
        }, 
    });
}

export default {
    create,
};

