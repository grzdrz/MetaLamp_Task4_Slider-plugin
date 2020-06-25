import { Element } from "./Element.js";

export class FilledStrip extends Element {
    constructor(controller, DOMElement) {
        super(controller, DOMElement);

        this.position.x = this.calculatePosition();
    }

    calculatePosition(){
        let firstSlider = this.controller.model.firstSlider;
        let lastSlider = this.controller.model.lastSlider;
        return firstSlider.position.x + firstSlider.size.width / 2;
    }
}