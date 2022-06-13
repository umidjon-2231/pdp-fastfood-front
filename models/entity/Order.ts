import {ORDER_STATUS, PayType} from "../../enums";
import {Human} from "./Human";
import {Filial} from "./Filial";
import {Delivery} from "./Delivery";
import {Product} from "./Product";

export class OrderProduct {
    private _product: Product;
    private _count: number;
    private _price: number;
    private _amount: number

    get product(): Product {
        return this._product;
    }

    get count(): number {
        return this._count;
    }

    get price(): number {
        return this._price;
    }

    get amount(): number {
        return this._amount;
    }
}

export class Order {
    private _id: number;
    private _time: string;
    private _orderStatus: ORDER_STATUS;
    private _client: Human;
    private _amount: number;
    private _filial: Filial;
    private _delivery: Delivery;
    private _payType: PayType;
    private _operator: Human | null
    private _products: OrderProduct[]

    get id(): number {
        return this._id;
    }

    get time(): string {
        return this._time;
    }

    get orderStatus(): ORDER_STATUS {
        return this._orderStatus;
    }

    get client(): Human {
        return this._client;
    }

    get amount(): number {
        return this._amount;
    }

    get filial(): Filial {
        return this._filial;
    }

    get delivery(): Delivery {
        return this._delivery;
    }

    get payType(): PayType {
        return this._payType;
    }

    get operator(): Human | null {
        return this._operator;
    }

    get products(): OrderProduct[] {
        return this._products;
    }
}
