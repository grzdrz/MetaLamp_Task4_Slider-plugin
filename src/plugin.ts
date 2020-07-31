/* eslint-disable no-shadow */
import $ from "jquery";
import RangeSlider from "./RangeSlider/RangeSlider";
import IModelData from "./RangeSlider/MVP/Model/Data/IModelData";
import IViewData from "./RangeSlider/MVP/Views/Data/IViewData";
import ModelDataEventArgs from "./RangeSlider/Events/ModelDataEventArgs";
import ViewDataEventArgs from "./RangeSlider/Events/ViewDataEventArgs";
import ModelData from "./RangeSlider/MVP/Model/Data/ModelData";
import ViewData from "./RangeSlider/MVP/Views/Data/ViewData";

$.fn.rangeSlider = function createRangeSlider(this: JQuery, modelData: IModelData, viewData: IViewData): JQuery {
    const presenter = RangeSlider.createRangeSlider(this[0], modelData, viewData);

    $(this).data().setData = function setData(modelData: IModelData, viewData: IViewData): void {
        if (modelData) presenter.viewManager.onStatesUpdate.invoke(new ModelDataEventArgs(modelData));
        if (viewData) presenter.viewManager.onStatesUpdate.invoke(new ViewDataEventArgs(viewData));
    };

    $(this).data().getModelData = function getModelData(): ModelData {
        return presenter.viewManager.getModelData();
    };

    $(this).data().getViewData = function getViewData(): ViewData {
        return presenter.model.getViewData();
    };

    $(this).data().subscribeOnUpdates = presenter.viewManager.onStatesUpdate.subscribe;

    $(this).data().subscribeOnHandleMove = presenter.viewManager.onHandleMove.subscribe;

    $(this).data().subscribeOnMouseDown = presenter.viewManager.onMouseDown.subscribe;

    $(this).data().subscribeOnMouseMove = presenter.viewManager.onMouseMove.subscribe;

    $(this).data().subscribeOnMouseUp = presenter.viewManager.onMouseUp.subscribe;

    return this;
};
