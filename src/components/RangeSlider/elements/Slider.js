import { Element } from "./Element.js";

export class Slider extends Element {
    constructor(controller, mainDOMElement, outsideDOMElement, inputDOMElement, number) {
        super(controller, mainDOMElement);

        this.number = number;
        this.outsideDOMElement = outsideDOMElement;
        this.inputDOMElement = inputDOMElement;

        this.position.x = this.calculatePosition();
        this.outsidePosition = this.calculateOutsidePosition();
    }

    calculatePosition() {
        let inputMaxValue = this.controller.model.options.maxValue;
        let inputMinValue = this.controller.model.options.minValue;
        let slidersContainerWidth = this.controller.model.slidersContainer.size.width;

        let dSliderInputFullValue = inputMaxValue - inputMinValue;
        let dSliderStripFullValue = slidersContainerWidth - this.size.width * 2;

        if (this.number === 1)
            return ((this.inputDOMElement.value - inputMinValue) * dSliderStripFullValue) / dSliderInputFullValue;
        else
            return (((this.inputDOMElement.value - inputMinValue) * dSliderStripFullValue) / dSliderInputFullValue) + this.size.width;
    }

    calculateOutsidePosition() {
        return this.position.x - this.controller.model.options.outsideWidth;///
    }

    setPosition() {
        super.setPosition();
        this.controller.view.setLeftMargin(this.outsideDOMElement, this.outsidePosition);
    }
}