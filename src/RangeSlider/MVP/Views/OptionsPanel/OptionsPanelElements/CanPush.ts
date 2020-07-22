import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ModelDataEventArgs from "../../../../Events/ModelDataEventArgs";

class CanPush extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerCanPushChange = this.handlerCanPushChange.bind(this);
    }

    public build(): void {
        super.build();

        const { canPush } = this.view.viewManager.getModelData();

        const label = document.createElement("label");

        label.className = "range-slider__inputs-label";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = canPush;
        input.className = "range-slider__can-push-input";

        const text = document.createElement("p");
        text.className = "range-slider__can-push-text";
        text.textContent = "can push ?";

        label.append(input);
        label.append(text);

        label.addEventListener("change", this.handlerCanPushChange);

        this.DOMElement.append(label);
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {

    }

    private handlerCanPushChange(event: globalThis.Event) {
        event.preventDefault();

        const currentLabel = event.currentTarget;
        if (!currentLabel) throw new Error("some shit with angle size change event");
        const input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");

        const dataToUpdate = {
            canPush: input.checked,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ModelDataEventArgs(dataToUpdate));
    }
}

export default CanPush;
