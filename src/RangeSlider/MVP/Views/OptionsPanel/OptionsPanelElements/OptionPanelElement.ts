import OptionsPanelView from "../OptionsPanelView";

abstract class OptionPanelElement {
    public DOMElement: HTMLElement;

    constructor(public view: OptionsPanelView) {
        this.DOMElement = document.createElement("div");
    }

    public build(): void {
        this.DOMElement.innerHTML = "";
    }

    abstract update(): void;
}

export default OptionPanelElement;
