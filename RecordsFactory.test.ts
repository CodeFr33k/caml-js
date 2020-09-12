import RecordsFactory from './RecordsFactory';
import 'caml-js/shims';

it('create records by loading lines', () => {
    const records = RecordsFactory.create();
    const lines = [
        'abc',
        '',
    ];
    records.load(lines);
    expect(records).toHaveLength(1);
});
