import { Vector } from "../../../Helpers/Vector";
import { SliderView } from "../SliderView";

export class SliderPart {
    public DOMElement: HTMLElement;
    public view: SliderView;

    public position: Vector;
    public size: Vector;

    constructor(view: SliderView) {
        this.view = view;

        this.DOMElement = document.createElement("div");//заглушка

        this.position = new Vector(0, 0);
        this.size = new Vector(0, 0);
    }

    initialize() {
        this.position = new Vector(0, 0);
        let partBoundingRect = this.DOMElement.getBoundingClientRect();
        this.size = new Vector(partBoundingRect.width, partBoundingRect.height);

        this.render();
    }

    buildDOMElement(){

    }

    render() {
        this.view.renderPosition(this.DOMElement, this.position);
        this.view.renderSize(this.DOMElement, this.size);
    }

    setPosition(position: Vector) {
        this.position.x = position.x;
        this.position.y = position.y;

        this.view.renderPosition(this.DOMElement, this.position);
    }

    setSize(size: Vector) {
        this.size.width = size.width;
        this.size.height = size.height;

        this.view.renderSize(this.DOMElement, this.size);
    }
}