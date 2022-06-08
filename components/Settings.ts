export interface SettingProps {
    getOrderByToday?: Boolean
}


export class Settings{
    private _props?: SettingProps;

    constructor(props: SettingProps) {
        this._props=props
    }


    get props(): SettingProps {
        return this._props;
    }

    set props(value: SettingProps) {
        this._props = value;
    }
}