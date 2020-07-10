import { View } from "./View";
import { Event } from "../../Events/Event";
import { OptionsEventArgs, OptionsToUpdateEventArgs, EventArgs } from "../../Events/EventArgs";

class InputsView extends View {
    public containerElement: HTMLElement;
    public firstInputDOMElement: HTMLInputElement | undefined;
    public lastInputDOMElement: HTMLInputElement | undefined;

    public onInputsChange: Event;

    constructor(inputsContainer: HTMLElement) {
        super();

        this.containerElement = inputsContainer;

        this.handlerFirstInputChange = this.handlerFirstInputChange.bind(this);
        this.handlerLastInputChange = this.handlerLastInputChange.bind(this);

        this.onInputsChange = new Event();
    }

    initialize() {
        this.render();
    }

    update(neededFullRerender: boolean) {
        let modelData = this.getModelData();

        if (!this.firstInputDOMElement) throw new Error("this.firstInputDOMElement not exist");
        modelData.firstValue !== undefined ? this.firstInputDOMElement.value = (modelData.firstValue).toString() : this.firstInputDOMElement.value;
        if (this.lastInputDOMElement)
            modelData.lastValue !== undefined ? this.lastInputDOMElement.value = (modelData.lastValue).toString() : this.lastInputDOMElement.value;
    }

    render() {
        let modelData = this.getModelData();

        this.firstInputDOMElement = document.createElement("input");
        this.firstInputDOMElement.className = "range-slider__first-input";
        this.containerElement.append(this.firstInputDOMElement);
        if (modelData.hasTwoSlider) {
            this.lastInputDOMElement = document.createElement("input");
            this.lastInputDOMElement.className = "range-slider__last-input";
            this.containerElement.append(this.lastInputDOMElement);
        }

        this.firstInputDOMElement.addEventListener("change", this.handlerFirstInputChange);
        if (this.lastInputDOMElement)
            this.lastInputDOMElement.addEventListener("change", this.handlerLastInputChange);

        this.update(false);
    }

    handlerFirstInputChange(event: globalThis.Event) {
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
        this.onInputsChange.invoke(new OptionsToUpdateEventArgs({ firstValue: value }));
    }

    handlerLastInputChange(event: globalThis.Event) {
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
        this.onInputsChange.invoke(new OptionsToUpdateEventArgs({ lastValue: value }));
    }
}

export { InputsView };