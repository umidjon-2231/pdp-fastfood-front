import {parseTime} from "../../tools";

export class Filial{
    private _address: string;
    private _end: string;
    private _intended: string;
    private _nameRu: string;
    private _nameUz: string;
    private _start: string;

    get start(): Date {
        return parseTime(this._start);
    }

    get address(): string {
        return this._address;
    }

    get end(): Date {
        return parseTime(this._end);
    }

    get intended(): string {
        return this._intended;
    }

    get nameRu(): string {
        return this._nameRu;
    }

    get nameUz(): string {
        return this._nameUz;
    }
}