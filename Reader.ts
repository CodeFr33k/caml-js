import { observable, action } from 'mobx';

class Reader {
    @observable lines: any = [];
    readlines: Array<string> = [];
    readline = '';

    @action.bound read(char: string) {
        if(char === '\n') {
            this.readlines.push(this.readline);
            this.readline = '';
            return;
        }
        this.readline += char;
    }

    @action.bound end() {
        this.lines.replace(this.readlines); 
        this.readlines = [];
    }
}

export default Reader;
