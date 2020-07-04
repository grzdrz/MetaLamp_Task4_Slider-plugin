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
        let styles = getComputedStyle(this.DOMElement);
        let borderWidthLeft = Number.parseInt(styles.borderLeftWidth);
        let borderWidthRight = Number.parseInt(styles.borderRightWidth);
        let borderWidthTop = Number.parseInt(styles.borderTopWidth);
        let borderWidthBottom = Number.parseInt(styles.borderBottomWidth);

        this.setSize({
            height: modelData.sliderStripThickness + (borderWidthTop + borderWidthBottom),
            width: modelData.sliderStripLength - (borderWidthLeft + borderWidthRight),
        });
        this.setPosition({
            x: 0,
            y: handleSize.height / 2 - (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2,
        });

        let transformOrigin = {//точка вращения - отступ на половину размера ползунка от основания полосы и отступ до центра полосы в ее толщине
            x: handle.size.width / 2,
            y: (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2,
        };
        this.DOMElement.style.transformOrigin = `${transformOrigin.x}px ${transformOrigin.y}px`;
        this.DOMElement.style.transform = `rotate(${-modelData.angle}deg)`;
    }
}