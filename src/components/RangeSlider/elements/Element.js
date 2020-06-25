export class Element{
    constructor(view, DOMElement){//под позицией имеется ввиду левый маргин относительно контейнера
        this.DOMElement = DOMElement;
        this.view = view;

        this.position = {};
        this.size = this.DOMElement.getBoundingClientRect();
    }

    setPosition() {
        this.view.setLeftMargin(this.DOMElement, this.position.x);
    }

    setSize(size) {
        this.size = size;
        this.view.setSize(this.DOMElement, this.size.width);
    }
}