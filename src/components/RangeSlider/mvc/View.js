export class View {
    /* constructor() {
    } */

    setLeftMargin(element, marginValue) {
        let result = `${marginValue}px`;
        element.style.marginLeft = result;
        return result;
    }

    setSize(element, widthValue) {
        let result = `${widthValue}px`;
        element.style.width = result;
        return result;
    }
}
