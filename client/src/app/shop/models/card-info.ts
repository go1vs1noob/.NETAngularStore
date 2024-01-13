import { Identifiable } from "src/app/shared/interfaces/identifieable";

export interface CardInfo {
    item: Identifiable,
    cardImgSrc: string,
    buttonLeftText: string,
    buttonRightText: string,
    buttonRightRouterLink: string,
    buttonLeftRouterLink: string,
    cardText: string,
    cardTitle: string
}
