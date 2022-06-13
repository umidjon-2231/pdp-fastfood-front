export class GroupedData<T, R> {
    private _title: string
    private _groupedBY: T
    private _content: R[]

    get title(): string {
        return this._title;
    }

    get groupedBY(): T {
        return this._groupedBY;
    }

    get content(): R[] {
        return this._content;
    }
}