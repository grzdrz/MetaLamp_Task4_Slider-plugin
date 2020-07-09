import { SliderPart } from "./SliderPart";
import { SliderView } from "../SliderView";
import { Vector } from "../../../Helpers/Vector";

export class EmptyStrip extends SliderPart {
    constructor(view: SliderView, DOMElement: HTMLElement) {
        super(view, DOMElement);
    }

    initialize() {
        this.render();
    }

    render() {
        let modelData = this.view.getModelData();

        this.setSize(new Vector(modelData.sliderStripLength, modelData.sliderStripThickness));
        this.setPosition(new Vector(0, modelData.handleHeight / 2 - (modelData.sliderStripThickness) / 2));

        let transformOrigin = {//точка вращения - отступ на половину размера ползунка от основания полосы и отступ до центра полосы в ее толщине
            x: modelData.handleWidth / 2,
            y: (modelData.sliderStripThickness) / 2,
        };
        this.DOMElement.style.transformOrigin = `${transformOrigin.x}px ${transformOrigin.y}px`;
        this.DOMElement.style.transform = `rotate(${-modelData.angle}deg)`;
    }
}