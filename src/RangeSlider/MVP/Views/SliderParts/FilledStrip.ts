import { SliderPart } from "./SliderPart";
import { Vector } from "../../../Helpers/Vector";
import { SliderView } from "../SliderView";

export class FilledStrip extends SliderPart {
    constructor(view: SliderView) {
        super(view);
    }

    initialize() {
        this.buildDOMElement();
        this.render();
    }

    buildDOMElement() {
        this.DOMElement = document.createElement("div");
        this.DOMElement.className = "range-slider__slider-body-filled";
        this.view.sliderContainer.DOMElement.append(this.DOMElement);
    }

    render() {
        let modelData = this.view.getModelData();

        let transformOriginX = modelData.handleWidth / 2;
        let transformOriginY = (modelData.sliderStripThickness) / 2;
        this.DOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.DOMElement.style.transform = `rotate(${-modelData.angle}deg)`;//минус из-за нестандартного направления обхода функции rotate

        let firstSlider = this.view.firstSlider;
        if (!firstSlider) throw new Error("handle not exist");
        let lastSlider = this.view.lastSlider;
        if (!lastSlider) throw new Error("handle not exist");

        if (modelData.hasTwoSlider) {
            let width = lastSlider.position.sum(firstSlider.position.multiplyByNumber(-1)).length;
            this.setSize(new Vector(width, modelData.sliderStripThickness));
            let vectorizedHandleWidth = Vector.calculateVector(modelData.handleWidth, modelData.angleInRad);
            let position = firstSlider.position.sum(vectorizedHandleWidth.multiplyByNumber(0.5));
            position.y += (modelData.handleHeight / 2 - (modelData.sliderStripThickness) / 2);
            this.setPosition(position);
        }
        else {
            let width = firstSlider.position.length + modelData.handleWidth / 2;
            this.setSize(new Vector(width, modelData.sliderStripThickness));
            this.setPosition(new Vector(0, modelData.handleHeight / 2 - (modelData.sliderStripThickness) / 2));
        }
    }
}