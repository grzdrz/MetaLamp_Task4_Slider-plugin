import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import OptionsToUpdateEventArgs from "../../../Events/OptionsToUpdateEventArgs";

class MaxSegmentCount extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerMaxSegmentsCountChange = this.handlerMaxSegmentsCountChange.bind(this);
    }

    build() {
        super.build();

        let modelData =  this.view.getModelData();

        let maxSegmentsCountLabel = document.createElement("label");
        let maxSegmentsCountInput = document.createElement("input");
        let maxSegmentsCountText = document.createElement("p");

        maxSegmentsCountLabel.className = "range-slider__inputs-label";

        maxSegmentsCountInput.type = "number";
        maxSegmentsCountInput.step = "1";
        maxSegmentsCountInput.value = modelData.maxSegmentsCount.toString();
        maxSegmentsCountInput.className = "range-slider__max-value-input";

        maxSegmentsCountText.className = "range-slider__max-value-text";
        maxSegmentsCountText.textContent = "maximum segments count";

        maxSegmentsCountLabel.append(maxSegmentsCountInput);
        maxSegmentsCountLabel.append(maxSegmentsCountText);

        maxSegmentsCountLabel.addEventListener("change", this.handlerMaxSegmentsCountChange);


        this.DOMElement.append(maxSegmentsCountLabel);
        this.view.containerElement.append(this.DOMElement);
    }

    update() {

    }

    private handlerMaxSegmentsCountChange(event: globalThis.Event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with max segments count change event");
        let input = (<HTMLElement>currentLabel).querySelector("input");
        if (!input) throw new Error("input not exist");
        let inputValue = Number.parseInt(input.value);

        let optionsToUpdate = {
            maxSegmentsCount: inputValue,
        };

        this.view.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
}

export default MaxSegmentCount;
