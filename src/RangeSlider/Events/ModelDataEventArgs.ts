import EventArgs from "./EventArgs";
import IModelData from "../MVP/Model/IModelData";

class ModelDataEventArgs extends EventArgs {
    public data: IModelData;

    constructor(data: IModelData | void) {
        super();
        this.data = (data !== undefined ? data : {});
    }
}

export default ModelDataEventArgs;