export class View {
    /* constructor() {
    } */

    setMargin(element, marginValues) {
        if (marginValues.x !== undefined) {
            let leftMargin = `${marginValues.x}px`;
            element.style.marginLeft = leftMargin;
        }
        if (marginValues.y !== undefined) {
            let bottomMargin = `${marginValues.y}px`;
            element.style.marginBottom = bottomMargin;
        }
    }

    setSize(element, size) {
        if (size.width !== undefined) {
            let width = `${size.width}px`;
            element.style.width = width;
        }
        if (size.height !== undefined) {
            let height = `${size.height}px`;
            element.style.height = height;
        }
    }
}
