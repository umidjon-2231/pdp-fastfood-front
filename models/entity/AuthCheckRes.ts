
export class AuthCheckRes {
    private _user_id: number
    private _user_number: string
    private _user_name: string
    private _user_info: string
    private _exp:  number

    get id(): number {
        return this._user_id;
    }

    get number(): string {
        return this._user_number;
    }

    get name(): string {
        return this._user_name;
    }

    get info(): string {
        return this._user_info;
    }

    get token_expire(): number {
        return this._exp;
    }
}