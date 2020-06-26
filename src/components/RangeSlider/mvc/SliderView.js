import { View } from "./View.js";

import { SlidersContainer } from "../elements/SlidersContainer.js";
import { Slider } from "../elements/Slider.js";
import { FilledStrip } from "../elements/FilledStrip.js";
import { EmptyStrip } from "../elements/EmptyStrip.js";

export class SliderView extends View {
    constructor(elements) {
        super();

        this.onSliderMouseDown = this.onSliderMouseDown.bind(this);

        this.getModelData = () => { };
        this.updateInputs = () => { };


        this.slidersContainerInstance = new SlidersContainer(this, elements.slidersContainer);
        this.firstSliderInstance = new Slider(this, elements.firstSlider, elements.firstSliderBorder, 1);
        this.lastSliderInstance = new Slider(this, elements.lastSlider, elements.lastSliderBorder, 2);
        this.emptyStripInstance = new EmptyStrip(this, elements.emptyStrip);
        this.filledStripInstance = new FilledStrip(this, elements.filledStrip);
    }


    initialize() {
        this.slidersContainerInstance.calculatePosition();
        this.firstSliderInstance.calculatePosition();
        this.lastSliderInstance.calculatePosition();
        this.emptyStripInstance.calculatePosition();
        this.filledStripInstance.calculatePosition();


        this.firstSliderInstance.DOMElement.ondragstart = function () {
            return false;
        };
        this.lastSliderInstance.DOMElement.ondragstart = function () {
            return false;
        };

        this.firstSliderInstance.DOMElement.addEventListener("mousedown", this.onSliderMouseDown);
        this.lastSliderInstance.DOMElement.addEventListener("mousedown", this.onSliderMouseDown);

        this.firstSliderInstance.DOMElement.addEventListener("touchstart", this.onSliderMouseDown);
        this.lastSliderInstance.DOMElement.addEventListener("touchstart", this.onSliderMouseDown);
    }

    update() {
        this.slidersContainerInstance.calculatePosition();
        this.firstSliderInstance.calculatePosition();
        this.lastSliderInstance.calculatePosition();
        this.emptyStripInstance.calculatePosition();
        this.filledStripInstance.calculatePosition();
    }

