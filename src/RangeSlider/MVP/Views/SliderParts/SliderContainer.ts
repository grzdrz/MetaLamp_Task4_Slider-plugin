import SliderPart from "./SliderPart";
import Vector from "../../../Helpers/Vector";
import SliderView from "../SliderView";

class SliderContainer extends SliderPart {
    public sliderLength: number = 0;

    constructor(view: SliderView) {
        super(view);
    }

    initialize() {
        this.render();
    }

    buildDOMElement() { }

    render() {
        let modelData = this.view.getModelData();

        this.calculateSliderLength();

        let size = Vector.calculateVector(this.sliderLength, modelData.angleInRad);
        this.setSize(size);
    }

    calculateSliderLength() {
        let modelData = this.view.getModelData();
        let test1 = this.DOMElement.closest(".range-slider");
        let boundingRect;
        if (test1)
            boundingRect = test1.getBoundingClientRect();
        else throw new Error("sdfsdf");

        //координаты точки поверхности эллипса
        let t = Math.atan2(boundingRect.width * Math.sin(modelData.angleInRad), boundingRect.height * Math.cos(modelData.angleInRad));
        let x = boundingRect.width * Math.cos(t);
        let y = boundingRect.height * Math.sin(t);

        let curLength = new Vector(x, y);
        this.sliderLength = curLength.length;
    }
}

export default SliderContainer;
