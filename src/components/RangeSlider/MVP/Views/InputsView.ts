import { View } from "./View";

class InputsView extends View {
    public containerElement: HTMLElement;
    public firstInputDOMElement: HTMLElement = new HTMLElement();
    public lastInputDOMElement: HTMLElement = new HTMLElement();

    constructor(inputsContainer) {
        super();

        this.containerElement = inputsContainer;

        this.onInputChange = () => { };

        this.onFirstInputChange = this.onFirstInputChange.bind(this);
        this.onLastInputChange = this.onLastInputChange.bind(this);

    }

    initialize() {
        this._render();
    }

    update() {
        let modelData = this.getModelData();
        modelData.firstValue !== undefined ? this.firstInputDOMElement.value = modelData.firstValue : this.firstInputDOMElement.value;
        if (this.lastInputDOMElement)
            modelData.lastValue !== undefined ? this.lastInputDOMElement.value = modelData.lastValue : this.lastInputDOMElement.value;
    }

    _render() {
        let modelData = this.getModelData();

        this.firstInputDOMElement = document.createElement("input");
        this.firstInputDOMElement.className = "range-slider__first-input";
        this.containerElement.append(this.firstInputDOMElement);
        if (modelData.hasTwoSlider) {
            this.lastInputDOMElement = document.createElement("input");
            this.lastInputDOMElement.className = "range-slider__last-input";
            this.containerElement.append(this.lastInputDOMElement);
        }

        this.firstInputDOMElement.addEventListener("change", this.onFirstInputChange);
        if (this.lastInputDOMElement)
            this.lastInputDOMElement.addEventListener("change", this.onLastInputChange);

        this.update();
    }

    onFirstInputChange(event: Event) {
        let modelData = this.getModelData();

        let targetElement = event.currentTarget;
        if (!targetElement)
            throw new Error();
        let value = Number.parseFloat((<HTMLInputElement>targetElement).value);
        if (!value && value !== 0) {
            value = modelData.minValue;
        }

        if (modelData.hasTwoSlider) {
            if (value > modelData.maxValue || value > modelData.lastValue)
                value = modelData.lastValue;
            else if (value < modelData.minValue)
                value = modelData.minValue;
        }
        else {
            if (value > modelData.maxValue)
                value = modelData.maxValue;
            else if (value < modelData.minValue)
                value = modelData.minValue;
        }

        (<HTMLInputElement>targetElement).value = value.toString();
        this.onInputChange({
            firstValue: value
        });
    }

    onLastInputChange(event: Event) {
        let modelData = this.getModelData();

        let targetElement = event.currentTarget;
        if (!targetElement)
            throw new Error();
        let value = Number.parseFloat((<HTMLInputElement>targetElement).value);
        if (!value && value !== 0) {
            value = modelData.maxValue;
        }

        if (value > modelData.maxValue)
            value = modelData.maxValue;
        else if (value < modelData.minValue || value < modelData.firstValue)
            value = modelData.firstValue;

        (<HTMLInputElement>targetElement).value = value.toString();
        this.onInputChange({
            lastValue: value
        });
    }
}

export { InputsView };