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

class OptionsPanelView extends View {
    public onModelStateUpdate: Event = new Event();

    public listOfFilledStrip: ListOfFilledStrip;

    public stepSize: StepSize;

    public minValue: MinValue;

    public maxValue: MaxValue;

    public maxSegmentCount: MaxSegmentCount;

    public angle: Angle;

    public handlsCount: HandlesCount;

    public panelElements: OptionPanelElement[] = new Array<OptionPanelElement>();

    constructor(containerElement: HTMLElement, viewManager: ViewManager) {
        super(containerElement, viewManager);

        this.containerElement = containerElement;

        this.panelElements.push(this.listOfFilledStrip = new ListOfFilledStrip(this));// //////
        this.panelElements.push(this.handlsCount = new HandlesCount(this));
        this.panelElements.push(this.stepSize = new StepSize(this));
        this.panelElements.push(this.minValue = new MinValue(this));
        this.panelElements.push(this.maxValue = new MaxValue(this));
        this.panelElements.push(this.maxSegmentCount = new MaxSegmentCount(this));
        this.panelElements.push(this.angle = new Angle(this));
    }

    public initialize(): void {
        this.update(true);
    }

    public update(neededFullRerender: boolean): void {
        // this.listOfFilledStrip.build();// //////

        if (neededFullRerender) {
            this.panelElements.forEach((element) => element.build());
        } else {
            this.panelElements.forEach((element) => element.update());
        }
    }
}

export default OptionsPanelView;
