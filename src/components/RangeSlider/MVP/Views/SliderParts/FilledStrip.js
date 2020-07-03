import { SliderPart } from "./SliderPart.js";
import { Vector } from "../../../Helpers/Vector.js";

export class FilledStrip extends SliderPart {
    constructor(view, DOMElement) {
        super(view, DOMElement);

        this.calculatePosition = this.calculatePosition.bind(this);
    }

    initialize() {
        this.calculatePosition();
    }

    calculatePosition() {
        let modelData = this.view.getModelData();

        let firstSlider = this.view.firstSliderInstance;
        let lastSlider = this.view.lastSliderInstance;///

        /* if (modelData.hasTwoSlider) {
            if (modelData.orientation === "horizontal") {
                this.setPosition({ x: firstSlider.position.x + firstSlider.size.width / 2 });
                this.setSize({ width: lastSlider.position.x - firstSlider.position.x });
            }
            else if (modelData.orientation === "vertical") {
                this.setPosition({ y: firstSlider.position.y + firstSlider.size.height / 2 });
                this.setSize({ height: lastSlider.position.y - firstSlider.position.y });
            }
        }
        else {
            if (modelData.orientation === "horizontal") {
                this.setPosition({ x: 0 });
                this.setSize({ width: firstSlider.position.x + firstSlider.size.width / 2 });
            }
            else if (modelData.orientation === "vertical") {
                this.setPosition({ y: 0 });
                this.setSize({ height: firstSlider.position.y + firstSlider.size.height / 2 });
            }
        } */

        //------------------------------------------------------------------------------------
        let handle = this.view.firstSliderInstance;
        let handleSize = handle.size;
        let handleStyles = getComputedStyle(this.DOMElement);///перенести в место установки сайза
        let borderWidthLeft = Number.parseInt(handleStyles.borderLeftWidth);
        let borderWidthRight = Number.parseInt(handleStyles.borderRightWidth);
        let borderWidthTop = Number.parseInt(handleStyles.borderTopWidth);
        let borderWidthBottom = Number.parseInt(handleStyles.borderBottomWidth);

        if (modelData.hasTwoSlider) {
            let firstSliderPos = firstSlider.position.multiplyByNumber(-1);
            let width = Vector.sum(lastSlider.position, firstSliderPos).length();
            this.setSize({
                height: modelData.sliderStripThickness,
                width: /* lastSlider.position.x - firstSlider.position.x */width,
            }); 
            this.setPosition({
                x: firstSlider.position.x + firstSlider.size.width / 2 - (handleSize.width / 2 - (modelData.sliderStripThickness + borderWidthLeft + borderWidthRight) / 2),
                y: firstSlider.position.y + firstSlider.size.height / 2 - (handleSize.height / 2 - (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2),
            });
            /* this.setPosition({
                x: handleSize.width / 2 - (modelData.sliderStripThickness + borderWidthLeft + borderWidthRight) / 2,
                y: handleSize.height / 2 - (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2,
            }); */
        }
        else {
            let width = firstSlider.position.length() + firstSlider.size.length() / 2;
            this.setSize({
                height: modelData.sliderStripThickness,
                width: /* firstSlider.position.x + firstSlider.size.width / 2 */width,
            });
            this.setPosition({
                x: handleSize.width / 2 - (modelData.sliderStripThickness + borderWidthLeft + borderWidthRight) / 2,
                y: handleSize.height / 2 - (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2,
            });
            /* this.setPosition({
                x: handleSize.width / 2 - (modelData.sliderStripThickness + borderWidthLeft + borderWidthRight) / 2,
                y: handleSize.height / 2 - (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2,
            }); */
        }
        if (modelData.orientation === "horizontal")
            this.angle = 0;
        else
            this.angle = -90;

        this.DOMElement.style.transformOrigin = `${this.view.emptyStripInstance.position.x}px ${this.view.emptyStripInstance.position.y}px`;
        this.DOMElement.style.transform = `rotate(${this.angle}deg)`;
        //------------------------------------------------------------------------------------


        super.calculatePosition();
    }
}