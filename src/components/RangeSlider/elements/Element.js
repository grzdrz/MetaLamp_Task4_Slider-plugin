export class Element{
    constructor(controller, DOMElement){//под позицией имеется ввиду левый маргин относительно контейнера
        this.DOMElement = DOMElement;
        this.controller = controller;

        this.position = {};
        this.size = this.DOMElement.getBoundingClientRect();
    }

    setPosition() {
        this.controller.view.setLeftMargin(this.DOMElement, this.position.x);
    }
}