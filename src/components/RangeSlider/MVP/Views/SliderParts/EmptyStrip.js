import { SliderPart } from "./SliderPart.js";

export class EmptyStrip extends SliderPart {
    constructor(view, DOMElement) {
        super(view, DOMElement);

        this.calculatePosition = this.calculatePosition.bind(this);
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        let modelData = this.view.getModelData();

        let handle = this.view.firstSliderInstance;
        let handleSize = handle.size;
        let handleStyles = getComputedStyle(this.DOMElement);///перенести в место установки сайза
        let borderWidthLeft = Number.parseInt(handleStyles.borderLeftWidth);
        let borderWidthRight = Number.parseInt(handleStyles.borderRightWidth);
        let borderWidthTop = Number.parseInt(handleStyles.borderTopWidth);
        let borderWidthBottom = Number.parseInt(handleStyles.borderBottomWidth);

        this.setSize({
            height: modelData.sliderStripThickness,
            width: modelData.sliderStripLength,
        });
        this.setPosition({
            x: handleSize.width / 2 - (modelData.sliderStripThickness + borderWidthLeft + borderWidthRight) / 2,
            y: handleSize.height / 2 - (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2,
        });
        if (modelData.orientation === "horizontal")
            this.angle = 0;
        else
            this.angle = -90;

        this.DOMElement.style.transformOrigin = `${this.position.x}px ${this.position.y}px`;
        this.DOMElement.style.transform = `rotate(${this.angle}deg)`;
    }
}