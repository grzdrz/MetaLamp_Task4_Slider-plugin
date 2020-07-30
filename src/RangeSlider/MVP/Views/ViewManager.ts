import ViewData from "./Data/ViewData";

import SliderView from "./SliderView/SliderView";
import InputsView from "./InputsView/InputsView";
/* import OptionsPanelView from "./OptionsPanel/OptionsPanelView"; */
import ViewDataEventArgs from "../../Events/ViewDataEventArgs";
import IViewData from "./Data/IViewData";

import Event from "../../Events/Event";
import ModelData from "../Model/Data/ModelData";
import ModelDataEventArgs from "../../Events/ModelDataEventArgs";
import View from "./View";

class ViewManager {
    public containerElement: HTMLElement;

    public viewData: ViewData;

    public views: View[] = new Array<View>();

    public onStatesUpdate = new Event();

    public onGetModelData = new Event();

    public onHandleMove = new Event();

    public onInputsChange = new Event();

    constructor(viewData: ViewData, containerElement: HTMLElement) {
        this.viewData = viewData;
        this.containerElement = containerElement;
    }

    public initialize(): void {
        const pluginContainer: HTMLElement = document.createElement("div");
        pluginContainer.className = "range-slider";

        const sliderContainer: HTMLElement = document.createElement("div");
        sliderContainer.className = "range-slider__slider-container";
        this.views.push(new SliderView(sliderContainer, this));

        const inputsContainer: HTMLElement = document.createElement("div");
        inputsContainer.className = "range-slider__inputs-container";
        this.views.push(new InputsView(inputsContainer, this));

        pluginContainer.append(sliderContainer);

        this.containerElement.append(pluginContainer);
        this.containerElement.append(inputsContainer);

        this.views.forEach((e) => e.initialize());

        this.update(this.viewData);
    }

    public update(data: IViewData): void {
        if (data.sliderStripThickness !== undefined) this.viewData.sliderStripThickness = data.sliderStripThickness;
        if (data.handleWidth !== undefined) this.viewData.handleWidth = data.handleWidth;
        if (data.handleHeight !== undefined) this.viewData.handleHeight = data.handleHeight;
        if (data.borderThickness !== undefined) this.viewData.borderThickness = data.borderThickness;
        if (data.maxSegmentsCount !== undefined) this.viewData.maxSegmentsCount = this.validateMaxSegmentsCount(data.maxSegmentsCount);
        if (data.angle !== undefined) this.viewData.angle = this.validateAngle(data.angle);
        if (data.filledStrips !== undefined) this.viewData.filledStrips = this.validateFilledStrips(data.filledStrips);
        if (data.hasScale !== undefined) this.viewData.hasScale = data.hasScale;
        if (data.hasTooltip !== undefined) this.viewData.hasTooltip = data.hasTooltip;
        if (data.tooltipMargin !== undefined) this.viewData.tooltipMargin = data.tooltipMargin;
        if (data.isHandlesSeparated !== undefined) this.viewData.isHandlesSeparated = data.isHandlesSeparated;
        if (data.scaleMargin !== undefined) this.viewData.scaleMargin = data.scaleMargin;
        if (data.hasOptions !== undefined) this.viewData.hasOptions = data.hasOptions;
    }

    public getModelData(): ModelData {
        const optionsEventArgs = new ModelDataEventArgs({});
        this.onGetModelData.invoke(optionsEventArgs);
        return <ModelData>optionsEventArgs.data;
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

    private validateAngle(angle: number) {
        if (angle > 90) return 90;
        if (angle < 0 || angle === undefined) return 0;
        return angle;
    }

    private validateMaxSegmentsCount(maxSegmentsCount: number) {
        if (maxSegmentsCount < 1) return 1;
        return maxSegmentsCount;
    }

    public getData(args: ViewDataEventArgs): void {
        args.data = new ViewData(this.viewData);
    }
}

export default ViewManager;
