import OptionPanelElement from "./OptionPanelElement";
import OptionsPanel from "../OptionsPanel";

class ScaleMargin extends OptionPanelElement {
    constructor(view: OptionsPanel) {
        super(view);

        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    public build(): void {
        super.build();

        const { scaleMargin } = this.view.getViewData();

        const input = document.createElement("input");
        input.type = "number";
        input.step = "1";
        input.value = `${scaleMargin}`;
        input.className = "options__input js-options__input";

        const text = document.createElement("p");
        text.className = "options__text";
        text.textContent = "scale margin";

        this.DOMElement.append(input);
        this.DOMElement.append(text);

        this.DOMElement.addEventListener("change", this.handlerInputChange);

        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const { hasScale, scaleMargin } = this.view.getViewData();
        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        input.value = `${scaleMargin}`;

        if (hasScale) {
            this.DOMElement.style.display = "flex";
        } else {
            this.DOMElement.style.display = "none";
        }
    }

    private handlerInputChange(event: globalThis.Event) {
        event.preventDefault();

        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        const inputValue = Number.parseInt(input.value, 10);

        input.value = inputValue.toString();

        const dataToUpdate = {
            scaleMargin: inputValue,
        };

        this.view.setViewData(dataToUpdate);
    }
}

export default ScaleMargin;
