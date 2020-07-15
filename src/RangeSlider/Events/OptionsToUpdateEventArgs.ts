import EventArgs from "./EventArgs";
import IModelData from "../MVP/Model/IModelData";

class OptionsToUpdateEventArgs extends EventArgs {
    public data: IModelData;

    constructor(data: IModelData) {
        super();
        this.data = data;
    }
}

export default OptionsToUpdateEventArgs;
