import { SliderPart } from "./SliderPart.js";
import { Vector } from "../../../Helpers/Vector.js";

export class SlidersContainer extends SliderPart {
    constructor(view, DOMElement) {
        super(view, DOMElement);
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        let modelData = this.view.getModelData();

        let width = modelData.sliderStripLength * Math.cos(modelData.angleInRad);
        let height = modelData.sliderStripLength * Math.sin(modelData.angleInRad);
        this.setSize({
            width: width,
            height: height,
        });
    }
}