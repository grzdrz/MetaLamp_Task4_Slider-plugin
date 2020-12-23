/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import $ from 'jquery';

import '../../plugin';
import IModelData from '../../RangeSlider/Data/IModelData';
import IViewData from '../../RangeSlider/Data/IViewData';
import ModelData from '../../RangeSlider/Data/ModelData';
import ViewData from '../../RangeSlider/Data/ViewData';
import IMouseData from '../../RangeSlider/Data/IMouseData';
import EventHandler from '../../RangeSlider/Events/EventHandler';
import './slider-with-physic.scss';

const modelData = {
  minValue: 0,
  maxValue: 1000,
  values: [1000],
  stepSize: 0.0000001,
  filledStrips: [false, false],
};
const viewData = {
  sliderStripThickness: 10,
  handleWidth: 45,
  handleHeight: 45,
  borderThickness: 5,
  maxSegmentsCount: 1,
  scaleFontSize: 15,
  angle: 90,
  hasScale: false,
  hasTooltip: true,
  tooltipMargin: 10,
};

class SliderWithPhysic {
  public containerElement: HTMLElement;

  public jqueryElement: JQuery<HTMLElement>;

  public setModelData: (modelData: IModelData, viewData: IViewData) => void;
  public getModelData: () => ModelData;

  public subscribeOnMouseDown: (handler: EventHandler<IMouseData>) => void;
  public subscribeOnMouseMove: (handler: EventHandler<IMouseData>) => void;
  public subscribeOnMouseUp: (handler: EventHandler<IMouseData>) => void;

  public velocity = 0;

  public readonly defaultDamping = 0.8;

  public readonly gAcceleration = -1.5;

  private _damping = this.defaultDamping;

  public set damping(value: number) {
    if (value <= 0) value = 0;
    this._damping = value;
  }

  public get damping(): number {
    return this._damping;
  }

  public isHandleGripped = false;

  constructor(outerContainerElement: HTMLElement) {
    this.containerElement = document.createElement('div');
    this.containerElement.className = 'slider-with-physic';
    outerContainerElement.append(this.containerElement);

    this.jqueryElement = $(this.containerElement).rangeSlider(modelData, viewData);

    this.setModelData = this.jqueryElement.data('setModelData');
    this.getModelData = this.jqueryElement.data('getModelData');
    this.subscribeOnMouseDown = this.jqueryElement.data('subscribeOnMouseDown');
    this.subscribeOnMouseMove = this.jqueryElement.data('subscribeOnMouseMove');
    this.subscribeOnMouseUp = this.jqueryElement.data('subscribeOnMouseUp');

    this.initialize();
  }

  public initialize(): void {
    this.subscribeOnMouseDown(this.handleMouseDown);
    this.subscribeOnMouseMove(this.handleMouseMove);
    this.subscribeOnMouseUp(this.handleMouseUp);
    this.calculatePosition();
  }

  private calculatePosition = () => {
    const { values, minValue } = this.getModelData();
    if (!(this.velocity === 0 && values[0] === minValue)) {
      if (this.isHandleGripped) {
        this.velocity = 0;
        this.damping = this.defaultDamping;
        return;
      }

      if (values[0] <= minValue) {
        this.velocity *= (-1 * this.damping);
        this.damping -= 0.05;
      } else {
        this.velocity += this.gAcceleration;
      }

      let newValue = values[0] + this.velocity - this.gAcceleration / 2;

      const isVelocityCloserToZero = Math.abs(this.velocity) < Math.abs(this.gAcceleration / 2);
      const isOffsetCloserToZero = newValue <= Math.abs(this.gAcceleration);
      if (isVelocityCloserToZero) {
        this.velocity = 0;
        if (isOffsetCloserToZero) {
          newValue = minValue;
        }
      }

      this.setModelData({ values: [newValue] }, {});

      requestAnimationFrame(this.calculatePosition);
    } else {
      this.damping = this.defaultDamping;
    }
  };

  private handleMouseDown = () => {
    this.isHandleGripped = true;
  };

  private handleMouseMove = () => {
    this.isHandleGripped = true;
  };

  private handleMouseUp = () => {
    this.isHandleGripped = false;
    this.calculatePosition();
  };
}
export default SliderWithPhysic;
