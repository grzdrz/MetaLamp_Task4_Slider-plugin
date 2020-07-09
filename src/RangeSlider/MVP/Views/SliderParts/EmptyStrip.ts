import { SliderPart } from "./SliderPart";
import { SliderView } from "../SliderView";
import { Vector } from "../../../Helpers/Vector";

export class EmptyStrip extends SliderPart {
    constructor(view: SliderView) {
        super(view);
    }

    initialize() {
        this.buildDOMElement();
        this.render();
    }

    buildDOMElement() {
        this.DOMElement = document.createElement("div");
        this.DOMElement.className = "range-slider__slider-body-empty";
        this.view.sliderContainer.DOMElement.append(this.DOMElement);
    }

    render() {
        let modelData = this.view.getModelData();

        //точка вращения - отступ на половину размера ползунка от основания полосы и отступ до центра полосы в ее толщине
        let transformOriginX = modelData.handleWidth / 2;
        let transformOriginY = (modelData.sliderStripThickness) / 2;

        this.DOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.DOMElement.style.transform = `rotate(${-modelData.angle}deg)`;

        this.setSize(new Vector(modelData.sliderStripLength, modelData.sliderStripThickness));
        this.setPosition(new Vector(0, modelData.handleHeight / 2 - (modelData.sliderStripThickness) / 2));
    }
}