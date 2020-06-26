export class Model {
    constructor(options) {
        this._options = {};
        for (let optionName of Object.keys(options)) {
            this._options[optionName] = options[optionName];
        }
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
        let result = {};
        for (let optionName of Object.keys(this._options)) {
            result[optionName] = this._options[optionName];
        }
        return result;
    }

    updateOptions(options) {
        for (let optionName of Object.keys(options)) {
            this._options[optionName] = options[optionName];
        }
    }
}