import SliderPart from "./SliderPart";
import Vector from "../../../../Helpers/Vector";

class EmptyStrip extends SliderPart {
    public build(): void {
        super.build();

        this.element.className = "range-slider__empty-strip";
        this.view.containerElement.append(this.element);
    }

    public update(): void {
        const {
            sliderLength,
            handleHeight,
            sliderStripThickness,
        } = this.view.viewManager.data;

        this.rotate();

        const size = new Vector(sliderLength, sliderStripThickness);
        const position = new Vector(0, handleHeight / 2 - (sliderStripThickness) / 2);
        this.setSize(size);
        this.setPosition(position);
    }

    private rotate(): void {
        const {
            handleWidth,
            angle,
            sliderStripThickness,
        } = this.view.viewManager.data;

        const transformOriginX = handleWidth / 2;
        const transformOriginY = sliderStripThickness / 2;
        this.element.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`;
        this.element.style.transform = `rotate(${-angle}deg)`;// минус из-за нестандартного направления обхода функции rotate
    }
}

export default EmptyStrip;
