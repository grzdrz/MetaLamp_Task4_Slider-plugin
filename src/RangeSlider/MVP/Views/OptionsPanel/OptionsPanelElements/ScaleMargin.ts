import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ViewDataEventArgs from "../../../../Events/ViewDataEventArgs";

class ScaleMargin extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    public build(): void {
        super.build();

        const { scaleMargin } = this.view.viewManager.viewData;

        const input = document.createElement("input");
        input.type = "number";
        input.step = "1";
        input.value = scaleMargin.toString();
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
        const { scaleMargin } = this.view.viewManager.viewData;
        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        input.value = `${scaleMargin}`;
    }

    private handlerInputChange(event: globalThis.Event) {
        event.preventDefault();

        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        const inputValue = Number.parseInt(input.value, 10);

        input.value = inputValue.toString();

        const dataToUpdate = {
            scaleMargin: inputValue,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs(dataToUpdate));
    }
}

export default ScaleMargin;
