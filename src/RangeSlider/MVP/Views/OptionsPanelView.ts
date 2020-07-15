import View from "./View";
import Event from "../../Events/Event";

import OptionPanelElement from "./OptionsPanelElements/OptionPanelElement";
import Angle from "./OptionsPanelElements/Angle";
import HandlsCount from "./OptionsPanelElements/HandlsCount";
import MaxSegmentCount from "./OptionsPanelElements/MaxSegmentCount";
import MaxValue from "./OptionsPanelElements/MaxValue";
import MinValue from "./OptionsPanelElements/MinValue";
import StepSize from "./OptionsPanelElements/StepSize";

class OptionsPanelView extends View {
    public onModelStateUpdate: Event = new Event();

    public containerElement: HTMLElement;

    public stepSize: StepSize;
    public minValue: MinValue;
    public maxValue: MaxValue;
    public maxSegmentCount: MaxSegmentCount;
    public angle: Angle;
    public handlsCount: HandlsCount;

    public panelElements: OptionPanelElement[] = new Array<OptionPanelElement>();

    constructor(containerElement: HTMLElement) {
        super();

        this.containerElement = containerElement;

        this.panelElements.push(this.stepSize = new StepSize(this));
        this.panelElements.push(this.minValue = new MinValue(this));
        this.panelElements.push(this.maxValue = new MaxValue(this));
        this.panelElements.push(this.maxSegmentCount = new MaxSegmentCount(this));
        this.panelElements.push(this.angle = new Angle(this));
        this.panelElements.push(this.handlsCount = new HandlsCount(this));
    }

    initialize() {
        this.update(true);
    }

    update(neededFullRerender: boolean) {
        if (neededFullRerender) {
            this.panelElements.forEach(el => el.build());
        }
        else {
            this.panelElements.forEach(el => el.update());
        }
    }
}

export default OptionsPanelView;
