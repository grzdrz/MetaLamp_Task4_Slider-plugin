import View from "../View";

import SliderPart from "./SliderParts/SliderPart";
import Handle from "./SliderParts/Handle";
import FilledStrip from "./SliderParts/FilledStrip";
import EmptyStrip from "./SliderParts/EmptyStrip";

import Vector from "../../../Helpers/Vector";

import Event from "../../../Events/Event";
import ModelDataEventArgs from "../../../Events/ModelDataEventArgs";
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

        this.update(false);
    }

    public update(neededRerender: boolean): void {
        if (neededRerender) { // полный перерендер всех элементов слайдера
            this.containerElement.innerHTML = "";
            this.createParts();
            this.renderContainer();
            this.parts.forEach((part) => {
                part.buildDOMElement();
                part.update();
            });
        } else { // или просто обновление их состояний
            this.renderContainer();
            this.parts.forEach((part) => {
                part.update();
            });
        }

        this.renderContainer();
    }

    // значение в условных единицах пропорциональное пиксельным координатам курсора в контейнере
    public calculateProportionalValue(cursorPositionInContainer: Vector, handleCountNumber: number): void {
        const modelData = this.getModelData();
        const { sliderLength, handleWidth, angleInRad } = this.viewManager.viewData;

        const vectorizedHandleWidth = Vector.calculateVector(handleWidth * handleCountNumber, angleInRad);
        cursorPositionInContainer = cursorPositionInContainer.subtract(vectorizedHandleWidth);
        const containerCapacity = sliderLength - handleWidth * (modelData.values.length);

        const mainAxisVector = Vector.calculateVector(sliderLength, angleInRad);
        const cursorPositionProjectionOnSliderMainAxis = cursorPositionInContainer.calculateVectorProjectionOnTargetVector(mainAxisVector);

        const proportionalValue = (modelData.deltaMaxMin * cursorPositionProjectionOnSliderMainAxis) / (containerCapacity) + modelData.minValue;

        const valuesArray = modelData.values.map((e) => e);
        valuesArray[handleCountNumber] = proportionalValue;
        this.onHandleMove.invoke(new ModelDataEventArgs({ values: valuesArray }));
    }

    // пиксельное значение пропорциональное условному значению
    public calculateProportionalPixelValue(value: number): number {
        const modelData = this.getModelData();
        const { sliderLength, handleWidth } = this.viewManager.viewData;

        const usedLength = sliderLength - handleWidth * modelData.values.length;

        return ((value - modelData.minValue) * usedLength) / modelData.deltaMaxMin;
    }

    private createParts(): void {
        const modelData = this.getModelData();
        this.parts = [];

        this.parts.push(new EmptyStrip(this));
        modelData.values.forEach((value, index) => {
            this.parts.push(new Handle(this, index));
        });
        this.viewManager.viewData.filledStrips.forEach((value, index) => {
            if (value) this.parts.push(new FilledStrip(this, index));
        });

        if (this.viewManager.viewData.hasScale) this.parts.push(new Scale(this));
    }

    private renderContainer(): void {
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
