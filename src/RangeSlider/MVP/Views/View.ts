import IOptions from "../Model/IOptions";
import Options from "../Model/Options";
import Vector from "../../Helpers/Vector";
import Event from "../../Events/Event";
import OptionsEventArgs from "../../Events/OptionsEventArgs";

abstract class View {
    public onGetModelData: Event;

    public modelData: IOptions = {};

    constructor() {
        this.onGetModelData = new Event();
    }

    getModelData(): Options {
        const optionsEventArgs = new OptionsEventArgs();
        this.onGetModelData.invoke(optionsEventArgs);
        if (!optionsEventArgs.options) throw new Error("broken get model data");
        return optionsEventArgs.options;
    }

    abstract initialize(): void;

    abstract update(neededFullRerender: boolean): void;

    public static renderPosition(htmlElement: HTMLElement, position: Vector): void {
        const element = htmlElement;

        const left = `${position.x}px`;
        element.style.left = left;

        const bottom = `${position.y}px`;
        element.style.bottom = bottom;
    }

    public static renderSize(htmlElement: HTMLElement, size: Vector): void {
        const element = htmlElement;

        const elementStyles = getComputedStyle(element);
        const borderWidthLeft = Number.parseInt(elementStyles.borderLeftWidth, 10);
        const borderWidthRight = Number.parseInt(elementStyles.borderRightWidth, 10);
        const borderWidthTop = Number.parseInt(elementStyles.borderTopWidth, 10);
        const borderWidthBottom = Number.parseInt(elementStyles.borderBottomWidth, 10);

        const width = `${size.width - (borderWidthLeft + borderWidthRight)}px`;
        element.style.width = width;

        const height = `${size.height - (borderWidthTop + borderWidthBottom)}px`;
        element.style.height = height;
    }
}

export default View;
