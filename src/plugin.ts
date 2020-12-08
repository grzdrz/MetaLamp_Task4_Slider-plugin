/* eslint-disable func-names */
/* eslint-disable no-shadow */
import $ from 'jquery';

import IModelData from './RangeSlider/Data/IModelData';
import IViewData from './RangeSlider/Data/IViewData';
import ModelData from './RangeSlider/Data/ModelData';
import ViewData from './RangeSlider/Data/ViewData';
import EventArgs from './RangeSlider/Events/EventArgs';
import createRangeSlider from './RangeSlider/createRangeSlider';

$.fn.rangeSlider = function (this: JQuery, modelData: IModelData = {}, viewData: IViewData = {}): JQuery {
  const presenter = createRangeSlider(this[0], modelData, viewData);

  $(this).data().setModelData = function setModelData(modelData: IModelData): void {
    presenter.viewManager.onSetModelData.invoke(new EventArgs<IModelData>(modelData));
  };
  $(this).data().setViewData = function setViewData(viewData: IViewData): void {
    presenter.viewManager.onSetViewData.invoke(new EventArgs<IViewData>(viewData));
  };
  $(this).data().getModelData = function getModelData(): ModelData {
    presenter.viewManager.onExtractModelData.invoke();
    return presenter.viewManager.modelData;
  };
  $(this).data().getViewData = function getViewData(): ViewData {
    presenter.model.onExtractViewData.invoke();
    return presenter.model.viewData;
  };

  $(this).data().subscribeOnSetModelData = presenter.viewManager.onSetModelData.subscribe;
  $(this).data().subscribeOnSetViewData = presenter.viewManager.onSetViewData.subscribe;

  $(this).data().subscribeOnHandleMove = presenter.viewManager.onHandleMove.subscribe;
  $(this).data().subscribeOnMouseDown = presenter.viewManager.onMouseDown.subscribe;
  $(this).data().subscribeOnMouseMove = presenter.viewManager.onMouseMove.subscribe;
  $(this).data().subscribeOnMouseUp = presenter.viewManager.onMouseUp.subscribe;

  return this;
};
