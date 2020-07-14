
import { Options, IOptions } from "../MVP/Model/Options";

interface IEventArgs { }

class OptionsEventArgs implements IEventArgs {
    public options: Options | undefined = undefined;
}

class OptionsToUpdateEventArgs implements IEventArgs {
    public options: IOptions;
    constructor(options: IOptions) {
        this.options = options;
    }
}

export { OptionsEventArgs, OptionsToUpdateEventArgs, IEventArgs };