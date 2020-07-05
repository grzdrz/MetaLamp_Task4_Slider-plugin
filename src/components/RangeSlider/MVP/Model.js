import { Options } from "../Options.js";

export class Model {
    constructor(options) {
        this._options = options;
    }

    addOption(optionName, optonValue) {
        this._options[optionName] = optonValue;
    }

    deleteOptions(optionName) {
        delete this._options[optionName];
    }

    getOption(optionName) {
        return this._options[optionName];
    }

    getOptions() {
        return new Options(this._options);
    }

    updateOptions(options) {
        for (let optionName of Object.keys(options)) {
            this._options[optionName] = options[optionName];
        }
    }
}