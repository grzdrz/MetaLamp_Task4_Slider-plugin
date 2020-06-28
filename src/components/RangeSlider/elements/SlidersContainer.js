import { Element } from "./Element.js";

export class SlidersContainer extends Element {
    constructor(view, DOMElement) {
        super(view, DOMElement);

        this.containerBoundingRect = this.DOMElement.getBoundingClientRect(); //containerBoundingRect
    }
}