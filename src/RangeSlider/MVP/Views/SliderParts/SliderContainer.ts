import SliderPart from "./SliderPart";
import Vector from "../../../Helpers/Vector";
import MathFunctions from "../../../Helpers/MathFunctions";

class SliderContainer extends SliderPart {
    public sliderLength = 0;

    public initialize(): void {
        this.render();
    }

    public buildDOMElement(): void { }

    public render(): void {
        const { angleInRad } = this.view.viewManager.viewData;

        this.calculateSliderLength();

        const size = Vector.calculateVector(this.sliderLength, angleInRad);
        this.setSize(size);
    }

    private calculateSliderLength() {
        const { angleInRad, borderThickness } = this.view.viewManager.viewData;

        const test1 = this.DOMElement.closest(".range-slider");
        let boundingRect;
        if (test1) {
            boundingRect = test1.getBoundingClientRect();
        } else throw new Error("sdfsdf");

        // координаты точки поверхности эллипса
        const width = boundingRect.width - borderThickness * 2;
        const height = boundingRect.height - borderThickness * 2;
        const curLength = MathFunctions.calculateEllipseSurfacePointCoordinate(width, height, angleInRad);
        this.sliderLength = curLength.length;
    }
}

export default SliderContainer;
