import { BasketItem } from "./basket-item";
import * as cuid from "cuid";
export interface Basket {
    id: string;
    items: BasketItem[];
}

export interface BasketTotal{
    shipping: number,
    subtotal: number,
    total: number
}

export class Basket implements Basket {
    id = cuid();
    items: BasketItem[] = [];
}