import {Human} from "./Human";

export class Delivery {
    private _price: number
    private _longitude: number
    private _latitude: number
    private _address: string
    private _courier: Human

    get price(): number {
        return this._price;
    }

    get longitude(): number {
        return this._longitude;
    }

    get latitude(): number {
        return this._latitude;
    }

    get address(): string {
        return this._address;
    }

    get courier(): Human {
        return this._courier;
    }
}