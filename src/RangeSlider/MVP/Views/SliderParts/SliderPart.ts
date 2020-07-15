import Vector from "../../../Helpers/Vector";
import SliderView from "../SliderView";
import View from "../View";

abstract class SliderPart {
    public DOMElement: HTMLElement;

    public view: SliderView;

    constructor(view: SliderView) {
        this.view = view;

        this.DOMElement = document.createElement("div");//заглушка
    }

    abstract initialize(): void;

    abstract buildDOMElement(): void;

    abstract render(): void;

    setPosition(position: Vector) {
        View.renderPosition(this.DOMElement, position);
    }

    setSize(size: Vector) {
        View.renderSize(this.DOMElement, size);
    }
}

export default SliderPart;
