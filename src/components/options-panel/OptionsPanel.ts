/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import IModelData from '../../RangeSlider/Data/IModelData';
import ModelData from '../../RangeSlider/Data/ModelData';
import IViewData from '../../RangeSlider/Data/IViewData';
import ViewData from '../../RangeSlider/Data/ViewData';
import EventHandler from '../../RangeSlider/Events/EventHandler';
import OptionPanelElement from './panel-elements/OptionPanelElement';
import Angle from './panel-elements/Angle';
import HandlesCount from './panel-elements/HandlesCount';
import MaxSegmentCount from './panel-elements/MaxSegmentCount';
import MaxValue from './panel-elements/MaxValue';
import MinValue from './panel-elements/MinValue';
import StepSize from './panel-elements/StepSize';
import ListOfFilledStrip from './panel-elements/ListOfFilledStrip';
import CanPush from './panel-elements/CanPush';
import HandlesSeparated from './panel-elements/HandlesSeparated';
import HasScale from './panel-elements/HasScale';
import ScaleMargin from './panel-elements/ScaleMargin';
import HasTooltip from './panel-elements/HasTooltip';
import TooltipMargin from './panel-elements/TooltipMargin';
import './options-panel.scss';

class OptionsPanel {
  public jqueryElement: JQuery;
  public containerElement: HTMLElement;

  public setModelData: (modelData: IModelData) => void;
  public setViewDataWithRender: (viewData: IViewData) => void;
  public setViewDataWithoutRender: (viewData: IViewData) => void;

  public getModelData: () => ModelData;
  public getViewData: () => ViewData;

  public subscribeOnSetModelData: (handler: EventHandler<IModelData>) => void;
  public subscribeOnSetViewData: (handler: EventHandler<IViewData>) => void;

  public panelElements: OptionPanelElement[] = new Array<OptionPanelElement>();

  constructor(outerContainerElement: HTMLElement, modelData: IModelData, viewData: IViewData) {
    this.jqueryElement = $(outerContainerElement).rangeSlider(modelData, viewData);

    this.containerElement = document.createElement('div');
    this.containerElement.className = 'options';
    outerContainerElement.append(this.containerElement);

    this.setModelData = this.jqueryElement.data('setModelData');
    this.setViewDataWithRender = this.jqueryElement.data('setViewDataWithRender');
    this.setViewDataWithoutRender = this.jqueryElement.data('setViewDataWithoutRender');
    this.getModelData = this.jqueryElement.data('getModelData');
    this.getViewData = this.jqueryElement.data('getViewData');

    this.subscribeOnSetModelData = this.jqueryElement.data('subscribeOnSetModelData');
    this.subscribeOnSetViewData = this.jqueryElement.data('subscribeOnSetViewData');

    this.initialize();
  }

  public initialize(): void {
    this.panelElements.push(new ListOfFilledStrip(this));
    this.panelElements.push(new HandlesCount(this));
    this.panelElements.push(new HandlesSeparated(this));
    this.panelElements.push(new StepSize(this));
    this.panelElements.push(new CanPush(this));
    this.panelElements.push(new MaxValue(this));
    this.panelElements.push(new HasTooltip(this));
    this.panelElements.push(new MinValue(this));
    this.panelElements.push(new HasScale(this));
    this.panelElements.push(new MaxSegmentCount(this));
    this.panelElements.push(new Angle(this));
    this.panelElements.push(new ScaleMargin(this));
    this.panelElements.push(new TooltipMargin(this));

    this.update(true);

    this.subscribeOnSetModelData(this.handlePanelUpdate);
    this.subscribeOnSetViewData(this.handlePanelUpdate);
  }

  public update(neededFullReRender: boolean): void {
    if (neededFullReRender) {
      this.panelElements.forEach((element) => element.build());
    } else {
      this.panelElements.forEach((element) => element.update());
    }
  }

  private handlePanelUpdate = () => {
    this.update(false);
  };
}

export default OptionsPanel;
