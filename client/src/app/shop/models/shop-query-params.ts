import { SortOptions } from "../SortOptions";

export class ShopQueryParams {
    brandId = 0;
    typeId = 0;
    sort = SortOptions.OptionList[0];
    pageNumber = 1;
    pageSize = 6;
    searchString = "";
    
}