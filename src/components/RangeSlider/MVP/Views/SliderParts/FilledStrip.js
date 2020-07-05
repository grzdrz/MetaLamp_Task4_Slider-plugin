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

        let handle = this.view.firstSliderInstance;
        let handleSize = handle.size;

        if (modelData.hasTwoSlider) {
            let width = Vector.sum(lastSlider.position, firstSlider.position.multiplyByNumber(-1)).length;
            this.setSize({
                height: modelData.sliderStripThickness,
                width: width,
            });
            //превращаем ширину ползунка в вектор, чтобы повернуть его и прибавить его половину к вектору позиции полосы
            let testVector = new Vector(firstSlider.size.width * Math.cos(modelData.angleInRad), firstSlider.size.width * Math.sin(modelData.angleInRad));
            this.setPosition({
                x: firstSlider.position.x + testVector.x / 2,
                y: firstSlider.position.y + testVector.y / 2 + (handleSize.height / 2 - (modelData.sliderStripThickness) / 2),
            });
        }
        else {
            let width = firstSlider.position.length + firstSlider.size.width / 2;
            this.setSize({
                height: modelData.sliderStripThickness,
                width: width,
            });
            this.setPosition({
                x: 0,
                y: handleSize.height / 2 - (modelData.sliderStripThickness) / 2,
            });
        }

        let transformOrigin = {
            x: handle.size.width / 2,
            y: (modelData.sliderStripThickness) / 2,
        };
        this.DOMElement.style.transformOrigin = `${transformOrigin.x}px ${transformOrigin.y}px`;
        this.DOMElement.style.transform = `rotate(${-modelData.angle}deg)`;//минус из-за нестандартного направления обхода функции rotate

        super.calculatePosition();
    }
}