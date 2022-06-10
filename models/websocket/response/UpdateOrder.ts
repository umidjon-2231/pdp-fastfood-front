import {ORDER_STATUS} from "../../../enums";

export interface Response {
    type: 'CREATE' | 'UPDATE',
    status: ORDER_STATUS,
    oldStatus?: ORDER_STATUS
}