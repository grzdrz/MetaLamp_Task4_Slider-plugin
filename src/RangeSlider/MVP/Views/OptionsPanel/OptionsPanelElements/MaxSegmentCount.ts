import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import ViewDataEventArgs from "../../../../Events/ViewDataEventArgs";

class MaxSegmentCount extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerMaxSegmentsCountChange = this.handlerMaxSegmentsCountChange.bind(this);
    }

    public build(): void {
        super.build();

        const { maxSegmentsCount } = this.view.viewManager.viewData;

        const maxSegmentsCountLabel = document.createElement("label");
        const maxSegmentsCountInput = document.createElement("input");
        const maxSegmentsCountText = document.createElement("p");

        maxSegmentsCountLabel.className = "range-slider__inputs-label";

        maxSegmentsCountInput.type = "number";
        maxSegmentsCountInput.step = "1";
        maxSegmentsCountInput.value = maxSegmentsCount.toString();
        maxSegmentsCountInput.className = "range-slider__max-value-input";

        maxSegmentsCountText.className = "range-slider__max-value-text";
        maxSegmentsCountText.textContent = "maximum segments count";

        maxSegmentsCountLabel.append(maxSegmentsCountInput);
        maxSegmentsCountLabel.append(maxSegmentsCountText);

        maxSegmentsCountLabel.addEventListener("change", this.handlerMaxSegmentsCountChange);

        this.DOMElement.append(maxSegmentsCountLabel);
        this.view.containerElement.append(this.DOMElement);
    }

    public update(): void {

    }

    private handlerMaxSegmentsCountChange(event: globalThis.Event) {
        event.preventDefault();

        const currentLabel = event.currentTarget;
        if (!currentLabel) throw new Error("some shit with max segments count change event");
        const input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        const inputValue = Number.parseInt(input.value, 10);

        const dataToUpdate = {
            maxSegmentsCount: inputValue,
        };

        this.view.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs(dataToUpdate));
    }
}

export default MaxSegmentCount;
