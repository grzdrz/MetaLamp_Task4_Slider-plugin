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

        let slidersContainerSize;
        if (modelData.orientation === "horizontal")
            slidersContainerSize = this.view.slidersContainerInstance.size.width;
        else if (modelData.orientation === "vertical")
            slidersContainerSize = this.view.slidersContainerInstance.size.height;

        let dSliderInputFullValue = modelData.maxValue - modelData.minValue;

        let dSliderStripFullValue;
        if (modelData.hasTwoSlider) {
            if (modelData.orientation === "horizontal")
                dSliderStripFullValue = slidersContainerSize - this.size.width * 2;
            else if (modelData.orientation === "vertical")
                dSliderStripFullValue = slidersContainerSize - this.size.height * 2;
        }
        else {
            if (modelData.orientation === "horizontal")
                dSliderStripFullValue = slidersContainerSize - this.size.width;
            else if (modelData.orientation === "vertical")
                dSliderStripFullValue = slidersContainerSize - this.size.height;
        }

        if (this.number === 1) {
            let newTargetSliderPosInContainer;
            newTargetSliderPosInContainer = ((modelData.firstValue - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue;
            if (modelData.orientation === "horizontal")
                this.setPosition({ x: newTargetSliderPosInContainer, y: 0 });
            else if (modelData.orientation === "vertical")
                this.setPosition({ x: 0, y: newTargetSliderPosInContainer });
        }
        else { 
            if (modelData.orientation === "horizontal") {
                let newTargetSliderPosInContainer = ((modelData.lastValue - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue + this.size.width;
                this.setPosition({ x: newTargetSliderPosInContainer, y: 0 });
            }
            else if (modelData.orientation === "vertical") {
                let newTargetSliderPosInContainer = ((modelData.lastValue - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue + this.size.height;
                this.setPosition({ x: 0, y: newTargetSliderPosInContainer });
            }
        }

        this.calculateBorderPosition();
    }

    calculateBorderPosition() {
        let modelData = this.view.getModelData();
        if (modelData.orientation === "horizontal") {
            this.view.setPosition(this.outsideDOMElement, {
                x: this.position.x - modelData.borderThickness,
                y: 0
            });
        }
        else if (modelData.orientation === "vertical") {
            this.view.setPosition(this.outsideDOMElement, {
                x: 0,
                y: this.position.y - modelData.borderThickness
            });
        }
    }
}