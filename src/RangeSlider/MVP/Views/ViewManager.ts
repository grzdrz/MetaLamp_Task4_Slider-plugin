import IViewData from "./Data/IViewData";
import ViewData from "./Data/ViewData";
import IModelData from "../Model/Data/IModelData";
import ModelData from "../Model/Data/ModelData";
import IMouseData from "./Data/IMouseData";
import View from "./View";
import SliderView from "./SliderView/SliderView";
import InputsView from "./InputsView/InputsView";
import Event from "../../Events/Event";
import EventArgs from "../../Events/EventArgs";

class ViewManager {
    public containerElement: HTMLElement;
    public data: ViewData;
    public views: View[] = new Array<View>();

    public onSetViewData = new Event<IViewData>();
    public onSetModelData = new Event<IModelData>();
    public onGetModelData = new Event<IModelData>();
    public onHandleMove = new Event<IModelData>();
    public onInputsChange = new Event<IModelData>();
    public onMouseDown = new Event<IMouseData>();
    public onMouseMove = new Event<IMouseData>();
    public onMouseUp = new Event<IMouseData>();

    constructor(viewData: ViewData, containerElement: HTMLElement) {
        this.data = viewData;
        this.containerElement = containerElement;
    }

    public initialize(): void {
        const pluginContainer: HTMLElement = document.createElement("div");
        pluginContainer.className = "range-slider";

        const sliderContainer: HTMLElement = document.createElement("div");
        sliderContainer.className = "range-slider__slider-container";
        this.views.push(new SliderView(sliderContainer, this));

        const inputsContainer: HTMLElement = document.createElement("div");
        inputsContainer.className = "range-slider__additional-container";
        this.views.push(new InputsView(inputsContainer, this));

        pluginContainer.append(sliderContainer);

        this.containerElement.append(pluginContainer);
        this.containerElement.append(inputsContainer);

        this.views.forEach((e) => e.initialize());

        this.update(this.data);
    }

    public update(data: IViewData): void {
        if (data.sliderStripThickness !== undefined) this.data.sliderStripThickness = data.sliderStripThickness;
        if (data.handleWidth !== undefined) this.data.handleWidth = data.handleWidth;
        if (data.handleHeight !== undefined) this.data.handleHeight = data.handleHeight;
        if (data.borderThickness !== undefined) this.data.borderThickness = data.borderThickness;
        if (data.maxSegmentsCount !== undefined) this.data.maxSegmentsCount = this.validateMaxSegmentsCount(data.maxSegmentsCount);
        if (data.angle !== undefined) this.data.angle = this.validateAngle(data.angle);
        if (data.filledStrips !== undefined) this.data.filledStrips = this.validateFilledStrips(data.filledStrips);
        if (data.hasScale !== undefined) this.data.hasScale = data.hasScale;
        if (data.hasTooltip !== undefined) this.data.hasTooltip = data.hasTooltip;
        if (data.tooltipMargin !== undefined) this.data.tooltipMargin = data.tooltipMargin;
        if (data.isHandlesSeparated !== undefined) this.data.isHandlesSeparated = data.isHandlesSeparated;
        if (data.scaleMargin !== undefined) this.data.scaleMargin = data.scaleMargin;
    }

    public getModelData(): ModelData {
        const optionsEventArgs = new EventArgs<IModelData>({});
        this.onGetModelData.invoke(optionsEventArgs);
        return <ModelData>optionsEventArgs.data;
    }

    public getData(args: EventArgs<IViewData>): void {
        args.data = new ViewData(this.data);
    }

    private validateFilledStrips(filledStrips: boolean[]): boolean[] {
        const modelData = this.getModelData();
        const { values } = modelData;
        const newFilledStrips = new Array<boolean>();
        for (let i = 0; i < values.length + 1; i += 1) {
            if (i < filledStrips.length) {
                newFilledStrips.push(filledStrips[i]);
            } else {
                newFilledStrips.push(false);
            }
        }
        return newFilledStrips;
    }

    private validateAngle(angle: number): number {
        if (angle > 90) return 90;
        if (angle < 0 || angle === undefined) return 0;
        return angle;
    }

    private validateMaxSegmentsCount(maxSegmentsCount: number): number {
        if (maxSegmentsCount < 1) return 1;
        return maxSegmentsCount;
    }
}

export default ViewManager;
