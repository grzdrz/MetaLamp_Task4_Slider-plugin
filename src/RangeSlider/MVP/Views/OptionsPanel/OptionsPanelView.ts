import View from "../View";
import Event from "../../../Events/Event";

import OptionPanelElement from "./OptionsPanelElements/OptionPanelElement";
import Angle from "./OptionsPanelElements/Angle";
import HandlesCount from "./OptionsPanelElements/HandlesCount";
import MaxSegmentCount from "./OptionsPanelElements/MaxSegmentCount";
import MaxValue from "./OptionsPanelElements/MaxValue";
import MinValue from "./OptionsPanelElements/MinValue";
import StepSize from "./OptionsPanelElements/StepSize";
import ViewManager from "../ViewManager";
import ListOfFilledStrip from "./OptionsPanelElements/ListOfFilledStrip";
import CanPush from "./OptionsPanelElements/CanPush";
import HandlesSeparated from "./OptionsPanelElements/HandlesSeparated";

class OptionsPanelView extends View {
    public panelElements: OptionPanelElement[] = new Array<OptionPanelElement>();

    public onModelStateUpdate: Event = new Event();

    constructor(containerElement: HTMLElement, viewManager: ViewManager) {
        super(containerElement, viewManager);

        this.containerElement = containerElement;
    }

    public initialize(): void {
        this.panelElements.push(new ListOfFilledStrip(this));
        this.panelElements.push(new HandlesCount(this));
        this.panelElements.push(new StepSize(this));
        this.panelElements.push(new MinValue(this));
        this.panelElements.push(new MaxValue(this));
        this.panelElements.push(new MaxSegmentCount(this));
        this.panelElements.push(new Angle(this));
        this.panelElements.push(new CanPush(this));
        this.panelElements.push(new HandlesSeparated(this));

        this.update(true);
    }

    public update(neededFullRerender: boolean): void {
        if (neededFullRerender) {
            this.panelElements.forEach((element) => element.build());
        } else {
            this.panelElements.forEach((element) => element.update());
        }
    }
}

export default OptionsPanelView;
