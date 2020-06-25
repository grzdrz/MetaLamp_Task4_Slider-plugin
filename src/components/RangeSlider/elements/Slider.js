import { Element } from "./Element.js";

export class Slider extends Element {
    constructor(view, mainDOMElement, outsideDOMElement, inputDOMElement, number) {
        super(view, mainDOMElement);

        this.number = number;
        this.outsideDOMElement = outsideDOMElement;
        this.inputDOMElement = inputDOMElement;

        /* this.position.x = this.calculatePosition();
        this.outsidePosition = this.calculateOutsidePosition(); */
        this.calculatePosition = this.calculatePosition.bind(this);
    }

    calculatePosition() {
        //let inputMaxValue = this.controller.model.options.maxValue;
        //let inputMinValue = this.controller.model.options.minValue;
        //let slidersContainerWidth = this.controller.model.slidersContainer.size.width;
        let modelData = this.view.getModelData();
        let inputMaxValue = modelData.maxValue;
        let inputMinValue = modelData.minValue;
        let slidersContainerWidth = this.view.slidersContainerInstance.size.width;

        let dSliderInputFullValue = inputMaxValue - inputMinValue;
        let dSliderStripFullValue = slidersContainerWidth - this.size.width * 2;

        if (this.number === 1)
            this.position.x = ((this.inputDOMElement.value - inputMinValue) * dSliderStripFullValue) / dSliderInputFullValue;
        else
            this.position.x = (((this.inputDOMElement.value - inputMinValue) * dSliderStripFullValue) / dSliderInputFullValue) + this.size.width;


        this.outsidePosition = this.calculateOutsidePosition();


        this.setPosition();
    }

    calculateOutsidePosition() {
        let modelData = this.view.getModelData();
        return this.position.x - modelData.outsideWidth;///
    }

    setPosition() {
        super.setPosition();
        this.view.setLeftMargin(this.outsideDOMElement, this.outsidePosition);
    }
}