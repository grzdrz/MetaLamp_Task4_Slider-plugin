/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import $ from 'jquery';

import '../../plugin';
import IModelData from '../../RangeSlider/Data/IModelData';
import ModelData from '../../RangeSlider/Data/ModelData';
import ViewData from '../../RangeSlider/Data/ViewData';
import EventHandler from '../../RangeSlider/Events/EventHandler';
import ColorCustomizer from './color-customizer';

const modelData = {
  minValue: 0,
  maxValue: 255,
  values: [50],
  stepSize: 1,
};
const viewData = {
  sliderStripThickness: 10,
  handleWidth: 15,
  handleHeight: 15,
  borderThickness: 5,
  maxSegmentsCount: 1,
  scaleFontSize: 15,
  angle: 90,
  filledStrips: [false, false],
  hasScale: false,
  hasTooltip: true,
  scaleMargin: 30,
};
class ColorSlider {
  public containerElement: HTMLElement;
  public jqueryElement: JQuery<HTMLElement>;

  public manager: ColorCustomizer;

  public getModelData: () => ModelData;
  public getViewData: () => ViewData;
  public subscribeOnHandleMove: (handler: EventHandler<IModelData>) => void;

  public color = 0;

  constructor(manager: ColorCustomizer, containerElement: HTMLElement) {
    this.manager = manager;
    this.containerElement = containerElement;

    this.jqueryElement = $(this.containerElement).rangeSlider(modelData, viewData);
    this.getModelData = this.jqueryElement.data('getModelData');
    this.getViewData = this.jqueryElement.data('getViewData');
    this.subscribeOnHandleMove = this.jqueryElement.data('subscribeOnHandleMove');

    this.initialize();
  }

  initialize(): void {
    this.subscribeOnHandleMove(this.handleChangeColor);

    const { values } = this.getModelData();
    // eslint-disable-next-line prefer-destructuring
    this.color = values[0];
  }

  private handleChangeColor = () => {
    const { values } = this.getModelData();
    // eslint-disable-next-line prefer-destructuring
    this.color = values[0];
    this.manager.changeSquareColor();
  };
}

export default ColorSlider;
