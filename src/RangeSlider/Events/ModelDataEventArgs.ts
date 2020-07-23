import EventArgs from "./EventArgs";
import IModelData from "../MVP/Model/Data/IModelData";

class ModelDataEventArgs extends EventArgs {
    public data: IModelData;

    constructor(data: IModelData) {
        super();
        this.data = data;/* (data !== undefined ? data : {}); */
    }
}

export default ModelDataEventArgs;
