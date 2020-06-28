import { Element } from "./Element.js";

export class FilledStrip extends Element {
    constructor(view, DOMElement) {
        super(view, DOMElement);

        this.calculatePosition = this.calculatePosition.bind(this);
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        let firstSlider = this.view.firstSliderInstance;
        let lastSlider = this.view.lastSliderInstance;
        this.setPosition({ x: firstSlider.position.x + firstSlider.size.width / 2 });
        this.setSize({ width: lastSlider.position.x - firstSlider.position.x });

        super.calculatePosition();
    }
}