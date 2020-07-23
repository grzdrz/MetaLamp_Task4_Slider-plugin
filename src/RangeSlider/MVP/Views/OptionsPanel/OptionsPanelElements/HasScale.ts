import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ViewDataEventArgs from "../../../../Events/ViewDataEventArgs";

class HasScale extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    public build(): void {
        super.build();

        const { canPush } = this.view.viewManager.getModelData();

        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = canPush;
        input.className = "options__checkbox-input js-options__input";

        const text = document.createElement("p");
        text.className = "options__text";
        text.textContent = "has scale ?";

        this.DOMElement.append(input);
        this.DOMElement.append(text);

        this.DOMElement.addEventListener("change", this.handlerInputChange);

        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const { hasScale } = this.view.viewManager.viewData;
        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        input.checked = hasScale;
    }

    private handlerInputChange(event: globalThis.Event) {
        event.preventDefault();

        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        const dataToUpdate = {
            hasScale: input.checked,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs(dataToUpdate));
    }
}

export default HasScale;
