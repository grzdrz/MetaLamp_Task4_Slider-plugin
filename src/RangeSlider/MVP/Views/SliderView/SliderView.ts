import View from "../View";

import SliderPart from "./SliderParts/SliderPart";
import Handle from "./SliderParts/Handle";
import FilledStrip from "./SliderParts/FilledStrip";
import EmptyStrip from "./SliderParts/EmptyStrip";

import Vector from "../../../Helpers/Vector";

import Event from "../../../Events/Event";
import OptionsToUpdateEventArgs from "../../../Events/OptionsToUpdateEventArgs";
import Scale from "./SliderParts/Scale";
import ViewManager from "../ViewManager";
import MathFunctions from "../../../Helpers/MathFunctions";

class SliderView extends View {
    public parts: SliderPart[] = [];

    public onHandleMove: Event = new Event();

    public onModelStateUpdate: Event = new Event();

    constructor(containerElement: HTMLElement, viewManager: ViewManager) {
        super(containerElement, viewManager);

        this.handlerViewportSizeChange = this.handlerViewportSizeChange.bind(this);
    }

    public initialize(): void {
        this.createParts();
        this.renderContainer();
        this.parts.forEach((part) => {
            part.initialize();
        });
        window.addEventListener("resize", this.handlerViewportSizeChange);

        this.renderContainer();
    }

    public update(neededRerender: boolean): void {
        if (neededRerender) { // полный перерендер всех элементов слайдера
            this.containerElement.innerHTML = "";
            this.createParts();
            this.renderContainer();
            this.parts.forEach((part) => {
                part.buildDOMElement();
                part.render();
            });
        } else { // или просто обновление их состояний
            this.renderContainer();
            this.parts.forEach((part) => {
                part.render();
            });
        }

        this.renderContainer();
    }

    public createParts(): void {
        const modelData = this.getModelData();
        this.parts = [];

        this.parts.push(new EmptyStrip(this));
        this.parts.push(new Handle(this, 0));
        if (modelData.hasTwoSlider) this.parts.push(new Handle(this, 1));
        this.parts.push(new FilledStrip(this));
        if (this.viewManager.viewData.hasScale) this.parts.push(new Scale(this));
    }

    // значение в условных единицах пропорциональное пиксельным координатам курсора в контейнере
    public calculateProportionalValue(cursorPositionInContainer: Vector, handleCountNumber: number): void {
        const modelData = this.getModelData();
        const { sliderLength, handleWidth, angleInRad } = this.viewManager.viewData;

        let containerCapacity;
        if (modelData.hasTwoSlider) {
            if (handleCountNumber === 1) {
                const vectorizedHandleWidth = Vector.calculateVector(handleWidth, angleInRad);
                cursorPositionInContainer = cursorPositionInContainer.subtract(vectorizedHandleWidth);
            }
            containerCapacity = sliderLength - handleWidth * 2;
        } else {
            containerCapacity = sliderLength - handleWidth;
        }

        const mainAxisVector = Vector.calculateVector(sliderLength, angleInRad);
        const cursorPositionProjectionOnSliderMainAxis = cursorPositionInContainer.calculateVectorProjectionOnTargetVector(mainAxisVector);

        const proportionalValue = (modelData.deltaMaxMin * cursorPositionProjectionOnSliderMainAxis) / (containerCapacity) + modelData.minValue;

        const valuesArray = modelData.values.map((e) => e);
        valuesArray[handleCountNumber] = proportionalValue;
        this.onHandleMove.invoke(new OptionsToUpdateEventArgs({ values: valuesArray }));
    }

    // пиксельное значение пропорциональное условному значению
    public calculateProportionalPixelValue(value: number): number {
        const modelData = this.getModelData();
        const { sliderLength, handleWidth } = this.viewManager.viewData;

        let usedLength;
        if (modelData.hasTwoSlider) {
            usedLength = sliderLength - handleWidth * 2;
        } else {
            usedLength = sliderLength - handleWidth;
        }

        return ((value - modelData.minValue) * usedLength) / modelData.deltaMaxMin;
    }

    public renderContainer(): void {
        const { sliderLength, angleInRad } = this.viewManager.viewData;

        this.calculateSliderLength();

        const size = Vector.calculateVector(sliderLength, angleInRad);
        View.renderSize(this.containerElement, size);
    }

    private calculateSliderLength() {
        const { angleInRad, borderThickness } = this.viewManager.viewData;

        const test1 = this.containerElement.closest(".range-slider");
        let boundingRect;
        if (test1) {
            boundingRect = test1.getBoundingClientRect();
        } else throw new Error("sdfsdf");

        // координаты точки поверхности эллипса
        const width = boundingRect.width - borderThickness * 2;
        const height = boundingRect.height - borderThickness * 2;
        const curLength = MathFunctions.calculateEllipseSurfacePointCoordinate(width, height, angleInRad).length;
        this.viewManager.viewData.sliderLength = curLength;
    }

    private handlerViewportSizeChange(_event: UIEvent) {
        this.update(/* false */true);
    }
}

export default SliderView;
