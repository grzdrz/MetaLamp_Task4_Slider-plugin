import SliderPart from "./SliderPart";
import Vector from "../../../../Helpers/Vector";

class FilledStrip extends SliderPart {
    public initialize(): void {
        this.buildDOMElement();
        this.render();
    }

    public buildDOMElement(): void {
        super.buildDOMElement();

        this.DOMElement.className = "range-slider__slider-body-filled";
        this.view.containerElement.append(this.DOMElement);
    }

    public render(): void {
        const modelData = this.view.getModelData();
        const {
            handleWidth,
            handleHeight,
            angle,
            angleInRad,
            sliderStripThickness,
        } = this.view.viewManager.viewData;

        const transformOriginX = handleWidth / 2;
        const transformOriginY = (sliderStripThickness) / 2;
        this.DOMElement.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.DOMElement.style.transform = `rotate(${-angle}deg)`;// минус из-за нестандартного направления обхода функции rotate

        const vectorizedHandleWidth = Vector.calculateVector(handleWidth, angleInRad);
        const firstHandlePosition = this.view.calculateProportionalPixelValue(modelData.firstValue);
        const vectorizedFirstHandlePosition = Vector.calculateVector(firstHandlePosition, angleInRad);
        if (modelData.hasTwoSlider) {
            const lastHandlePosition = this.view.calculateProportionalPixelValue(modelData.lastValue);
            const vectorizedLastHandlePosition = Vector.calculateVector(lastHandlePosition, angleInRad).sum(vectorizedHandleWidth);

            const width = vectorizedLastHandlePosition.subtract(vectorizedFirstHandlePosition).length;
            this.setSize(new Vector(width, sliderStripThickness));

            const position = vectorizedFirstHandlePosition.sum(vectorizedHandleWidth.multiplyByNumber(0.5));
            position.y += (handleHeight / 2 - (sliderStripThickness) / 2);
            this.setPosition(position);
        } else {
            const width = vectorizedFirstHandlePosition.sum(vectorizedHandleWidth.multiplyByNumber(0.5)).length;
            this.setSize(new Vector(width, sliderStripThickness));
            this.setPosition(new Vector(0, handleHeight / 2 - (sliderStripThickness) / 2));
        }
    }
}

export default FilledStrip;
