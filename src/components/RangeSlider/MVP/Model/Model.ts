import { Options, IOptions } from "./Options.js";
import { Event } from "../../Events/Event";
import { OptionsEventArgs } from "../../Events/EventArgs";

class Model {
    private _options: Options;

    constructor(options: Options) {
        this._options = options;
    }

    /* getOptions(): Options {
        return new Options(this._options);
    } */

    getOptions(args: OptionsEventArgs): void {
        args.options = new Options(this._options);
    }

    updateOptions(options: IOptions): void {
        this._options.update(options);
    }
}

export { Model };