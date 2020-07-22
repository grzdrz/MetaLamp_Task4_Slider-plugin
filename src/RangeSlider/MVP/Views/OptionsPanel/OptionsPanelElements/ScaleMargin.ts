import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ViewDataEventArgs from "../../../../Events/ViewDataEventArgs";

class ScaleMargin extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerScaleMarginChange = this.handlerScaleMarginChange.bind(this);
    }

    public build(): void {
        super.build();

        const { scaleMargin } = this.view.viewManager.viewData;

        const label = document.createElement("label");
        label.className = "range-slider__inputs-label";

        const input = document.createElement("input");
        input.type = "number";
        input.step = "1";
        input.value = scaleMargin.toString();
        input.className = "range-slider__scale-margin-input";

        const text = document.createElement("p");
        text.className = "range-slider__scale-margin-text";
        text.textContent = "scale margin";

        label.append(input);
        label.append(text);

        label.addEventListener("change", this.handlerScaleMarginChange);

        this.DOMElement.append(label);
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {

    }

    private handlerScaleMarginChange(event: globalThis.Event) {
        event.preventDefault();

        const currentLabel = event.currentTarget;
        if (!currentLabel) throw new Error("some shit with angle size change event");
        const input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        const inputValue = Number.parseInt(input.value, 10);

        input.value = inputValue.toString();

        const dataToUpdate = {
            scaleMargin: inputValue,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs(dataToUpdate));
    }
}

export default ScaleMargin;
