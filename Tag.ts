export default class Tag {
    name = ''

    constructor(name: string) {
        this.name = name;
    }

    toString() {
        return this.name;
    }
}
