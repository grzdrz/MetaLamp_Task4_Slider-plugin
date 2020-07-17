import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ViewDataEventArgs from "../../../../Events/ViewDataEventArgs";

class Angle extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerAngleSizeChange = this.handlerAngleSizeChange.bind(this);
    }

    public build(): void {
        super.build();

        const { angle } = this.view.viewManager.viewData;

        const angleSizeLabel = document.createElement("label");

        angleSizeLabel.className = "range-slider__inputs-label";

        const angleSizeCountInput = document.createElement("input");
        angleSizeCountInput.type = "number";
        angleSizeCountInput.step = "1";
        angleSizeCountInput.value = angle.toString();
        angleSizeCountInput.className = "range-slider__angle-size-input";

        const angleSizeCountText = document.createElement("p");
        angleSizeCountText.className = "range-slider__angle-size-text";
        angleSizeCountText.textContent = "angle size";

        angleSizeLabel.append(angleSizeCountInput);
        angleSizeLabel.append(angleSizeCountText);

        angleSizeLabel.addEventListener("change", this.handlerAngleSizeChange);

        this.DOMElement.append(angleSizeLabel);
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {

    }

    private handlerAngleSizeChange(event: globalThis.Event) {
        event.preventDefault();

        const currentLabel = event.currentTarget;
        if (!currentLabel) throw new Error("some shit with angle size change event");
        const input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        let inputValue = Number.parseInt(input.value, 10);

        if (inputValue > 90) inputValue = 90;
        else if (inputValue < 0 || inputValue === undefined) inputValue = 0;

        input.value = inputValue.toString();

        const dataToUpdate = {
            angle: inputValue,
        };

        this.view.onViewStateUpdate.invoke(new ViewDataEventArgs(dataToUpdate));
    }
}

export default Angle;
