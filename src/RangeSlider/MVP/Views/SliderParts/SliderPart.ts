import { Vector } from "../../../Helpers/Vector";
import { SliderView } from "../SliderView";

export abstract class SliderPart {
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
        this.view.renderPosition(this.DOMElement, position);
    }

    setSize(size: Vector) {
        this.view.renderSize(this.DOMElement, size);
    }
}