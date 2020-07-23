import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ModelDataEventArgs from "../../../../Events/ModelDataEventArgs";

class StepSize extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    public build(): void {
        super.build();

        const modelData = this.view.viewManager.getModelData();

        const input = document.createElement("input");
        const text = document.createElement("p");

        input.type = "number";
        input.step = "1";
        input.value = modelData.stepSize.toString();
        input.className = "options__input js-options__input";

        text.className = "options__text";
        text.textContent = "step size";

        this.DOMElement.append(input);
        this.DOMElement.append(text);

        this.DOMElement.addEventListener("change", this.handlerInputChange);

        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const { stepSize } = this.view.viewManager.getModelData();
        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        input.value = `${stepSize}`;
    }

    private handlerInputChange(event: globalThis.Event) {
        event.preventDefault();

        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        let inputValue = Number.parseFloat(input.value);
        if (inputValue <= 0) { // ///
            inputValue = 0.000001;
            input.value = inputValue.toString();
        }

        const optionsToUpdate = {
            stepSize: inputValue,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ModelDataEventArgs(optionsToUpdate));
    }
}

export default StepSize;
