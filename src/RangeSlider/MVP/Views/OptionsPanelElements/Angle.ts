import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import OptionsToUpdateEventArgs from "../../../Events/OptionsToUpdateEventArgs";

class Angle extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerAngleSizeChange = this.handlerAngleSizeChange.bind(this);
    }

    build() {
        super.build();

        let modelData = this.view.getModelData();

        let angleSizeLabel = document.createElement("label");

        angleSizeLabel.className = "range-slider__inputs-label";

        let angleSizeCountInput = document.createElement("input");
        angleSizeCountInput.type = "number";
        angleSizeCountInput.step = "1";
        angleSizeCountInput.value = modelData.angle.toString();
        angleSizeCountInput.className = "range-slider__angle-size-input";

        let angleSizeCountText = document.createElement("p");
        angleSizeCountText.className = "range-slider__angle-size-text";
        angleSizeCountText.textContent = "angle size";

        angleSizeLabel.append(angleSizeCountInput);
        angleSizeLabel.append(angleSizeCountText);

        angleSizeLabel.addEventListener("change", this.handlerAngleSizeChange);

        this.DOMElement.append(angleSizeLabel);
        this.view.containerElement.append(this.DOMElement);
    }

    update() {

    }

    private handlerAngleSizeChange(event: globalThis.Event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with angle size change event");
        let input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        let inputValue = Number.parseInt(input.value);

        if (inputValue > 90) inputValue = 90;
        else if (inputValue < 0 || inputValue === undefined) inputValue = 0;

        input.value = inputValue.toString();

        let optionsToUpdate = {
            angle: inputValue,
        };

        this.view.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
}

export default Angle;
