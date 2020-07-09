import { SliderPart } from "./SliderPart";
import { Vector } from "../../../Helpers/Vector";
import { SliderView } from "../SliderView";

export class FilledStrip extends SliderPart {
    constructor(view: SliderView, DOMElement: HTMLElement) {
        super(view, DOMElement);

        this.calculatePosition = this.calculatePosition.bind(this);
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        let modelData = this.view.getModelData();

        let firstSlider = this.view.firstSliderInstance;
        if (!firstSlider) throw new Error("handle not exist");
        let lastSlider = this.view.lastSliderInstance;
        if (!lastSlider) throw new Error("handle not exist");

        let handle = this.view.firstSliderInstance;
        if (!handle) throw new Error("handle not exist");
        let handleSize = handle.size;

        if (modelData.hasTwoSlider) {
            let width = lastSlider.position.sum(firstSlider.position.multiplyByNumber(-1)).length;
            this.setSize(new Vector(width, modelData.sliderStripThickness)); width
            //превращаем ширину ползунка в вектор, чтобы повернуть его и прибавить его половину к вектору позиции полосы
            let testVector = new Vector(firstSlider.size.width * Math.cos(modelData.angleInRad), firstSlider.size.width * Math.sin(modelData.angleInRad));
            this.setPosition(new Vector(
                firstSlider.position.x + testVector.x / 2,
                firstSlider.position.y + testVector.y / 2 + (handleSize.height / 2 - (modelData.sliderStripThickness) / 2)
            ));
        }
        else {
            let width = firstSlider.position.length + firstSlider.size.width / 2;
            this.setSize(new Vector(width, modelData.sliderStripThickness));
            this.setPosition(new Vector(0, handleSize.height / 2 - (modelData.sliderStripThickness) / 2));
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