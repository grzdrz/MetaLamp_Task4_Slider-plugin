import { View } from "./View.js";

export class InputsView extends View {
    constructor(inputs) {
        super();

        this.firstInputDOMElement = inputs.firstInput;
        this.lastInputDOMElement = inputs.lastInput;

        this.updateInputs = function () { };
        this.updateInputValues2 = function () { };

        this.onFirstInputChange = this.onFirstInputChange.bind(this);
        this.onLastInputChange = this.onLastInputChange.bind(this);
    }

    initialize() {
        this.firstInputDOMElement.addEventListener("change", this.onFirstInputChange);
        this.lastInputDOMElement.addEventListener("change", this.onLastInputChange);
    }

    onFirstInputChange(event) {
        let inputValues = {};
        inputValues.firstValue = event.currentTarget.value;

        this.updateInputValues2(inputValues);
    }
    onLastInputChange(event) {
        let inputValues = {};
        inputValues.lastValue = event.currentTarget.value;

        this.updateInputValues2(inputValues);
    }
}