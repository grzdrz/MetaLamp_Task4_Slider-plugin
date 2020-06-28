import { View } from "./View.js";

export class InputsView extends View {
    constructor(inputs) {
        super();

        this.firstInputDOMElement = inputs.firstInput;
        this.lastInputDOMElement = inputs.lastInput;

        this.getModelData = () => { };
        this.updateSliders = () => { };

        this.onFirstInputChange = this.onFirstInputChange.bind(this);
        this.onLastInputChange = this.onLastInputChange.bind(this);
    }

    initialize() {
        this.firstInputDOMElement.addEventListener("change", this.onFirstInputChange);
        this.lastInputDOMElement.addEventListener("change", this.onLastInputChange);
        this.update(this.getModelData());
    }

    update(data) {
        data.firstValue || data.firstValue === 0 ? this.firstInputDOMElement.value = data.firstValue : this.firstInputDOMElement.value;
        data.lastValue || data.lastValue === 0 ? this.lastInputDOMElement.value = data.lastValue : this.lastInputDOMElement.value;
    }

    onFirstInputChange(event) {
        let modelData = this.getModelData();

        let value = Number.parseFloat(event.currentTarget.value);
        if (!value && value !== 0) {
            value = modelData.minValue;
        }

        if (value > modelData.maxValue || value > modelData.lastValue)
            value = modelData.lastValue;

        else if (value < modelData.minValue)
            value = modelData.minValue;

        event.currentTarget.value = value;
        this.updateSliders({ firstValue: value });
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
        this.updateSliders({ lastValue: value });
    }
}