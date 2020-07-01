export class View {
    constructor() {
        this.getModelData = () => { };
    }

    initialize() {
    }

    setPosition(element, position) {
        let orientation = this.getModelData("orientation");
        if (orientation === "vertical") {
            if (position.x !== undefined) {
                let left = "auto";
                element.style.left = left;
            }
            if (position.y !== undefined) {
                let bottom = `${position.y}px`;
                element.style.bottom = bottom;
            }
        }
        else {
            if (position.x !== undefined) {
                let left = `${position.x}px`;
                element.style.left = left;
            }
            if (position.y !== undefined) {
                let bottom = "auto";
                element.style.bottom = bottom;
            }
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
