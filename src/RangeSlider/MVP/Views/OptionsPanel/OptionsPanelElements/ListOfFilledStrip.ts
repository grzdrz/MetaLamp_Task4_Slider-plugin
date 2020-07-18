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

        const modelData = this.view.getModelData();

        this.DOMElement.innerHTML = "";
        this.inputsDOMElements = [];

        this.DOMElement.className = "range-slider__filled-strips-inputs-container";

        const filledStripsTitle = document.createElement("p");
        filledStripsTitle.textContent = "Filled strips";
        filledStripsTitle.className = "range-slider__filled-strips-title";

        /* const filledStrips = document.createElement("div"); */
        this.filledStripsContainer.className = "range-slider__filled-strips-inputs";

        const strips = this.view.viewManager.viewData.filledStrips.map((e) => e);
        for (let i = 0; i < modelData.values.length/* strips.length */; i += 1) {
            const valueInput = document.createElement("input");
            valueInput.type = "checkbox";
            this.inputsDOMElements.push(valueInput);
            // const valueInputText = document.createElement("p");

            // valueInputContainer.className = "range-slider__filled-strips-container";
            valueInput.dataset.countNumber = `${i}`;
            valueInput.className = "range-slider__filled-strips-input";
            valueInput.checked = (i >= strips.length ? false : strips[i]);
            /* valueInputText.className = "range-slider__value-input-text";
            valueInputText.textContent = `value ${i + 1}`; */

            // valueInputContainer.append(valueInput);
            // valueInputContainer.append(valueInputText);
            this.filledStripsContainer.append(valueInput);

            valueInput.addEventListener("change", this.handlerValueInputChange);
        }
        this.DOMElement.append(filledStripsTitle);
        this.DOMElement.append(this.filledStripsContainer);
        this.view.containerElement.append(this.DOMElement);

        // this.update(/* false */);
    }

    update(): void {
        const modelData = this.view.getModelData();

        this.inputsDOMElements = [];
        this.filledStripsContainer.innerHTML = "";

        const strips = this.view.viewManager.viewData.filledStrips.map((e) => e);
        for (let i = 0; i < modelData.values.length/* strips.length */; i += 1) {
            const valueInput = document.createElement("input");
            valueInput.type = "checkbox";
            this.inputsDOMElements.push(valueInput);
            // const valueInputText = document.createElement("p");

            // valueInputContainer.className = "range-slider__filled-strips-container";
            valueInput.dataset.countNumber = `${i}`;
            valueInput.className = "range-slider__filled-strips-input";
            valueInput.checked = (i >= strips.length ? false : strips[i]);
            /* valueInputText.className = "range-slider__value-input-text";
            valueInputText.textContent = `value ${i + 1}`; */

            // valueInputContainer.append(valueInput);
            // valueInputContainer.append(valueInputText);
            this.filledStripsContainer.append(valueInput);

            valueInput.addEventListener("change", this.handlerValueInputChange);
        }

        // const strips = this.view.viewManager.viewData.filledStrips.map((e) => e);
        // if (_neededFullRerender) this.render();
        this.inputsDOMElements.forEach((e, i) => {
            e.checked = strips[i];
        });
    }

    handlerValueInputChange(event: globalThis.Event): void {
        // const modelData = this.getModelData();

        const strips = this.view.viewManager.viewData.filledStrips.map((e) => e);
        this.inputsDOMElements.forEach((e, i) => {
            const value = e.checked;
            strips[i] = value;
        });

        /* this.onInputsChange.invoke(new OptionsToUpdateEventArgs({ filledStrips: strips })); */
        this.view.onViewStateUpdate.invoke(new ViewDataEventArgs({ filledStrips: strips }));
    }
}

export default ListOfFilledStrip;
