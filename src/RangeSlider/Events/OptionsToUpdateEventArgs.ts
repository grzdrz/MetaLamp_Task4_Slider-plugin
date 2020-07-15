import EventArgs from "./EventArgs";
import IOptions from "../MVP/Model/IOptions";

class OptionsToUpdateEventArgs extends EventArgs {
    public options: IOptions;

    constructor(options: IOptions) {
        super();
        this.options = options;
    }
}

export default OptionsToUpdateEventArgs;
