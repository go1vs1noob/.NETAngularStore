import { Address } from "src/app/account/interfaces/address";
import { OrderItem } from "./order-item";

export interface Order {
    id: number;
    buyerEmail: string;
    shipToAddress: Address;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: OrderItem[];
    subtotal: number;
    total: number;
    status: string;
}