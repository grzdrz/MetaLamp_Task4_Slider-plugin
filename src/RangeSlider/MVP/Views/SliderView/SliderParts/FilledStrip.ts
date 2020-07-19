import SliderPart from "./SliderPart";
import Vector from "../../../../Helpers/Vector";
import SliderView from "../SliderView";

class FilledStrip extends SliderPart {
    public countNumber = 0;

    constructor(view: SliderView, countNumber: number) {
        super(view);
        this.countNumber = countNumber;
    }

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

        const values = modelData.values.map((e) => e);
        const vectorizedHandleWidth = Vector.calculateVector(handleWidth, angleInRad);

        if (this.countNumber === 0) {
            const firstHandlePosition = this.view.calculateProportionalPixelValue(values[0]);
            const vectorizedFirstHandlePosition = Vector.calculateVector(firstHandlePosition, angleInRad);
            const shift = Vector.calculateVector(handleWidth * 0.5, angleInRad);
            const width = vectorizedFirstHandlePosition.sum(shift).length;
            this.setSize(new Vector(width, sliderStripThickness));
            this.setPosition(new Vector(0, handleHeight / 2 - (sliderStripThickness) / 2));
        } else if (this.countNumber === this.view.viewManager.viewData.filledStrips.length - 1) {
            const firstHandlePosition = this.view.calculateProportionalPixelValue(values[values.length - 1]);
            const maxValueLength = this.view.calculateProportionalPixelValue(modelData.maxValue);
            const vectorizedFirstHandlePosition = Vector.calculateVector(firstHandlePosition, angleInRad);
            const vectorizedMaxValueLength = Vector.calculateVector(maxValueLength, angleInRad);
            const lastStrip = vectorizedMaxValueLength.subtract(vectorizedFirstHandlePosition);
            const shift = Vector.calculateVector((handleWidth * this.countNumber - handleWidth / 2), angleInRad);
            const width = lastStrip.sum(Vector.calculateVector(handleWidth / 2, angleInRad)).length;
            const position = vectorizedFirstHandlePosition.sum(shift);
            position.y += (handleHeight / 2 - (sliderStripThickness) / 2);

            this.setSize(new Vector(width, sliderStripThickness));
            this.setPosition(position);
        } else {
            const firstHandlePosition = this.view.calculateProportionalPixelValue(values[this.countNumber - 1]);
            const vectorizedFirstHandlePosition = Vector.calculateVector(firstHandlePosition, angleInRad);
            const lastHandlePosition = this.view.calculateProportionalPixelValue(values[this.countNumber]);
            const vectorizedLastHandlePosition = Vector.calculateVector(lastHandlePosition, angleInRad).sum(vectorizedHandleWidth);

            const width = vectorizedLastHandlePosition.subtract(vectorizedFirstHandlePosition).length;
            this.setSize(new Vector(width, sliderStripThickness));

            const shift = Vector.calculateVector((handleWidth * this.countNumber - handleWidth / 2), angleInRad);
            const position = vectorizedFirstHandlePosition.sum(shift);
            position.y += (handleHeight / 2 - (sliderStripThickness) / 2);
            this.setPosition(position);
        }
    }
}

export default FilledStrip;
