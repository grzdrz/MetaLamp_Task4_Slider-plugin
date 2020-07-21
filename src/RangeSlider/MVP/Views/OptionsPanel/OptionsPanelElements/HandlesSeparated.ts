import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ViewDataEventArgs from "../../../../Events/ViewDataEventArgs";

class HandlesSeparated extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    public build(): void {
        super.build();

        const { isHandlesSeparated } = this.view.viewManager.viewData;

        const label = document.createElement("label");

        label.className = "range-slider__inputs-label";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = isHandlesSeparated;
        input.className = "range-slider__handles-separated-input";

        const text = document.createElement("p");
        text.className = "range-slider__handles-separated-text";
        text.textContent = "is handles separated ?";

        label.append(input);
        label.append(text);

        label.addEventListener("change", this.handlerInputChange);

        this.DOMElement.append(label);
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {

    }

    private handlerInputChange(event: globalThis.Event) {
        event.preventDefault();

        const currentLabel = event.currentTarget;
        if (!currentLabel) throw new Error("some shit with angle size change event");
        const input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");

        const dataToUpdate = {
            isHandlesSeparated: input.checked,
        };

        this.view.onViewStateUpdate.invoke(new ViewDataEventArgs(dataToUpdate));
    }
}

export default HandlesSeparated;
