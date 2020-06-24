export class View {
    constructor() {
    }

    setLeftMargin(element, marginValue) {
        element.style.marginLeft = marginValue + "px";
    }

    setWidth(element, widthValue){
        element.style.width = widthValue + "px";
    }
}