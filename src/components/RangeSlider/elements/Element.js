export class Element{
    constructor(controller, DOMElement, position, size){
        this.DOMElement = DOMElement;
        this.position = position;
        this.size = size;

        this.controller = controller;
    }
}