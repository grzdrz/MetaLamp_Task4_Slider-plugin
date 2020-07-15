import SliderPart from "./SliderPart";
import Vector from "../../../Helpers/Vector";
/* import SliderView from "../SliderView"; */

class FilledStrip extends SliderPart {
    /* constructor(view: SliderView) {
        super(view);
    } */

    public initialize(): void {
        this.buildDOMElement();
        this.render();
    }

    public buildDOMElement(): void {
        this.DOMElement = document.createElement("div");
        this.DOMElement.className = "range-slider__slider-body-filled";
        this.view.sliderContainer.DOMElement.append(this.DOMElement);
    }

    public render(): void {
        const modelData = this.view.getModelData();

        const transformOriginX = modelData.handleWidth / 2;
        const transformOriginY = (modelData.sliderStripThickness) / 2;
        this.DOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.DOMElement.style.transform = `rotate(${-modelData.angle}deg)`;// минус из-за нестандартного направления обхода функции rotate

        const vectorizedHandleWidth = Vector.calculateVector(modelData.handleWidth, modelData.angleInRad);
        const firstHandlePosition = this.view.calculateProportionalPixelValue(modelData.firstValue);
        const vectorizedFirstHandlePosition = Vector.calculateVector(firstHandlePosition, modelData.angleInRad);
        if (modelData.hasTwoSlider) {
            const lastHandlePosition = this.view.calculateProportionalPixelValue(modelData.lastValue);
            const vectorizedLastHandlePosition = Vector.calculateVector(lastHandlePosition, modelData.angleInRad).sum(vectorizedHandleWidth);

            const width = vectorizedLastHandlePosition.subtract(vectorizedFirstHandlePosition).length;
            this.setSize(new Vector(width, modelData.sliderStripThickness));

            const position = vectorizedFirstHandlePosition.sum(vectorizedHandleWidth.multiplyByNumber(0.5));
            position.y += (modelData.handleHeight / 2 - (modelData.sliderStripThickness) / 2);
            this.setPosition(position);
        } else {
            const width = vectorizedFirstHandlePosition.sum(vectorizedHandleWidth.multiplyByNumber(0.5)).length;
            this.setSize(new Vector(width, modelData.sliderStripThickness));
            this.setPosition(new Vector(0, modelData.handleHeight / 2 - (modelData.sliderStripThickness) / 2));
        }
    }
}

export default FilledStrip;
