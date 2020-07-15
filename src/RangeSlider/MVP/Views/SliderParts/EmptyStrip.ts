import SliderPart from "./SliderPart";
/* import SliderView from "../SliderView"; */
import Vector from "../../../Helpers/Vector";

class EmptyStrip extends SliderPart {
    /*     constructor(view: SliderView) {
            super(view);
        } */

    public initialize(): void {
        this.buildDOMElement();
        this.render();
    }

    public buildDOMElement(): void {
        this.DOMElement = document.createElement("div");
        this.DOMElement.className = "range-slider__slider-body-empty";
        this.view.sliderContainer.DOMElement.append(this.DOMElement);
    }

    public render(): void {
        // const modelData = this.view.getModelData();
        const {
            handleWidth,
            handleHeight,
            sliderStripThickness,
            angle,
        } = this.view.viewManager.viewData;

        // точка вращения - отступ на половину размера ползунка от основания полосы и отступ до центра полосы в ее толщине
        const transformOriginX = handleWidth / 2;
        const transformOriginY = (sliderStripThickness) / 2;

        this.DOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.DOMElement.style.transform = `rotate(${-angle}deg)`;

        this.setSize(new Vector(this.view.sliderContainer.sliderLength, sliderStripThickness));
        this.setPosition(new Vector(0, handleHeight / 2 - (sliderStripThickness) / 2));
    }
}

export default EmptyStrip;
