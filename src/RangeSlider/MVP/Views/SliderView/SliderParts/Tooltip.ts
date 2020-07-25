import SliderPart from "./SliderPart";
import SliderView from "../SliderView";
import Vector from "../../../../Helpers/Vector";

class Tooltip extends SliderPart {
    public countNumber: number;

    constructor(view: SliderView, countNumber: number) {
        super(view);

        this.countNumber = countNumber;
    }

    public buildDOMElement(): void {
        super.buildDOMElement();

        const { values } = this.view.viewManager.getModelData();
        const { tooltipWidth, tooltipHeight } = this.view.viewManager.viewData;

        this.DOMElement.className = `range-slider__tooltip range-slider__tooltip_${this.countNumber}`;
        this.DOMElement.dataset.sliderCountNumber = this.countNumber.toString();
        this.DOMElement.style.width = `${tooltipWidth}px`;
        this.DOMElement.style.height = `${tooltipHeight}px`;
        this.DOMElement.textContent = `${values[this.countNumber]}`;
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const { values } = this.view.viewManager.getModelData();
        const {
            handleWidth,
            handleHeight,
            angleInRad,
            isHandlesSeparated,
            borderThickness,
            tooltipWidth,
            tooltipMargin,
        } = this.view.viewManager.viewData;

        this.DOMElement.textContent = `${values[this.countNumber]}`;

        const shiftCoefficient = (isHandlesSeparated ? this.countNumber : 0);
        const handlesCountShift = Vector.calculateVector(Math.abs(handleWidth * shiftCoefficient), angleInRad);
        const handlePosition = this.view.calculateProportionalPixelValue(values[this.countNumber]);

        const tooltipPosition = handlePosition + borderThickness + handleWidth / 2 - tooltipWidth / 2;
        const vectorizedTooltipPosition = Vector.calculateVector(tooltipPosition, angleInRad).sum(handlesCountShift).sumNumber(-borderThickness);
        const vectorizedMargin = Vector.calculateVector(tooltipMargin + handleHeight + borderThickness * 2, angleInRad).rotateVector(Math.PI / 2);

        this.setPosition(vectorizedTooltipPosition.sum(vectorizedMargin));
    }
}

export default Tooltip;
