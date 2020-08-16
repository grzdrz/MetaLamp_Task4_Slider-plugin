import View from "../View";
import SliderPart from "./SliderParts/SliderPart";
import Handle from "./SliderParts/Handle";
import FilledStrip from "./SliderParts/FilledStrip";
import EmptyStrip from "./SliderParts/EmptyStrip";
import Vector from "../../../Helpers/Vector";
import Scale from "./SliderParts/Scale";
import MathFunctions from "../../../Helpers/MathFunctions";
import Tooltip from "./SliderParts/Tooltip";
import EventArgs from "../../../Events/EventArgs";
import IModelData from "../../Model/Data/IModelData";

class SliderView extends View {
    public parts: SliderPart[] = [];

    public initialize(): void {
        const resizeObserver = new ResizeObserver(this.handlerViewportSizeChange);
        const htmlElement = this.viewManager.containerElement;
        resizeObserver.observe(htmlElement);

        this.update(true);
    }

    public build(): void {
        const modelData = this.viewManager.getModelData();
        this.parts = [];

        this.containerElement.innerHTML = "";
        this.renderContainer();

        this.parts.push(new EmptyStrip(this));
        modelData.values.forEach((value, index) => {
            this.parts.push(new Handle(this, index));
        });
        if (this.viewManager.data.hasTooltip) {
            modelData.values.forEach((value, index) => {
                this.parts.push(new Tooltip(this, index));
            });
        }
        this.viewManager.data.filledStrips.forEach((value, index) => {
            if (value) this.parts.push(new FilledStrip(this, index));
        });
        if (this.viewManager.data.hasScale) {
            this.parts.push(new Scale(this));
        }
        this.parts.forEach((part) => {
            part.build();
        });
    }

    public update(isNeedRebuild: boolean): void {
        if (isNeedRebuild) {
            this.build();
            this.parts.forEach((part) => {
                part.update();
            });
        } else {
            this.parts.forEach((part) => {
                part.update();
            });
        }
        this.renderContainer();
    }

    // значение в условных единицах пропорциональное пиксельным координатам курсора в контейнере
    public calculateProportionalValue(cursorPositionInContainer: Vector, handleCountNumber: number): void {
        const modelData = this.viewManager.getModelData();
        const {
            sliderLength,
            handleWidth,
            angleInRad,
            isHandlesSeparated,
        } = this.viewManager.data;

        const shiftCoefficient = (isHandlesSeparated ? handleCountNumber : 0);
        const maxShiftCoefficient = (isHandlesSeparated ? modelData.values.length : 1);
        const vectorizedHandleWidth = Vector.calculateVector(handleWidth * shiftCoefficient, angleInRad);
        cursorPositionInContainer = cursorPositionInContainer.subtract(vectorizedHandleWidth);
        const containerCapacity = sliderLength - handleWidth * maxShiftCoefficient;

        const mainAxisVector = Vector.calculateVector(sliderLength, angleInRad);
        const cursorPositionProjectionOnSliderMainAxis = cursorPositionInContainer.calculateVectorProjectionOnTargetVector(mainAxisVector);

        const proportionalValue = (modelData.deltaMaxMin * cursorPositionProjectionOnSliderMainAxis) / (containerCapacity) + modelData.minValue;

        const { values } = modelData;
        values[handleCountNumber] = proportionalValue;
        this.viewManager.onHandleMove.invoke(new EventArgs<IModelData>({ values }));
    }

    // пиксельное значение пропорциональное условному значению
    public calculateProportionalPixelValue(value: number): number {
        const modelData = this.viewManager.getModelData();
        const { sliderLength, handleWidth, isHandlesSeparated } = this.viewManager.data;

        const maxShiftCoefficient = (isHandlesSeparated ? modelData.values.length : 1);
        const usedLength = sliderLength - handleWidth * maxShiftCoefficient;

        return ((value - modelData.minValue) * usedLength) / modelData.deltaMaxMin;
    }

    private renderContainer(): void {
        const { sliderLength, angleInRad } = this.viewManager.data;

        this.calculateSliderLength();

        const size = Vector.calculateVector(sliderLength, angleInRad);
        View.renderSize(this.containerElement, size);
    }

    private calculateSliderLength(): void {
        const { angleInRad, borderThickness } = this.viewManager.data;

        const rangleSlider = <HTMLElement>(this.containerElement.closest(".range-slider"));
        const boundingRect = rangleSlider.getBoundingClientRect();

        // координаты точки поверхности эллипса
        const width = boundingRect.width - borderThickness * 2;
        const height = boundingRect.height - borderThickness * 2;
        const curLength = MathFunctions.calculateEllipseSurfacePointCoordinate(width, height, angleInRad).length;
        this.viewManager.data.sliderLength = curLength;
    }

    private handlerViewportSizeChange = () => {
        this.renderContainer();
        this.update(false);
    };
}

export default SliderView;
