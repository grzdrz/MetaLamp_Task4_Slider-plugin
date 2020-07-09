import { SliderPart } from "./SliderPart";
import { Vector } from "../../../Helpers/Vector";
import { SliderView } from "../SliderView";

export class SliderContainer extends SliderPart {
    constructor(view: SliderView) {
        super(view);
    }

    initialize() {
        this.render();
    }

    render() {
        let modelData = this.view.getModelData();

        let size = Vector.calculateVector(modelData.sliderStripLength, modelData.angleInRad);
        this.setSize(size);
    }
}