import IModelData from '../Data/IModelData';
import ModelData from '../Data/ModelData';
import ViewData from '../Data/ViewData';
import IViewData from '../Data/IViewData';
import Event from '../Events/Event';
import EventArgs from '../Events/EventArgs';
import ModelDataValidator from './ModelDataValidator';

class Model {
  public data: ModelData;
  public validator: ModelDataValidator;
  public onGetViewData = new Event<IViewData>();
  public onSetViewData = new Event<IViewData>();

  constructor(data: ModelData) {
    this.data = data;
    this.validator = new ModelDataValidator(this);
  }

  public initialize(): void {
    this.update(this.data);
  }

  public update(data: IModelData): void {
    if (data.canPush !== undefined) this.data.canPush = data.canPush;
    if (data.minValue !== undefined) {
      this.data.minValue = this.validator.validateMinValue(data.minValue, this.data.stepSize);
    }
    if (data.maxValue !== undefined) {
      this.data.maxValue = this.validator.validateMaxValue(this.data.stepSize, data.maxValue);
    }
    if (data.stepSize !== undefined) {
      this.data.stepSize = data.stepSize;
      this.data.maxValue = this.validator.validateMaxValue(data.stepSize, this.data.maxValue);
    }
    this.validator.validateValues(data);
  }

  public getViewData(): ViewData {
    const eventArgs = new EventArgs<IViewData>({});
    this.onGetViewData.invoke(eventArgs);
    return <ViewData>eventArgs.data;
  }

  public getData(): IModelData {
    return new ModelData(this.data);
  }
}

export default Model;
