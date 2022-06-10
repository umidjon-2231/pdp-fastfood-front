export class Category {
    private _name: string
    private _parent: Category

    get name(): string {
        return this._name;
    }

    get parent(): Category {
        return this._parent;
    }
}