    //d&d
    onSliderMouseDown(event) {
        let view = this;
        let modelData = view.getModelData();

        let cursorMouseDownPosX;//место нажатия левой кнопки мыши
        if (event.changedTouches) cursorMouseDownPosX = event.changedTouches[0].pageX;
        else cursorMouseDownPosX = event.clientX;

        let targetSlider;
        let otherSlider;
        let targetSliderBorder;
        let otherSliderBorder;
        let targetSlidersContainer;
        let targetSliderIndex;
        let targetInput;
        let otherInput;
        let inputMaxValue;
        let inputMinValue;
        let inputsValueRangeInTitle;

        if (event.currentTarget.className) {//чтобы не вылететь при кликах по document
            let classArray = event.currentTarget.className.split(/\s/i);
            if (classArray.includes("range-slider__first-slider")) {
                targetSlider = event.currentTarget;
                targetSliderIndex = 0;

                otherSlider = targetSlider.parentElement.querySelector(".range-slider__last-slider");

                targetInput = targetSlider.parentElement.querySelector(".range-slider__first-input");
                otherInput = targetSlider.parentElement.querySelector(".range-slider__last-input");

                targetSliderBorder = targetSlider.parentElement.querySelector(".range-slider__first-slider-outside");
                otherSliderBorder = targetSlider.parentElement.querySelector(".range-slider__last-slider-outside");
            }
            else if (classArray.includes("range-slider__last-slider")) {
                targetSlider = event.currentTarget;
                targetSliderIndex = 1;

                otherSlider = targetSlider.parentElement.querySelector(".range-slider__first-slider");

                otherInput = targetSlider.parentElement.querySelector(".range-slider__first-input");
                targetInput = targetSlider.parentElement.querySelector(".range-slider__last-input");

                otherSliderBorder = targetSlider.parentElement.querySelector(".range-slider__first-slider-outside");
                targetSliderBorder = targetSlider.parentElement.querySelector(".range-slider__last-slider-outside");
            }
            else return;
        }
        else return;

        targetSlidersContainer = targetSlider.closest(".range-slider");
        inputMaxValue = Number.parseInt(modelData.maxValue);
        inputMinValue = Number.parseInt(modelData.minValue);
        inputsValueRangeInTitle = targetSlider.parentElement.parentElement.querySelector(".range-slider__inputs-value-range");

        let slidersFilledStrip = targetSlider.parentElement.querySelector(".range-slider__slider-body-filled");

        let slidersContainerBoundingCoords = targetSlider.parentElement.getBoundingClientRect();
        let slidersContainerWidth = slidersContainerBoundingCoords.width;

        let targetSliderBoundingCoords = targetSlider.getBoundingClientRect();
        let otherSliderCoordinates = otherSlider.getBoundingClientRect();
        let sliderWidth = targetSliderBoundingCoords.width;

        //расстояние между местом нажатия кнопки мыши внутри бегунка и левым краем бегунка(где внутри бегунка находится курсор)
        let mouseXPosInsideTargetSlider = cursorMouseDownPosX - targetSliderBoundingCoords.x;


        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
        document.addEventListener("touchmove", mouseMove);
        document.addEventListener("touchend", mouseUp);

        function mouseMove(event) {
            if (event.changedTouches) cursorMouseDownPosX = event.changedTouches[0].pageX;
            else cursorMouseDownPosX = event.clientX;

            if (!event.isLastUpdate) {
                //дистанция между левой границей контейнера и левой границей целевого ползунка зависящая от позиции курсора
                let newDeltaXForTargetSlider = Math.round(cursorMouseDownPosX - slidersContainerBoundingCoords.x - mouseXPosInsideTargetSlider);
                view.setLeftMarginTEMP(targetSlider, newDeltaXForTargetSlider);
                //проверка на выход за граничные значения
                if (newDeltaXForTargetSlider < 0)
                    view.setLeftMarginTEMP(targetSlider, 0);
                else if (newDeltaXForTargetSlider + sliderWidth > slidersContainerWidth)
                    view.setLeftMarginTEMP(targetSlider, slidersContainerWidth - sliderWidth);
            }

            //обновленные координаты целевого ползунка после изменения позиции курсора
            let newTargetSliderBoundingCoords = targetSlider.getBoundingClientRect();
            if (targetSliderIndex === 0) {//для первого ползунка
                if (newTargetSliderBoundingCoords.x + sliderWidth > otherSliderCoordinates.x) {
                    let newTargetSliderPosInContainer = otherSliderCoordinates.x - slidersContainerBoundingCoords.x - sliderWidth;
                    view.setLeftMarginTEMP(targetSlider, newTargetSliderPosInContainer);
                }
                else {
                    //изменение отступа и размера закрашенной полосы
                    let filledStripPosInContainer = newTargetSliderBoundingCoords.x - slidersContainerBoundingCoords.x + sliderWidth / 2;
                    view.setLeftMarginTEMP(slidersFilledStrip, filledStripPosInContainer);
                    let filledStripWidth = otherSliderCoordinates.x - newTargetSliderBoundingCoords.x;
                    view.setWidthTEMP(slidersFilledStrip, filledStripWidth);

                    //запись значения в первый инпут
                    let targetSliderPosXInContainer = newTargetSliderBoundingCoords.x - slidersContainerBoundingCoords.x;
                    let maxDistanceBetweenSliders = slidersContainerBoundingCoords.width - newTargetSliderBoundingCoords.width * 2;

                    let maxInputDeltaValue = inputMaxValue - inputMinValue;
                    let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderPosXInContainer) / maxDistanceBetweenSliders + inputMinValue);

                    let temp1 = newTargetInputValue / Number.parseInt(modelData.valueRound);
                    let temp2 = Math.round(temp1);
                    let temp3 = temp2 * Number.parseInt(modelData.valueRound);
                    newTargetInputValue = temp3;

                    //targetInput.value = newTargetInputValue;
                    view.updateInputs({ firstValue: newTargetInputValue });
                    //view.firstSliderInstance.inputDOMElement.value = newTargetInputValue;

                    let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
                    let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
                    splitedInputsValueRangeTextInTitle[0] = newTargetInputValue.toString() + modelData.valueType;
                    inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
                    inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
                }
            }
            else if (targetSliderIndex === 1) {//для второго ползунка
                if (newTargetSliderBoundingCoords.x < otherSliderCoordinates.x + sliderWidth) {
                    let newTargetSliderPosInContainer = otherSliderCoordinates.x - slidersContainerBoundingCoords.x + sliderWidth;
                    view.setLeftMarginTEMP(targetSlider, newTargetSliderPosInContainer);
                }
                else {
                    //изменение отступа и размера закрашенной полосы
                    let filledStripPosInContainer = otherSliderCoordinates.x - slidersContainerBoundingCoords.x + sliderWidth / 2;
                    view.setLeftMarginTEMP(slidersFilledStrip, filledStripPosInContainer);
                    let filledStripWidth = newTargetSliderBoundingCoords.x - otherSliderCoordinates.x;
                    view.setWidthTEMP(slidersFilledStrip, filledStripWidth);

                    //запись значения во второй инпут
                    let targetSliderPosXInContainer = newTargetSliderBoundingCoords.x - slidersContainerBoundingCoords.x - newTargetSliderBoundingCoords.width;
                    let maxDistanceBetweenSliders = slidersContainerBoundingCoords.width - newTargetSliderBoundingCoords.width * 2;

                    let maxInputDeltaValue = inputMaxValue - inputMinValue;
                    let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderPosXInContainer) / maxDistanceBetweenSliders + inputMinValue);

                    let temp1 = newTargetInputValue / Number.parseInt(modelData.valueRound);
                    let temp2 = Math.round(temp1);
                    let temp3 = temp2 * Number.parseInt(modelData.valueRound);
                    newTargetInputValue = temp3;

                    //targetInput.value = newTargetInputValue;
                    view.updateInputs({ lastValue: newTargetInputValue });
                    //view.lastSliderInstance.inputDOMElement.value = newTargetInputValue;

                    let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
                    let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
                    splitedInputsValueRangeTextInTitle[2] = newTargetInputValue.toString() + modelData.valueType;
                    inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
                    inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
                }
            }
            view.setLeftMarginTEMP(targetSliderBorder, Number.parseInt(targetSlider.style.marginLeft) - 2);
            view.setLeftMarginTEMP(otherSliderBorder, Number.parseInt(otherSlider.style.marginLeft) - 2);
        }

        function mouseUp(event) {
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("touchmove", mouseMove);
            document.removeEventListener("touchend", mouseUp);

            mouseMove({ isLastUpdate: true });

            view.update();//вызывается update() из контроллера, который обновляет все представления(или какието определенные) и модель(если нужно)
        }
    }
}