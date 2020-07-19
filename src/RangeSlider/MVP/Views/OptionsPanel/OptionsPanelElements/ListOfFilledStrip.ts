import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ViewDataEventArgs from "../../../../Events/ViewDataEventArgs";

class ListOfFilledStrip extends OptionPanelElement {
    public inputsDOMElements: HTMLInputElement[] = new Array<HTMLInputElement>();

    public filledStripsContainer: HTMLElement;

    constructor(view: OptionsPanelView) {
        super(view);

        this.filledStripsContainer = document.createElement("div");
        this.handlerValueInputChange = this.handlerValueInputChange.bind(this);
    }

    public build(): void {
        super.build();

        // const modelData = this.view.getModelData();

        this.DOMElement.innerHTML = "";
        this.inputsDOMElements = [];

        this.DOMElement.className = "range-slider__filled-strips-inputs-container";

        const filledStripsTitle = document.createElement("p");
        filledStripsTitle.textContent = "Filled strips";
        filledStripsTitle.className = "range-slider__filled-strips-title";
        this.filledStripsContainer.className = "range-slider__filled-strips-inputs";

        const strips = this.view.viewManager.viewData.filledStrips.map((e) => e);
        for (let i = 0; i < strips.length/* modelData.values.length + 1 */; i += 1) {
            const valueInput = document.createElement("input");
            valueInput.type = "checkbox";
            this.inputsDOMElements.push(valueInput);

            valueInput.dataset.countNumber = `${i}`;
            valueInput.className = "range-slider__filled-strips-input";
            valueInput.checked = strips[i]/* (i >= strips.length ? false : strips[i]) */;

            this.filledStripsContainer.append(valueInput);

            valueInput.addEventListener("change", this.handlerValueInputChange);
        }
        this.DOMElement.append(filledStripsTitle);
        this.DOMElement.append(this.filledStripsContainer);
        this.view.containerElement.append(this.DOMElement);
    }

    update(): void {
        // const modelData = this.view.getModelData();

        this.inputsDOMElements = [];
        this.filledStripsContainer.innerHTML = "";

        const strips = this.view.viewManager.viewData.filledStrips.map((e) => e);
        for (let i = 0; i < strips.length/* modelData.values.length + 1 */; i += 1) {
            const valueInput = document.createElement("input");
            valueInput.type = "checkbox";
            this.inputsDOMElements.push(valueInput);

            valueInput.dataset.countNumber = `${i}`;
            valueInput.className = "range-slider__filled-strips-input";
            valueInput.checked = strips[i]/* (i >= strips.length ? false : strips[i]) */;

            this.filledStripsContainer.append(valueInput);

            valueInput.addEventListener("change", this.handlerValueInputChange);
        }

        this.inputsDOMElements.forEach((e, i) => {
            e.checked = strips[i];
        });
    }

    handlerValueInputChange(event: globalThis.Event): void {
        const strips = this.view.viewManager.viewData.filledStrips.map((e) => e);
        this.inputsDOMElements.forEach((e, i) => {
            const value = e.checked;
            strips[i] = value;
        });

        this.view.onViewStateUpdate.invoke(new ViewDataEventArgs({ filledStrips: strips }));
    }
}

export default ListOfFilledStrip;
