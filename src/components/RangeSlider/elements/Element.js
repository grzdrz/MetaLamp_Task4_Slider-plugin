export class Element {
    constructor(view, DOMElement) {
        this.DOMElement = DOMElement;
        this.view = view;

        this.position = { x: 0, y: 0 };// под позицией имеется ввиду левый маргин относительно контейнера
        this.size = this.DOMElement.getBoundingClientRect();
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        this.renderPosition();
    }

    setPosition(position) {
        position.x !== undefined ? this.position.x = position.x : this.position.x;
        position.y !== undefined ? this.position.y = position.y : this.position.y;

        this.renderPosition();
    }

    setSize(size) {
        size.width !== undefined ? this.size.width = size.width : this.size.width;
        size.height !== undefined ? this.size.height = size.height : this.size.height;

        this.renderSize();
    }

    renderPosition() {
        this.view.setMargin(this.DOMElement, this.position);
    }

    renderSize() {
        this.view.setSize(this.DOMElement, this.size);
    }
}