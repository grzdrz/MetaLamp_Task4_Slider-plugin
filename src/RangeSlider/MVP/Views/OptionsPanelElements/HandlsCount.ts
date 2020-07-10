import { OptionPanelElement } from "./OptionPanelElement";
import { OptionsPanelView } from "../OptionsPanelView";
import { OptionsToUpdateEventArgs } from "../../../Events/EventArgs";

export class HandlsCount extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerHandlsCountChange = this.handlerHandlsCountChange.bind(this);
    }

    build() {
        super.build();

        let modelData = this.view.getModelData();

        //1 ползунок/2 ползунка
        let handlesCountContainer = document.createElement("div");
        let oneHandleLabel = document.createElement("label");
        let twoHandlesLabel = document.createElement("label");
        let oneHandleInput = document.createElement("input");
        let oneHandleText = document.createElement("p");
        let twoHandlesInput = document.createElement("input");
        let twoHandlesText = document.createElement("p");

        handlesCountContainer.className = "range-slider__handles-count-container";

        //1 ползунок
        oneHandleLabel.className = "range-slider__inputs-label";
        oneHandleLabel.dataset.handlesCount = "1";


        oneHandleInput.name = "handlesCount_" + modelData.id;
        oneHandleInput.type = "radio";
        oneHandleInput.checked = !modelData.hasTwoSlider;
        oneHandleInput.className = "range-slider__handles-count-input";


        oneHandleText.className = "range-slider__handles-count-text";
        oneHandleText.textContent = "one handle";

        oneHandleLabel.append(oneHandleInput);
        oneHandleLabel.append(oneHandleText);

        oneHandleLabel.addEventListener("change", this.handlerHandlsCountChange);

        //2 ползунка
        twoHandlesLabel.className = "range-slider__inputs-label";
        twoHandlesLabel.dataset.handlesCount = "2";


        twoHandlesInput.name = "handlesCount_" + modelData.id;
        twoHandlesInput.type = "radio";
        twoHandlesInput.checked = modelData.hasTwoSlider;
        twoHandlesInput.className = "range-slider__handles-count-input";


        twoHandlesText.className = "range-slider__handles-count-text";
        twoHandlesText.textContent = "two handles";

        twoHandlesLabel.append(twoHandlesInput);
        twoHandlesLabel.append(twoHandlesText);

        twoHandlesLabel.addEventListener("change", this.handlerHandlsCountChange);

        handlesCountContainer.append(oneHandleLabel);
        handlesCountContainer.append(twoHandlesLabel);

        this.DOMElement.append(handlesCountContainer);
        this.view.containerElement.append(this.DOMElement);
    }

    update() {
        let modelData = this.view.getModelData();

        let inputs = this.DOMElement.querySelectorAll(".range-slider__handles-count-input");
        (<HTMLInputElement>inputs[0]).checked = !modelData.hasTwoSlider;
        (<HTMLInputElement>inputs[1]).checked = modelData.hasTwoSlider;
    }

    private handlerHandlsCountChange(event: globalThis.Event) {
        event.preventDefault();

        let currentLabel = event.currentTarget;
        if (!currentLabel)
            throw new Error("some shit with handls count change event");
        let handlesCount = (<HTMLElement>currentLabel).dataset.handlesCount;
        if (!handlesCount)
            throw new Error("some shit with handls count change event");

        let optionsToUpdate;
        if (Number.parseInt(handlesCount) === 1) {
            optionsToUpdate = {
                hasTwoSlider: false,
            };
        }
        else {
            optionsToUpdate = {
                hasTwoSlider: true,
            };
        }

        this.view.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
}