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
        let modelData = this.view.getModelData();

        let firstSlider = this.view.firstSliderInstance;
        let lastSlider = this.view.lastSliderInstance;///

        if (modelData.hasTwoSlider) {
            this.setPosition({ x: firstSlider.position.x + firstSlider.size.width / 2 });
            this.setSize({ width: lastSlider.position.x - firstSlider.position.x });
        }
        else {
            this.setPosition({ x: 0 });
            this.setSize({ width: firstSlider.position.x });
        }

        super.calculatePosition();
    }
}