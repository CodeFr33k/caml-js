import Part from './Part';

class Record {
    parts: Part[] = []
    images: string[] = []
    userData: string[] = []

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
}

export default Record;
