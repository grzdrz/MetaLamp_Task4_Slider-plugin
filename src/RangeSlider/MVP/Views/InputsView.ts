import View from "./View";
import Event from "../../Events/Event";
import OptionsToUpdateEventArgs from "../../Events/OptionsToUpdateEventArgs";

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

    public initialize(): void {
        this.render();
    }

    public update(_neededFullRerender: boolean): void {
        const modelData = this.getModelData();

        if (!this.firstInputDOMElement) { throw new Error("this.firstInputDOMElement not exist"); }
        this.firstInputDOMElement.value = (modelData.firstValue !== undefined ? (modelData.firstValue).toString() : this.firstInputDOMElement.value);
        if (this.lastInputDOMElement) {
            this.lastInputDOMElement.value = (modelData.lastValue !== undefined ? (modelData.lastValue).toString() : this.lastInputDOMElement.value);
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

        if (modelData.hasTwoSlider) {
            if (value > modelData.maxValue || value > modelData.lastValue) {
                value = modelData.lastValue;
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

        (<HTMLInputElement>targetElement).value = value.toString();
        this.onInputsChange.invoke(new OptionsToUpdateEventArgs({ firstValue: value }));
    }

    private handlerLastInputChange(event: globalThis.Event) {
        const modelData = this.getModelData();

        const targetElement = event.currentTarget;
        if (!targetElement) { throw new Error(); }
        let value = Number.parseFloat((<HTMLInputElement>targetElement).value);
        if (!value && value !== 0) {
            value = modelData.maxValue;
        }

        if (value > modelData.maxValue) {
            value = modelData.maxValue;
        } else if (value < modelData.minValue || value < modelData.firstValue) {
            value = modelData.firstValue;
        }

        (<HTMLInputElement>targetElement).value = value.toString();
        this.onInputsChange.invoke(new OptionsToUpdateEventArgs({ lastValue: value }));
    }
}

export default InputsView;
