export class ApiResponse<T> {
    private _message: string
    private _success: boolean
    private _data: T

    get message(): string {
        return this._message;
    }

    get success(): boolean {
        return this._success;
    }

    get data(): T {
        return this._data;
    }
}