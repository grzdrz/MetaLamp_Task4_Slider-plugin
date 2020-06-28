import { Element } from "./Element.js";

export class Slider extends Element {
    constructor(view, mainDOMElement, outsideDOMElement, number) {
        super(view, mainDOMElement);

        this.number = number;
        this.outsideDOMElement = outsideDOMElement;

        this.calculatePosition = this.calculatePosition.bind(this);
    }

    initialize() {
        let modelData = this.view.getModelData();
        this.outsideDOMElement.style.width = `${modelData.borderThickness * 2 + this.size.width}px`;
        this.outsideDOMElement.style.height = `${modelData.borderThickness * 2 + this.size.height}px`;

        this.calculatePosition();
    }

    calculatePosition() {
        let modelData = this.view.getModelData();

        let slidersContainerWidth = this.view.slidersContainerInstance.size.width;
        let dSliderInputFullValue = modelData.maxValue - modelData.minValue;
        let dSliderStripFullValue;
        if (modelData.hasTwoSlider)
            dSliderStripFullValue = slidersContainerWidth - this.size.width * 2;
        else
            dSliderStripFullValue = slidersContainerWidth - this.size.width;
        if (this.number === 1) {
            let newTargetSliderPosInContainer;
            newTargetSliderPosInContainer = ((modelData.firstValue - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue;
            this.setPosition({ x: newTargetSliderPosInContainer, y: 0 });
        }
        else {
            let newTargetSliderPosInContainer = ((modelData.lastValue - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue + this.size.width;
            this.setPosition({ x: newTargetSliderPosInContainer, y: 0 });
        }

        this.calculateBorderPosition();
    }

    calculateBorderPosition() {
        let modelData = this.view.getModelData();
        if (modelData.orientation === "horizontal") {
            this.view.setMargin(this.outsideDOMElement, {
                x: this.position.x - modelData.borderThickness,
                y: 0
            });
        }
        else if (modelData.orientation === "vertical") {
            this.view.setMargin(this.outsideDOMElement, {
                x: 0,
                y: this.position.y - modelData.borderThickness
            });
        }
    }
}