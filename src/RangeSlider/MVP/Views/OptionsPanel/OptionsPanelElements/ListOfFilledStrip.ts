import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ViewDataEventArgs from "../../../../Events/ViewDataEventArgs";

class ListOfFilledStrip extends OptionPanelElement {
    public inputsDOMElements: HTMLInputElement[] = new Array<HTMLInputElement>();

    public filledStripsContainer: HTMLElement;

    constructor(view: OptionsPanelView) {
        super(view);

        this.filledStripsContainer = document.createElement("div");
        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    public build(): void {
        super.build();

        this.DOMElement.innerHTML = "";
        this.inputsDOMElements = [];

        this.DOMElement.className = `${this.DOMElement.className} options__cheackboxes-container`;

        const filledStripsTitle = document.createElement("p");
        filledStripsTitle.textContent = "Filled strips";
        filledStripsTitle.className = "options__title";
        this.filledStripsContainer.className = "options__inputs";

        const { filledStrips } = this.view.viewManager.viewData;
        for (let i = 0; i < filledStrips.length; i += 1) {
            const valueInput = document.createElement("input");
            valueInput.type = "checkbox";
            this.inputsDOMElements.push(valueInput);

            valueInput.dataset.countNumber = `${i}`;
            valueInput.className = "options__checkbox-input js-options__input js-options__filled-strips-checkbox-input";
            valueInput.checked = filledStrips[i];

            this.filledStripsContainer.append(valueInput);

            valueInput.addEventListener("change", this.handlerInputChange);
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
            valueInput.className = "options__checkbox-input js-options__input";
            valueInput.checked = filledStrips[i];

            this.filledStripsContainer.append(valueInput);

            valueInput.addEventListener("change", this.handlerInputChange);
        }

        this.inputsDOMElements.forEach((e, i) => {
            e.checked = filledStrips[i];
        });
    }

    handlerInputChange(): void {
        const { filledStrips } = this.view.viewManager.viewData;
        this.inputsDOMElements.forEach((e, i) => {
            const value = e.checked;
            filledStrips[i] = value;
        });

        this.view.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs({ filledStrips }));
    }
}

export default ListOfFilledStrip;
