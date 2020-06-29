import { Element } from "./Element.js";

export class SlidersContainer extends Element {
    constructor(view, DOMElement, baseModelData) {
        super(view, DOMElement);

        this.containerBoundingRect = this.DOMElement.getBoundingClientRect();
        if (baseModelData.orientation === "vertical") {
            this.containerBoundingRect.y = document.documentElement.clientHeight - (this.containerBoundingRect.y + this.containerBoundingRect.height);
        }
    }
}