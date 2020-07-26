import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ViewDataEventArgs from "../../../../Events/ViewDataEventArgs";

class TooltipMargin extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    public build(): void {
        super.build();

        const { tooltipMargin } = this.view.viewManager.viewData;

        const input = document.createElement("input");
        input.type = "number";
        input.step = "1";
        input.value = `${tooltipMargin}`;
        input.className = "options__input js-options__input";

        const text = document.createElement("p");
        text.className = "options__text";
        text.textContent = "tooltip margin";

        this.DOMElement.append(input);
        this.DOMElement.append(text);

        this.DOMElement.addEventListener("change", this.handlerInputChange);

        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const { tooltipMargin } = this.view.viewManager.viewData;
        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        input.value = `${tooltipMargin}`;
    }

    private handlerInputChange(event: globalThis.Event) {
        event.preventDefault();

        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        const inputValue = Number.parseInt(input.value, 10);

        input.value = inputValue.toString();

        const dataToUpdate = {
            tooltipMargin: inputValue,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs(dataToUpdate));
    }
}

export default TooltipMargin;
