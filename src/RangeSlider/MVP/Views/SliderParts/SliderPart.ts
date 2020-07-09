import { Vector } from "../../../Helpers/Vector";
import { SliderView } from "../SliderView";

export class SliderPart {
    public DOMElement: HTMLElement;
    public view: SliderView;

    public position: Vector;
    public size: Vector;

    constructor(view: SliderView, DOMElement: HTMLElement) {
        this.DOMElement = DOMElement;
        this.view = view;

        this.position = new Vector(0, 0);

        let partBoundingRect = this.DOMElement.getBoundingClientRect();
        this.size = new Vector(partBoundingRect.width, partBoundingRect.height);
        //позиция и размер в пикселях
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        this.renderPosition();
    }

    setPosition(position: Vector) {
        this.position.x = position.x;
        this.position.y = position.y;

        this.renderPosition();
    }

    setSize(size: Vector) {
        this.size.width = size.width;
        this.size.height = size.height;

        this.renderSize();
    }

    renderPosition() {
        this.view.setPosition(this.DOMElement, this.position);
    }

    renderSize() {
        this.view.setSize(this.DOMElement, this.size);
    }
}