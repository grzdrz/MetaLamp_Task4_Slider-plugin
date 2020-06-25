import { Element } from "./Element.js";

export class FilledStrip extends Element {
    constructor(view, DOMElement) {
        super(view, DOMElement);

        /* this.position.x = this.calculatePosition(); */
        this.calculatePosition = this.calculatePosition.bind(this);
    }

    calculatePosition(){
        let firstSlider = this.view.firstSliderInstance;
        let lastSlider = this.view.lastSliderInstance;
        this.position.x = firstSlider.position.x + firstSlider.size.width / 2;

        let width = lastSlider.position.x - firstSlider.position.x;

        this.setPosition();
        this.setSize({width: width});
    }
}