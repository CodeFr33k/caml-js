import * as Uri from './Uri';

export default class Manifest {
    text: string = '';

    constructor(text: string) {
        this.text = text;
    }
    static async fetch(uri: string) {
        const text = await Uri.fetchText(uri);
        return new Manifest(text);
    }

    toFiles() {
        return this.text.trim().split('\n');
    }
}

