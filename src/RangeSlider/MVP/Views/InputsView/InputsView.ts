import View from "../View";
import Event from "../../../Events/Event";
import ModelDataEventArgs from "../../../Events/ModelDataEventArgs";
import ViewManager from "../ViewManager";

class InputsView extends View {
    public valueInputsDOMElements: HTMLInputElement[] = new Array<HTMLInputElement>();

    public onInputsChange = new Event();

    constructor(containerElement: HTMLElement, viewManager: ViewManager) {
        super(containerElement, viewManager);

        this.handlerValueInputChange = this.handlerValueInputChange.bind(this);
    }

    public initialize(): void {
        this.build();
        this.update(false);
    }

    public update(_neededFullRerender: boolean): void {
        const modelData = this.viewManager.getModelData();

        const { values } = modelData;
        if (_neededFullRerender) this.build();
        this.valueInputsDOMElements.forEach((e, i) => {
            e.value = values[i].toString();
        });
    }

    public build(): void {
        const modelData = this.viewManager.getModelData();

        this.containerElement.innerHTML = "";
        this.valueInputsDOMElements = [];
        for (let i = 0; i < modelData.values.length; i += 1) {
            const valueInputContainer = document.createElement("div");
            const valueInput = document.createElement("input");
            this.valueInputsDOMElements.push(valueInput);
            const valueInputText = document.createElement("p");

            valueInputContainer.className = "range-slider__value-input-container";
            valueInput.dataset.countNumber = `${i}`;
            valueInput.className = "range-slider__value-input";
            valueInput.value = `${modelData.minValue}`;
            valueInputText.className = "range-slider__value-input-text";
            valueInputText.textContent = `value ${i + 1}`;

            valueInputContainer.append(valueInput);
            valueInputContainer.append(valueInputText);
            this.containerElement.append(valueInputContainer);

            valueInput.addEventListener("change", this.handlerValueInputChange);
        }
    }

    private handlerValueInputChange(): void {
        const modelData = this.viewManager.getModelData();

        const { values } = modelData;
        this.valueInputsDOMElements.forEach((e, i) => {
            const value = Number.parseFloat(e.value);
            values[i] = value;
        });

        this.onInputsChange.invoke(new ModelDataEventArgs({ values }));
    }
}

export default InputsView;
