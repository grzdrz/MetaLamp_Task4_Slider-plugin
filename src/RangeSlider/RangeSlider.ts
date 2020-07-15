import SliderView from "./MVP/Views/SliderView";
import InputsView from "./MVP/Views/InputsView";
import OptionsPanelView from "./MVP/Views/OptionsPanelView";

import Model from "./MVP/Model/Model";
import Presenter from "./MVP/Presenter";

import IOptions from "./MVP/Model/IOptions";
import Options from "./MVP/Model/Options";

import IViewData from "./MVP/Views/IViewData";

import "./RangeSlider.scss";
import ViewData from "./MVP/Views/ViewData";
import ViewManager from "./MVP/Views/ViewManager";

class RangeSlider {
    public static sliderInstanceCount = 0;

    static createRangeSlider(containerElement: HTMLElement, options: IOptions, viewData: IViewData): Presenter {
        const defaultOptions: Options = new Options(options);
        const defaultViewData = new ViewData(viewData);

        defaultOptions.id = this.sliderInstanceCount;
        this.sliderInstanceCount += 1;

        const model = new Model(defaultOptions);
        const viewManager = new ViewManager(defaultViewData, containerElement);

        return new Presenter(model, viewManager);
    }
}

export default RangeSlider;
