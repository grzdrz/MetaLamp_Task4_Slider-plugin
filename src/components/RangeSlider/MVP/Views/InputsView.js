import { View } from "./View.js";

export class InputsView extends View {
    constructor(baseModelData, inputsContainer) {
        super();

        this.inputsContainer = inputsContainer;

        this.firstInputDOMElement = document.createElement("input");
        this.firstInputDOMElement.className = "range-slider__first-input";
        this.inputsContainer.append(this.firstInputDOMElement);
        if (baseModelData.hasTwoSlider) {
            this.lastInputDOMElement = document.createElement("input");
            this.lastInputDOMElement.className = "range-slider__last-input";
            this.inputsContainer.append(this.lastInputDOMElement);
        }

        this.onInputChange = () => { };

        this.onFirstInputChange = this.onFirstInputChange.bind(this);
        if (baseModelData.hasTwoSlider) {
            this.onLastInputChange = this.onLastInputChange.bind(this);
        }
    }

    initialize() {
        this.firstInputDOMElement.addEventListener("change", this.onFirstInputChange);
        if (this.lastInputDOMElement)
            this.lastInputDOMElement.addEventListener("change", this.onLastInputChange);
        this.update(this.getModelData());
    }

    update() {
        let data = this.getModelData();
        data.firstValue !== undefined ? this.firstInputDOMElement.value = data.firstValue : this.firstInputDOMElement.value;
        if (this.lastInputDOMElement)
            data.lastValue !== undefined ? this.lastInputDOMElement.value = data.lastValue : this.lastInputDOMElement.value;
    }

    onFirstInputChange(event) {
        let modelData = this.getModelData();

        let value = Number.parseFloat(event.currentTarget.value);
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

        event.currentTarget.value = value;
        this.onInputChange({
            firstValue: value
        });
    }
    onLastInputChange(event) {
        let modelData = this.getModelData();

        let value = Number.parseFloat(event.currentTarget.value);
        if (!value && value !== 0) {
            value = modelData.maxValue;
        }

        if (value > modelData.maxValue)
            value = modelData.maxValue;
        else if (value < modelData.minValue || value < modelData.firstValue)
            value = modelData.firstValue;

        event.currentTarget.value = value;
        this.onInputChange({
            lastValue: value
        });
    }
}