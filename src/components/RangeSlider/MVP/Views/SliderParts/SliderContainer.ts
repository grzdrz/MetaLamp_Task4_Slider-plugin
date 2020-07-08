import { SliderPart } from "./SliderPart";
import { Vector } from "../../../Helpers/Vector";
import { SliderView } from "../SliderView";

export class SlidersContainer extends SliderPart {
    constructor(view: SliderView, DOMElement: HTMLElement) {
        super(view, DOMElement);
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        let modelData = this.view.getModelData();

        let width = modelData.sliderStripLength * Math.cos(modelData.angleInRad);
        let height = modelData.sliderStripLength * Math.sin(modelData.angleInRad);
        this.setSize(new Vector(width, height));
    }
}