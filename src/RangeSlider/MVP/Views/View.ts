import { Options, IOptions } from "../Model/Options";
import { Vector } from "../../Helpers/Vector";
import { Event } from "../../Events/Event";
import { OptionsEventArgs, IEventArgs } from "../../Events/EventArgs";

abstract class View {
    public onGetModelData: Event;
    public modelData: IOptions = {};

    constructor() {
        this.onGetModelData = new Event();
    }
 
    getModelData(): Options{
        let optionsEventArgs = new OptionsEventArgs();
        this.onGetModelData.invoke(optionsEventArgs);
        if (!optionsEventArgs.options) throw new Error("broken get model data");
        return optionsEventArgs.options;
    }

    abstract initialize(): void;

    abstract update(neededFullRerender: boolean): void;

    public renderPosition(element: HTMLElement, position: Vector) {
        let left = `${position.x}px`;
        element.style.left = left;

        let bottom = `${position.y}px`;
        element.style.bottom = bottom;
    }

    public renderSize(element: HTMLElement, size: Vector) {
        let elementStyles = getComputedStyle(element);
        let borderWidthLeft = Number.parseInt(elementStyles.borderLeftWidth);
        let borderWidthRight = Number.parseInt(elementStyles.borderRightWidth);
        let borderWidthTop = Number.parseInt(elementStyles.borderTopWidth);
        let borderWidthBottom = Number.parseInt(elementStyles.borderBottomWidth);

        let width: string = `${size.width - (borderWidthLeft + borderWidthRight)}px`;
        element.style.width = width;

        let height: string = `${size.height - (borderWidthTop + borderWidthBottom)}px`;
        element.style.height = height;
    }
}

export { View };