import { Element } from "./Element.js";

export class Slider extends Element {
    constructor(view, mainDOMElement, outsideDOMElement, number) {
        super(view, mainDOMElement);

        this.number = number;
        this.outsideDOMElement = outsideDOMElement;

        this.calculatePosition = this.calculatePosition.bind(this);
    }

    calculatePosition() {
        let modelData = this.view.getModelData();
        let slidersContainerWidth = this.view.slidersContainerInstance.size.width;

        let dSliderInputFullValue = modelData.maxValue - modelData.minValue;
        let dSliderStripFullValue = slidersContainerWidth - this.size.width * 2;

        if (this.number === 1) {
            if (modelData.firstValue < modelData.minValue) {
                this.position.x = 0;
            }
            else if (modelData.firstValue > modelData.maxValue) {
                this.position.x = ((modelData.lastValue - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue;
            }
            else if (modelData.firstValue > modelData.lastValue)
                this.position.x = ((modelData.lastValue - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue;
            else
                this.position.x = ((modelData.firstValue - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue;
        }
        else {

            this.position.x = (((modelData.lastValue - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue) + this.size.width;
        }

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