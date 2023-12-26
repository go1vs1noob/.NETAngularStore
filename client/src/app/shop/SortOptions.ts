import { Identifiable } from "../shared/interfaces/identifieable";

export class SortOptions {
    static readonly OptionList: Identifiable[] = [
        { id: 0, name: "Alphabetically" },
        { id: 1, name: "Reverse Alphabetically" },
        { id: 2, name: "Price Ascending" },
        { id: 3, name: "Price Desending" },];
} 