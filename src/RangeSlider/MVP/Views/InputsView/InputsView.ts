import View from "../View";
import Event from "../../../Events/Event";
import OptionsToUpdateEventArgs from "../../../Events/OptionsToUpdateEventArgs";
import ViewManager from "../ViewManager";

class InputsView extends View {
    public firstInputDOMElement: HTMLInputElement | undefined;

    public lastInputDOMElement: HTMLInputElement | undefined;

    public onInputsChange: Event;

    constructor(containerElement: HTMLElement, viewManager: ViewManager) {
        super(containerElement, viewManager);

        this.handlerFirstInputChange = this.handlerFirstInputChange.bind(this);
        this.handlerLastInputChange = this.handlerLastInputChange.bind(this);

        this.onInputsChange = new Event();
    }

    public initialize(): void {
        this.render();
    }

    public update(_neededFullRerender: boolean): void {
        const modelData = this.getModelData();

        const values = modelData.values.map((e) => e);
        if (!this.firstInputDOMElement) { throw new Error("this.firstInputDOMElement not exist"); }
        this.firstInputDOMElement.value = (/* modelData.firstValue */values[0] !== undefined ? (/* modelData.firstValue */values[0]).toString() : this.firstInputDOMElement.value);
        if (this.lastInputDOMElement) {
            this.lastInputDOMElement.value = (/* modelData.lastValue */values[1] !== undefined ? (/* modelData.lastValue */values[1]).toString() : this.lastInputDOMElement.value);
        }
    }

    public render(): void {
        const modelData = this.getModelData();

        const firstInputContainer = document.createElement("div");
        this.firstInputDOMElement = document.createElement("input");
        const firstInputText = document.createElement("p");

        firstInputContainer.className = "range-slider__first-input-container";
        this.firstInputDOMElement.className = "range-slider__first-input";
        firstInputText.className = "range-slider__input-text";
        firstInputText.textContent = "first value";

        firstInputContainer.append(this.firstInputDOMElement);
        firstInputContainer.append(firstInputText);
        this.containerElement.append(firstInputContainer);

        if (modelData.hasTwoSlider) {
            const lastInputContainer = document.createElement("div");
            this.lastInputDOMElement = document.createElement("input");
            const lastInputText = document.createElement("p");

            lastInputContainer.className = "range-slider__last-input-container";
            this.lastInputDOMElement.className = "range-slider__last-input";
            lastInputText.className = "range-slider__input-text";
            lastInputText.textContent = "last value";

            lastInputContainer.append(this.lastInputDOMElement);
            lastInputContainer.append(lastInputText);
            this.containerElement.append(lastInputContainer);
        }

        this.firstInputDOMElement.addEventListener("change", this.handlerFirstInputChange);
        if (this.lastInputDOMElement) {
            this.lastInputDOMElement.addEventListener("change", this.handlerLastInputChange);
        }

        this.update(false);
    }

    handlerFirstInputChange(event: globalThis.Event) {
        const modelData = this.getModelData();

        const targetElement = event.currentTarget;
        if (!targetElement) { throw new Error(); }
        let value = Number.parseFloat((<HTMLInputElement>targetElement).value);
        if (!value && value !== 0) {
            value = modelData.minValue;
        }

        const values = modelData.values.map((e) => e);
        if (/* modelData.hasTwoSlider */values.length > 1) {
            if (value > modelData.maxValue || value > values[1]/* modelData.lastValue */) {
                value = /* modelData.lastValue */values[1];
            } else if (value < modelData.minValue) {
                value = modelData.minValue;
            }
        } else {
            if (value > modelData.maxValue) {
                value = modelData.maxValue;
            } else if (value < modelData.minValue) {
                value = modelData.minValue;
            }
        }

        values[0] = value;
        (<HTMLInputElement>targetElement).value = value.toString();
        this.onInputsChange.invoke(new OptionsToUpdateEventArgs({ values: values/* firstValue: value */ }));
    }

    private handlerLastInputChange(event: globalThis.Event) {
        const modelData = this.getModelData();

        const targetElement = event.currentTarget;
        if (!targetElement) { throw new Error(); }
        let value = Number.parseFloat((<HTMLInputElement>targetElement).value);
        if (!value && value !== 0) {
            value = modelData.maxValue;
        }

        const values = modelData.values.map((e) => e);
        if (value > modelData.maxValue) {
            value = modelData.maxValue;
        } else if (value < modelData.minValue || value < values[0]/* modelData.firstValue */) {
            value = /* modelData.firstValue */values[0];
        }

        values[1] = value;
        (<HTMLInputElement>targetElement).value = value.toString();
        this.onInputsChange.invoke(new OptionsToUpdateEventArgs({ values: values/* lastValue: value */ }));
    }
}

export default InputsView;
