import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ViewDataEventArgs from "../../../../Events/ViewDataEventArgs";

class HasScale extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerHasScaleChange = this.handlerHasScaleChange.bind(this);
    }

    public build(): void {
        super.build();

        const { canPush } = this.view.viewManager.getModelData();

        const label = document.createElement("label");

        label.className = "range-slider__inputs-label";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = canPush;
        input.className = "range-slider__has-scale-input";

        const text = document.createElement("p");
        text.className = "range-slider__has-scale-text";
        text.textContent = "has scale ?";

        label.append(input);
        label.append(text);

        label.addEventListener("change", this.handlerHasScaleChange);

        this.DOMElement.append(label);
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {

    }

    private handlerHasScaleChange(event: globalThis.Event) {
        event.preventDefault();

        const currentLabel = event.currentTarget;
        if (!currentLabel) throw new Error("some shit with angle size change event");
        const input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");

        const dataToUpdate = {
            hasScale: input.checked,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs(dataToUpdate));
    }
}

export default HasScale;
