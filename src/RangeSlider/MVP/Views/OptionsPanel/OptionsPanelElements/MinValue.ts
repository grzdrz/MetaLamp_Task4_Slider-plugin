import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ModelDataEventArgs from "../../../../Events/ModelDataEventArgs";

class MinValue extends OptionPanelElement {
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
        input.step = modelData.stepSize.toString();
        input.value = modelData.minValue.toString();
        input.max = (modelData.maxValue + modelData.stepSize).toString();
        input.min = (modelData.minValue - modelData.stepSize).toString();
        input.className = "options__input js-options__input";

        text.className = "options__text";
        text.textContent = "min value";

        this.DOMElement.append(input);
        this.DOMElement.append(text);

        this.DOMElement.addEventListener("change", this.handlerInputChange);

        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const modelData = this.view.viewManager.getModelData();

        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        input.step = modelData.stepSize.toString();
        input.value = modelData.minValue.toString();
        input.max = (modelData.maxValue + modelData.stepSize).toString();
        input.min = (modelData.minValue - modelData.stepSize).toString();
    }

    private handlerInputChange(event: globalThis.Event) {
        event.preventDefault();

        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        const inputValue = Number.parseFloat(input.value);

        const optionsToUpdate = {
            minValue: inputValue,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ModelDataEventArgs(optionsToUpdate));
    }
}

export default MinValue;
