export default class KeyValue {
    key = ''
    value = ''

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }

    toString() {
        return `${this.key} = ${this.value}`;
    }
}
