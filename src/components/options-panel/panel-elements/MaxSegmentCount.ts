import OptionPanelElement from "./OptionPanelElement";
import OptionsPanel from "../OptionsPanel";

class MaxSegmentCount extends OptionPanelElement {
    constructor(view: OptionsPanel) {
        super(view);

        this.handlerInputChange = this.handlerInputChange.bind(this);
    }

    public build(): void {
        super.build();

        const { maxSegmentsCount } = this.view.getViewData();

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
        const { maxSegmentsCount } = this.view.getViewData();
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

        this.view.setData({}, dataToUpdate);
    }
}

export default MaxSegmentCount;
