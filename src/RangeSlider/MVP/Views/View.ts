import IModelData from "../Model/IModelData";
import ModelData from "../Model/ModelData";
import Vector from "../../Helpers/Vector";

import Event from "../../Events/Event";
import ModelDataEventArgs from "../../Events/ModelDataEventArgs";

import ViewManager from "./ViewManager";

abstract class View {
    public containerElement: HTMLElement;

    public viewManager: ViewManager;

    public onGetModelData: Event;

    public onViewStateUpdate: Event;

    public modelData: IModelData = {};

    constructor(containerElement: HTMLElement, viewManager: ViewManager) {
        this.containerElement = containerElement;
        this.viewManager = viewManager;

        this.onGetModelData = new Event();
        this.onViewStateUpdate = new Event();
    }

    getModelData(): ModelData {
        const optionsEventArgs = new ModelDataEventArgs({});
        this.onGetModelData.invoke(optionsEventArgs);
        if (!optionsEventArgs.data) throw new Error("broken get model data");
        return <ModelData>optionsEventArgs.data;
    }

    public abstract initialize(): void;

    public abstract update(neededFullRerender: boolean): void;

    public static renderPosition(htmlElement: HTMLElement, position: Vector): void {
        const element = htmlElement;

        const left = `${position.x}px`;
        element.style.left = left;

        const bottom = `${position.y}px`;
        element.style.bottom = bottom;
    }

    public static renderSize(htmlElement: HTMLElement, size: Vector): void {
        const element = htmlElement;

        const width = `${size.width}px`;
        element.style.width = width;

        const height = `${size.height}px`;
        element.style.height = height;
    }
}

export default View;
