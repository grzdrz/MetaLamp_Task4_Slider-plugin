import { Element } from "./Element.js";

export class EmptyStrip extends Element {
    constructor(view, DOMElement) {
        super(view, DOMElement);

        /* this.position.x = this.calculatePosition(); */
        this.calculatePosition = this.calculatePosition.bind(this);
    }

    calculatePosition() {
    }
}