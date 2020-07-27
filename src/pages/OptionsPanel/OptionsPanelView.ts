/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* import View from "../View"; */

import OptionPanelElement from "./OptionsPanelElements/OptionPanelElement";
import Angle from "./OptionsPanelElements/Angle";
import HandlesCount from "./OptionsPanelElements/HandlesCount";
import MaxSegmentCount from "./OptionsPanelElements/MaxSegmentCount";
import MaxValue from "./OptionsPanelElements/MaxValue";
import MinValue from "./OptionsPanelElements/MinValue";
import StepSize from "./OptionsPanelElements/StepSize";
/* import ViewManager from "../ViewManager"; */
import ListOfFilledStrip from "./OptionsPanelElements/ListOfFilledStrip";
import CanPush from "./OptionsPanelElements/CanPush";
import HandlesSeparated from "./OptionsPanelElements/HandlesSeparated";
import HasScale from "./OptionsPanelElements/HasScale";
import ScaleMargin from "./OptionsPanelElements/ScaleMargin";
import HasTooltip from "./OptionsPanelElements/HasTooltip";
import TooltipMargin from "./OptionsPanelElements/TooltipMargin";
import IModelData from "../../RangeSlider/MVP/Model/Data/IModelData";
import ModelData from "../../RangeSlider/MVP/Model/Data/ModelData";
import IViewData from "../../RangeSlider/MVP/Views/Data/IViewData";
import ViewData from "../../RangeSlider/MVP/Views/Data/ViewData";
import EventHandler from "../../RangeSlider/Events/EventHandler";

import "./OptionsPanel.scss";

class OptionsPanelView /* extends View  */ {
    public jqueryElement: JQuery;

    public containerElement: HTMLElement;

    public setData: (modelData: IModelData, viewData: IViewData) => void;

    public getModelData: () => ModelData;

    public getViewData: () => ViewData;

    public subscribeOnUpdates: (handler: EventHandler) => void;

    public panelElements: OptionPanelElement[] = new Array<OptionPanelElement>();

    constructor(jqueryElement: JQuery, containerElement: HTMLElement/* , viewManager: ViewManager */) {
        /* super(containerElement, viewManager); */
        this.jqueryElement = jqueryElement;
        // this.pluginInstance = this.jqueryElement.rangeSlider;
        this.setData = this.jqueryElement.data("setData");
        this.getModelData = this.jqueryElement.data("getModelData");
        this.getViewData = this.jqueryElement.data("getViewData");
        this.subscribeOnUpdates = this.jqueryElement.data("subscribeOnUpdates");

        this.containerElement = containerElement;

        this.handlerPanelUpdate = this.handlerPanelUpdate.bind(this);

        this.initialize();
    }

    public initialize(): void {
        this.panelElements.push(new ListOfFilledStrip(this));
        this.panelElements.push(new HandlesCount(this));
        this.panelElements.push(new StepSize(this));
        this.panelElements.push(new MaxValue(this));
        this.panelElements.push(new MinValue(this));
        this.panelElements.push(new MaxSegmentCount(this));
        this.panelElements.push(new Angle(this));
        this.panelElements.push(new CanPush(this));
        this.panelElements.push(new HandlesSeparated(this));

        this.panelElements.push(new HasTooltip(this));
        this.panelElements.push(new HasScale(this));

        this.panelElements.push(new ScaleMargin(this));
        this.panelElements.push(new TooltipMargin(this));

        this.update(true);

        this.subscribeOnUpdates(this.handlerPanelUpdate);
    }

    public update(neededFullRerender: boolean): void {
        if (neededFullRerender) {
            this.panelElements.forEach((element) => element.build());
        } else {
            this.panelElements.forEach((element) => element.update());
        }
    }

    private handlerPanelUpdate(): void {
        this.update(false);
    }
}

export default OptionsPanelView;
