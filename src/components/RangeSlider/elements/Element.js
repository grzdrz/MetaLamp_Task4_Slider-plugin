export class Element {
    constructor(view, DOMElement) {//под позицией имеется ввиду левый маргин относительно контейнера
        this.DOMElement = DOMElement;
        this.view = view;

        this.position = {};
        this.size = this.DOMElement.getBoundingClientRect();
    }

    calculatePosition() {
        this.renderPosition();
    }

    setPosition(position){
        position.x || position.x === 0 ? this.position.x = position.x : this.position.x;
        position.y || position.y === 0 ? this.position.y = position.y : this.position.y;

        this.renderPosition();
    }

    setSize(size){
        size.width || size.width === 0 ? this.size.width = size.width : this.size.width;
        size.height || size.height === 0 ? this.size.height = size.height : this.size.height;
        //0 неявно приводится к false, поэтому его наличие проверяем отдельно

        this.renderSize();
    }

    renderPosition() {
        this.view.setLeftMargin(this.DOMElement, this.position.x);
    }

    renderSize() {
        this.view.setSize(this.DOMElement, this.size.width);
    }
}