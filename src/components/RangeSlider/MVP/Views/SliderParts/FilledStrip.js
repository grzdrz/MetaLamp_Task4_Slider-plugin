import { SliderPart } from "./SliderPart.js";

export class FilledStrip extends SliderPart {
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
            if (modelData.orientation === "horizontal") {
                this.setPosition({ x: firstSlider.position.x + firstSlider.size.width / 2 });
                this.setSize({ width: lastSlider.position.x - firstSlider.position.x });
            }
            else if (modelData.orientation === "vertical") {
                this.setPosition({ y: firstSlider.position.y + firstSlider.size.height / 2 });
                this.setSize({ height: lastSlider.position.y - firstSlider.position.y });
            }
        }
        else {
            if (modelData.orientation === "horizontal") {
                this.setPosition({ x: 0 });
                this.setSize({ width: firstSlider.position.x + firstSlider.size.width / 2 });
            }
            else if (modelData.orientation === "vertical") {
                this.setPosition({ y: 0 });
                this.setSize({ height: firstSlider.position.y + firstSlider.size.height / 2});
            }
        }

        super.calculatePosition();
    }
}