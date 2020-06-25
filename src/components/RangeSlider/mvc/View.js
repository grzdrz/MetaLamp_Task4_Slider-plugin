export class View {
    constructor() {
    }

    setLeftMargin(element, marginValue) {
        let result = marginValue + "px";
        element.style.marginLeft = result;
        return result;
    }

    setWidth(element, widthValue){
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