import {Attachment} from "./Attachment";
import {Category} from "./Category";

export class Product {
    private _photo: Attachment
    private _nameUz: string
    private _nameRu: string
    private _price: number
    private _description: string
    private _category: Category

    get photo(): Attachment {
        return this._photo;
    }

    get nameUz(): string {
        return this._nameUz;
    }

    get nameRu(): string {
        return this._nameRu;
    }

    get price(): number {
        return this._price;
    }

    get description(): string {
        return this._description;
    }

    get category(): Category {
        return this._category;
    }
}
