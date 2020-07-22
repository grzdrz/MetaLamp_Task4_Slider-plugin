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

        this.DOMElement.innerHTML = "";
        this.inputsDOMElements = [];

        this.DOMElement.className = "range-slider__filled-strips-inputs-container";

        const filledStripsTitle = document.createElement("p");
        filledStripsTitle.textContent = "Filled strips";
        filledStripsTitle.className = "range-slider__filled-strips-title";
        this.filledStripsContainer.className = "range-slider__filled-strips-inputs";

        const { filledStrips } = this.view.viewManager.viewData;
        for (let i = 0; i < filledStrips.length; i += 1) {
            const valueInput = document.createElement("input");
            valueInput.type = "checkbox";
            this.inputsDOMElements.push(valueInput);

            valueInput.dataset.countNumber = `${i}`;
            valueInput.className = "range-slider__filled-strips-input";
            valueInput.checked = filledStrips[i];

            this.filledStripsContainer.append(valueInput);

            valueInput.addEventListener("change", this.handlerValueInputChange);
        }
        this.DOMElement.append(filledStripsTitle);
        this.DOMElement.append(this.filledStripsContainer);
        this.view.containerElement.append(this.DOMElement);
    }

    update(): void {
        this.inputsDOMElements = [];
        this.filledStripsContainer.innerHTML = "";

        const { filledStrips } = this.view.viewManager.viewData;
        for (let i = 0; i < filledStrips.length; i += 1) {
            const valueInput = document.createElement("input");
            valueInput.type = "checkbox";
            this.inputsDOMElements.push(valueInput);

            valueInput.dataset.countNumber = `${i}`;
            valueInput.className = "range-slider__filled-strips-input";
            valueInput.checked = filledStrips[i];

            this.filledStripsContainer.append(valueInput);

            valueInput.addEventListener("change", this.handlerValueInputChange);
        }

        this.inputsDOMElements.forEach((e, i) => {
            e.checked = filledStrips[i];
        });
    }

    handlerValueInputChange(): void {
        const { filledStrips } = this.view.viewManager.viewData;
        this.inputsDOMElements.forEach((e, i) => {
            const value = e.checked;
            filledStrips[i] = value;
        });

        this.view.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs({ filledStrips }));
    }
}

export default ListOfFilledStrip;
