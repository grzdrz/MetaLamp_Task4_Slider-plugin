import SliderPart from "./SliderPart";
import Vector from "../../../Helpers/Vector";
/* import SliderView from "../SliderView"; */

class SliderContainer extends SliderPart {
    public sliderLength = 0;

    /* constructor(view: SliderView) {
        super(view);
    } */

    public initialize(): void {
        this.render();
    }

    public buildDOMElement(): void { }

    public render(): void {
        const modelData = this.view.getModelData();

        this.calculateSliderLength();

        const size = Vector.calculateVector(this.sliderLength, modelData.angleInRad);
        this.setSize(size);
    }

    private calculateSliderLength() {
        const modelData = this.view.getModelData();
        const test1 = this.DOMElement.closest(".range-slider");
        let boundingRect;
        if (test1) {
            boundingRect = test1.getBoundingClientRect();
        } else throw new Error("sdfsdf");

        // координаты точки поверхности эллипса
        const t = Math.atan2(boundingRect.width * Math.sin(modelData.angleInRad), boundingRect.height * Math.cos(modelData.angleInRad));
        const x = boundingRect.width * Math.cos(t);
        const y = boundingRect.height * Math.sin(t);

        const curLength = new Vector(x, y);
        this.sliderLength = curLength.length;
    }
}

export default SliderContainer;
