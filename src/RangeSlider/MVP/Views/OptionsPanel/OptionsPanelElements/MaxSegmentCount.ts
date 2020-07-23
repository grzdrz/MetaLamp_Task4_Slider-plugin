import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ViewDataEventArgs from "../../../../Events/ViewDataEventArgs";

class MaxSegmentCount extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    public build(): void {
        super.build();

        const { maxSegmentsCount } = this.view.viewManager.viewData;

        const input = document.createElement("input");
        const text = document.createElement("p");

        input.type = "number";
        input.step = "1";
        input.value = maxSegmentsCount.toString();
        input.className = "options__input js-options__input";

        text.className = "options__text";
        text.textContent = "maximum segments count";

        this.DOMElement.append(input);
        this.DOMElement.append(text);

        this.DOMElement.addEventListener("change", this.handlerInputChange);

        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {
        const { maxSegmentsCount } = this.view.viewManager.viewData;
        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        input.value = `${maxSegmentsCount}`;
    }

    private handlerInputChange(event: globalThis.Event) {
        event.preventDefault();

        const input = <HTMLInputElement>(this.DOMElement.querySelector(".js-options__input"));
        const inputValue = Number.parseInt(input.value, 10);

        const dataToUpdate = {
            maxSegmentsCount: inputValue,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs(dataToUpdate));
    }
}

export default MaxSegmentCount;
