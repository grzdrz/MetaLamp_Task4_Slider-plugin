import { SliderPart } from "./SliderPart";
import { SliderView } from "../SliderView";
import { Vector } from "../../../Helpers/Vector";

export class EmptyStrip extends SliderPart {
    constructor(view: SliderView, DOMElement: HTMLElement) {
        super(view, DOMElement);

        this.calculatePosition = this.calculatePosition.bind(this);
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        let modelData = this.view.getModelData();

        let handle = this.view.firstSliderInstance;
        if (!handle) throw new Error("handle not exist");
        let handleSize = handle.size;

        this.setSize(new Vector(modelData.sliderStripLength, modelData.sliderStripThickness));
        this.setPosition(new Vector(0, handleSize.height / 2 - (modelData.sliderStripThickness) / 2));

        let transformOrigin = {//точка вращения - отступ на половину размера ползунка от основания полосы и отступ до центра полосы в ее толщине
            x: handle.size.width / 2,
            y: (modelData.sliderStripThickness) / 2,
        };
        this.DOMElement.style.transformOrigin = `${transformOrigin.x}px ${transformOrigin.y}px`;
        this.DOMElement.style.transform = `rotate(${-modelData.angle}deg)`;
    }
}