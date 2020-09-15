/* eslint-disable no-shadow */
import $ from 'jquery';
import RangeSlider from './RangeSlider/RangeSlider';
import IModelData from './RangeSlider/Data/IModelData';
import IViewData from './RangeSlider/Data/IViewData';
import ModelData from './RangeSlider/Data/ModelData';
import ViewData from './RangeSlider/Data/ViewData';
import EventArgs from './RangeSlider/Events/EventArgs';

$.fn.rangeSlider = function createRangeSlider(this: JQuery, modelData: IModelData, viewData: IViewData): JQuery {
  const presenter = RangeSlider.createRangeSlider(this[0], modelData, viewData);

  $(this).data().setModelData = function setModelData(modelData: IModelData): void {
    presenter.viewManager.onSetModelData.invoke(new EventArgs<IModelData>(modelData));
  };
  $(this).data().setViewData = function setViewData(viewData: IViewData): void {
    presenter.viewManager.onSetViewData.invoke(new EventArgs<IViewData>(viewData));
  };
  $(this).data().getModelData = function getModelData(): ModelData {
    return presenter.viewManager.getModelData();
  };
  $(this).data().getViewData = function getViewData(): ViewData {
    return presenter.model.getViewData();
  };

  $(this).data().subscribeOnSetModelData = presenter.viewManager.onSetModelData.subscribe;
  $(this).data().subscribeOnSetViewData = presenter.viewManager.onSetViewData.subscribe;

  $(this).data().subscribeOnHandleMove = presenter.viewManager.onHandleMove.subscribe;
  $(this).data().subscribeOnMouseDown = presenter.viewManager.onMouseDown.subscribe;
  $(this).data().subscribeOnMouseMove = presenter.viewManager.onMouseMove.subscribe;
  $(this).data().subscribeOnMouseUp = presenter.viewManager.onMouseUp.subscribe;

  return this;
};
