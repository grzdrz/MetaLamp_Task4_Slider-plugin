export class View {
    constructor() {
        this.update = function () { };
        this.updateInputValues = function () { };
    }

    setLeftMargin(element, marginValue) {
        let result = marginValue + "px";
        element.style.marginLeft = result;
        return result;
    }
    setSize(element, widthValue) {
        let result = widthValue + "px";
        element.style.width = result;
        return result;
    }
    setLeftMarginTEMP(element, marginValue) {
        let result = marginValue + "px";
        element.style.marginLeft = result;
        return result;
    }
    setWidthTEMP(element, widthValue) {
        let result = widthValue + "px";
        element.style.width = result;
        return result;
    }
}

/* class OptionsPanelView extends View {
    constructor(elements) {
        super(elements);
        //...
    }
} */