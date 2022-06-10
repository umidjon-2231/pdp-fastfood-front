export class Attachment {
    private _url: string
    private _name: string
    private _size: BigInteger
    private _type: string

    get url(): string {
        return this._url;
    }

    get name(): string {
        return this._name;
    }

    get size(): BigInteger {
        return this._size;
    }

    get type(): string {
        return this._type;
    }
}