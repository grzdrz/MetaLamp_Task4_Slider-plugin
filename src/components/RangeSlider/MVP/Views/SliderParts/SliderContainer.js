import { SliderPart } from "./SliderPart.js";
import { Vector } from "../../../Helpers/Vector.js";

export class SlidersContainer extends SliderPart {
    constructor(view, DOMElement) {
        super(view, DOMElement);
    }

    initialize() {
        /* let modelData = this.view.getModelData(); */
        /* this.size.x = modelData. */

        this.calculatePosition();
    }

    calculatePosition(){
        let modelData = this.view.getModelData();

        let radFromDeg = modelData.angle * (Math.PI / 180);
        let width = modelData.sliderStripLength * Math.cos(radFromDeg);
        let height = modelData.sliderStripLength * Math.sin(radFromDeg);
        this.setSize({
            width: width,
            height: height,
        });
    }
}