import OptionPanelElement from "./OptionPanelElement";
import OptionsPanelView from "../OptionsPanelView";
import OptionsToUpdateEventArgs from "../../../../Events/OptionsToUpdateEventArgs";

class HandlsCount extends OptionPanelElement {
    constructor(view: OptionsPanelView) {
        super(view);

        this.handlerHandlsCountChange = this.handlerHandlsCountChange.bind(this);
    }

    public build(): void {
        super.build();

        const modelData = this.view.getModelData();

        // 1 ползунок/2 ползунка
        const handlesCountContainer = document.createElement("div");
        const oneHandleLabel = document.createElement("label");
        const twoHandlesLabel = document.createElement("label");
        const oneHandleInput = document.createElement("input");
        const oneHandleText = document.createElement("p");
        const twoHandlesInput = document.createElement("input");
        const twoHandlesText = document.createElement("p");

        handlesCountContainer.className = "range-slider__handles-count-container";

        // 1 ползунок
        oneHandleLabel.className = "range-slider__inputs-label";
        oneHandleLabel.dataset.handlesCount = "0";

        oneHandleInput.name = `handlesCount_${modelData.id}`;
        oneHandleInput.type = "radio";
        oneHandleInput.checked = /* ! modelData.hasTwoSlider */modelData.values.length === 1;
        oneHandleInput.className = "range-slider__handles-count-input";

        oneHandleText.className = "range-slider__handles-count-text";
        oneHandleText.textContent = "one handle";

        oneHandleLabel.append(oneHandleInput);
        oneHandleLabel.append(oneHandleText);

        oneHandleLabel.addEventListener("change", this.handlerHandlsCountChange);

        // 2 ползунка
        twoHandlesLabel.className = "range-slider__inputs-label";
        twoHandlesLabel.dataset.handlesCount = "1";

        twoHandlesInput.name = `handlesCount_${modelData.id}`;
        twoHandlesInput.type = "radio";
        twoHandlesInput.checked = /* modelData.hasTwoSlider */modelData.values.length === 2;
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

    public update(): void {
        const modelData = this.view.getModelData();

        const inputs = this.DOMElement.querySelectorAll(".range-slider__handles-count-input");
        (<HTMLInputElement>inputs[0]).checked = !modelData.hasTwoSlider;
        (<HTMLInputElement>inputs[1]).checked = modelData.hasTwoSlider;
    }

    private handlerHandlsCountChange(event: globalThis.Event) {
        event.preventDefault();

        const currentLabel = event.currentTarget;
        if (!currentLabel) throw new Error("some shit with handls count change event");
        const { handlesCount } = (<HTMLElement>currentLabel).dataset;
        if (!handlesCount) throw new Error("some shit with handls count change event");
        const handlesCountNumber = Number.parseInt(handlesCount, 10);

        const modelData = this.view.getModelData();
        const values = []/* modelData.values.map((e) => e) */;
        for (let i = 0; i < handlesCountNumber + 1; i += 1) {
            if (modelData.values.length <= handlesCountNumber) values.push(modelData.values[i]);
            else values.push(modelData.maxValue);
        }
        /* let optionsToUpdate;
        if (Number.parseInt(handlesCount, 10) === 1) {
            optionsToUpdate = {
                hasTwoSlider: false,
                values: values,
            };
        } else {
            optionsToUpdate = {
                hasTwoSlider: true,
                values: values,
            };
        } */
        const optionsToUpdate = { values };

        this.view.onModelStateUpdate.invoke(new OptionsToUpdateEventArgs(optionsToUpdate));
    }
}

export default HandlsCount;
