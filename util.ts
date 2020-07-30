export async function readTextFromFile(file: any): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const text: any = e.target.result;
            resolve(text);
        };
        reader.readAsText(file);
    });
}

export function parseExt(uri: string) {
    return uri.split('.').pop();
}

export function evalFn(text: string) {
    const fn = new Function('"use strict";return (' + text + ')')(); 
    return fn;
}

// link = https://stackoverflow.com/a/22864603
const re = /(file|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/ig;

export function matchUris(text: string) {
    const uris = text.match(re);
    return uris || [];
}

export function matchKeyValue(text: string) {
    const match = text.match(/\s*(.+) = (.+)/);
    if(!match) {
        return null;
    }
    return {
        key: match[1],
        value: match[2],
    };
}

export function matchTag(text: string) {
    const match = text.match(/\s*(.+)/);
    if(!match) {
        return null;
    }
    return match[1];
}

