import { Vector } from "../../../Helpers/Vector.js";

export class SliderPart {
    constructor(view, DOMElement) {
        this.DOMElement = DOMElement;
        this.view = view;

        this.position = new Vector(0, 0);// под позицией имеется ввиду левый маргин относительно контейнера
        let partBoundingRect = this.DOMElement.getBoundingClientRect();
        this.size = new Vector(partBoundingRect.width, partBoundingRect.height);
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        this.renderPosition();
    }

    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;

        this.renderPosition();
    }

    setSize(size) {
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