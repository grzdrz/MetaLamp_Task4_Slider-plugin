import { Event, EventArgs } from "../../Events/Event";

export class View {
    constructor() {
        this.getModelData = () => { };
    }

    initialize() {
    }

    setPosition(element, position) {
        if (position.x || position.x === 0) {
            let left = `${position.x}px`;
            element.style.left = left;
        }
        if (position.y || position.y === 0) {
            let bottom = `${position.y}px`;
            element.style.bottom = bottom;
        }
    }

    setSize(element, size) {
        let elementStyles = getComputedStyle(element);
        let borderWidthLeft = Number.parseInt(elementStyles.borderLeftWidth);
        let borderWidthRight = Number.parseInt(elementStyles.borderRightWidth);
        let borderWidthTop = Number.parseInt(elementStyles.borderTopWidth);
        let borderWidthBottom = Number.parseInt(elementStyles.borderBottomWidth);

        if (size.width || size.width === 0) {
            let width = `${size.width - (borderWidthLeft + borderWidthRight)}px`;
            element.style.width = width;
        }
        if (size.height || size.height === 0) {
            let height = `${size.height - (borderWidthTop + borderWidthBottom)}px`;
            element.style.height = height;
        }
    }
}
