import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ModelDataEventArgs from "../../../../Events/ModelDataEventArgs";

class HandlesCount extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerHandlsCountChange = this.handlerHandlsCountChange.bind(this);
    }

    public build(): void {
        super.build();

        const modelData = this.view.getModelData();

        const handlesCountLabel = document.createElement("label");
        const handlesCountInput = document.createElement("input");
        const maxValueText = document.createElement("p");

        handlesCountLabel.className = "range-slider__inputs-label";

        handlesCountInput.type = "number";
        handlesCountInput.step = "1";
        handlesCountInput.value = modelData.values.length.toString();
        // handlesCountInput.max = ;
        handlesCountInput.min = "1";
        handlesCountInput.className = "range-slider__handles-count-input";

        maxValueText.className = "range-slider__handles-count-text";
        maxValueText.textContent = "handles count";

        handlesCountLabel.addEventListener("change", this.handlerHandlsCountChange);

        handlesCountLabel.append(handlesCountInput);
        handlesCountLabel.append(maxValueText);

        this.DOMElement.append(handlesCountLabel);
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void { }

    private handlerHandlsCountChange(event: globalThis.Event) {
        event.preventDefault();

        if (!event.currentTarget) throw new Error("some shit with handls count change event");
        const currentInput = (<HTMLElement>event.currentTarget).querySelector(".range-slider__handles-count-input");
        if (!currentInput) throw new Error("some shit with handls count change event");
        const handlesCount = (<HTMLInputElement>currentInput).value;
        if (!handlesCount) throw new Error("some shit with handls count change event");
        const handlesCountNumber = Number.parseInt(handlesCount, 10);

        const modelData = this.view.getModelData();
        const values = [];
        for (let i = 0; i < handlesCountNumber; i += 1) {
            if (i < modelData.values.length) values.push(modelData.values[i]);
            else values.push(modelData.maxValue);
        }
        const optionsToUpdate = { values };

        this.view.onModelStateUpdate.invoke(new ModelDataEventArgs(optionsToUpdate));
    }
}

export default HandlesCount;
