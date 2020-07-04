import { SliderPart } from "./SliderPart.js";
import { Vector } from "../../../Helpers/Vector.js";

export class FilledStrip extends SliderPart {
    constructor(view, DOMElement) {
        super(view, DOMElement);

        this.calculatePosition = this.calculatePosition.bind(this);
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        let modelData = this.view.getModelData();

        let firstSlider = this.view.firstSliderInstance;
        let lastSlider = this.view.lastSliderInstance;

        if (modelData.orientation === "horizontal")
            this.angle = 0;
        else
            this.angle = 90;

        let handle = this.view.firstSliderInstance;
        let handleSize = handle.size;
        let styles = getComputedStyle(this.DOMElement);
        let borderWidthLeft = Number.parseInt(styles.borderLeftWidth);
        let borderWidthRight = Number.parseInt(styles.borderRightWidth);
        let borderWidthTop = Number.parseInt(styles.borderTopWidth);
        let borderWidthBottom = Number.parseInt(styles.borderBottomWidth);

        if (modelData.hasTwoSlider) {
            let width = Vector.sum(lastSlider.position, firstSlider.position.multiplyByNumber(-1)).length;
            this.setSize({
                height: modelData.sliderStripThickness + (borderWidthTop + borderWidthBottom),
                width: width - (borderWidthLeft + borderWidthRight),
            });
            let radFromDeg = this.angle * (Math.PI / 180);
            //превращаем ширину ползунка в вектор, чтобы повернуть его и прибавить его половину к вектору позиции полосы
            let testVector = new Vector(firstSlider.size.width * Math.cos(radFromDeg), firstSlider.size.width * Math.sin(radFromDeg));
            this.setPosition({
                x: firstSlider.position.x + testVector.x / 2,
                y: firstSlider.position.y + testVector.y / 2 + (handleSize.height / 2 - (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2),
            });
        }
        else {
            let width = firstSlider.position.length + firstSlider.size.width / 2;
            this.setSize({
                height: modelData.sliderStripThickness + (borderWidthTop + borderWidthBottom),
                width: width - (borderWidthLeft + borderWidthRight),
            });
            this.setPosition({
                x: 0,
                y: handleSize.height / 2 - (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2,
            });
        }

        let transformOrigin = {
            x: handle.size.width / 2,
            y: (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2,
        };
        this.DOMElement.style.transformOrigin = `${transformOrigin.x}px ${transformOrigin.y}px`;
        this.DOMElement.style.transform = `rotate(${-this.angle}deg)`;//минус из-за нестандартного направления обхода функции rotate
        //------------------------------------------------------------------------------------


        super.calculatePosition();
    }
}