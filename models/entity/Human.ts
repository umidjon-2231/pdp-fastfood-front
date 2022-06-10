import {HumanStatus, HumanType, Language, Region} from "../../enums";
import {Attachment} from "./Attachment";
import {parseTime} from "../../tools";

export class Human {
    private _name: string
    private _status: HumanStatus
    private _number: string
    private _birthday: string
    private _region: Region
    private _lang: Language
    private _type: HumanType
    private _photo: Attachment

    get name(): string {
        return this._name;
    }

    get status(): HumanStatus {
        return this._status;
    }

    get number(): string {
        return this._number;
    }

    get birthday(): Date {
        return parseTime(this._birthday);
    }

    get region(): Region {
        return this._region;
    }

    get lang(): Language {
        return this._lang;
    }

    get type(): HumanType {
        return this._type;
    }

    get photo(): Attachment {
        return this._photo;
    }
}