import { OptionsPanelView } from "../OptionsPanelView";

export abstract class OptionPanelElement {
    public DOMElement: HTMLElement;

    constructor(public view: OptionsPanelView) {
        this.DOMElement = document.createElement("div");
    }

    build() {
        this.DOMElement.innerHTML = "";
    }

    abstract update(): void;
}