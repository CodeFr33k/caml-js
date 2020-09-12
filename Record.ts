import Part from './Part';

class Record {
    id: string = ''
    parts: Part[] = []
    images: string[] = []
    userData: any[] = []
    clickCount: number = 0;

    get lines() {
        const result = [];
        for(const part of this.parts) {
            for(const line of part.lines) {
                result.push(line);
            }
        }
        result.push('');
        return result;
    }

    click() {
        this.clickCount += 1;
    }
}

export default Record;
