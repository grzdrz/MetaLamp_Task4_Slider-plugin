import { Options, IOptions } from "./Options.js";

class Model {
    private _options: Options;

    constructor(options: Options) {
        this._options = options;
    }

    /*    getOption(optionName: string) {
           return this._options[optionName];
       } */

    getOptions(): Options {
        return new Options(this._options);
    }

    updateOptions(options: IOptions): void {
        /* for (let optionName of Object.keys(options)) {
            this._options[optionName] = options[optionName];
        } */

        this._options.update(options);
    }
}

export { Model };