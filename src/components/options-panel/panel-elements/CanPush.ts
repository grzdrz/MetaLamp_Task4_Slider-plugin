import OptionPanelElement from "./OptionPanelElement";
import OptionsPanel from "../OptionsPanel";

class CanPush extends OptionPanelElement {
    constructor(view: OptionsPanel) {
        super(view);

        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    public build(): void {
        super.build();

        const { canPush } = this.view.getModelData();

        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = canPush;
        input.className = "options__checkbox-input js-options__input";

        const text = document.createElement("p");
        text.className = "options__text";
        text.textContent = "can push ?";

        this.DOMElement.append(input);
        this.DOMElement.append(text);

        this.DOMElement.addEventListener("change", this.handlerInputChange);

        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const { canPush } = this.view.getModelData();
        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        input.checked = canPush;
    }

    private handlerInputChange(event: globalThis.Event) {
        event.preventDefault();

        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        const dataToUpdate = {
            canPush: input.checked,
        };

        this.view.setModelData(dataToUpdate);
    }
}

export default CanPush;
