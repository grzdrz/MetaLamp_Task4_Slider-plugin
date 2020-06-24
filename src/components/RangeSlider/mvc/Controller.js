import { View } from "./View.js";
import { Model } from "./Model.js";

export class Controller {
    constructor() {
        this.view = new View();
        this.model = new Model();

        this.rangeSliderScript = this.rangeSliderScript.bind(this);
    }

    rangeSliderScript() {
        let view = this.view;

        let rangeSliders = document.querySelectorAll(".range-slider");
        let targetMaxValue;
        let targetMinValue;
        rangeSliders.forEach(e => {
            let targetFirstSlider = e.querySelector(".range-slider__first-slider");
            let targetLastSlider = e.querySelector(".range-slider__last-slider");
            let targetFirstSliderBorder = e.querySelector(".range-slider__first-slider-outside");
            let targetLastSliderBorder = e.querySelector(".range-slider__last-slider-outside");

            targetFirstSlider.ondragstart = function () {
                return false;
            };
            targetLastSlider.ondragstart = function () {
                return false;
            };

            targetFirstSlider.addEventListener("mousedown", sliderMouseDown);
            targetLastSlider.addEventListener("mousedown", sliderMouseDown);

            targetFirstSlider.addEventListener("touchstart", sliderMouseDown);
            targetLastSlider.addEventListener("touchstart", sliderMouseDown);



            let firstInput = e.querySelector(".range-slider__first-input");
            let lastInput = e.querySelector(".range-slider__last-input");
            let inputMaxValue = Number.parseInt(e.dataset.maxValue);
            let inputMinValue = Number.parseInt(e.dataset.minValue);

            let slidersContainer = e.querySelector(".range-slider__slider-container");
            let slidersFilledStrip = e.querySelector(".range-slider__slider-body-filled");
            let firstSlider = e.querySelector(".range-slider__first-slider");
            let lastSlider = e.querySelector(".range-slider__last-slider");
            let slidersContainerBoundingCoords = slidersContainer.getBoundingClientRect();
            let firstSliderBoundingCoords = firstSlider.getBoundingClientRect();
            let sliderWidth = firstSliderBoundingCoords.width;

            let dSliderInputFullValue = Number.parseInt(inputMaxValue) - Number.parseInt(inputMinValue);
            let dSliderStripFullValue = slidersContainerBoundingCoords.width - sliderWidth * 2;

            let x1_slider = ((firstInput.value - inputMinValue) * dSliderStripFullValue) / dSliderInputFullValue;
            let x2_slider = (((lastInput.value - inputMinValue) * dSliderStripFullValue) / dSliderInputFullValue) + sliderWidth;


            view.setLeftMargin(firstSlider, x1_slider);
            view.setLeftMargin(lastSlider, x2_slider);
            view.setLeftMargin(targetFirstSliderBorder, x1_slider - 2);
            view.setLeftMargin(targetLastSliderBorder, x2_slider - 2);
            view.setWidth(slidersFilledStrip, x2_slider - x1_slider);
            view.setLeftMargin(slidersFilledStrip, x1_slider + sliderWidth / 2);
        });


        function sliderMouseDown(event) {
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
            inputMaxValue = Number.parseInt(targetSlidersContainer.dataset.maxValue);
            inputMinValue = Number.parseInt(targetSlidersContainer.dataset.minValue);
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
                    view.setLeftMargin(targetSlider, newDeltaXForTargetSlider);
                    //проверка на выход за граничные значения
                    if (newDeltaXForTargetSlider < 0)
                        view.setLeftMargin(targetSlider, 0);
                    else if (newDeltaXForTargetSlider + sliderWidth > slidersContainerWidth)
                        view.setLeftMargin(targetSlider, slidersContainerWidth - sliderWidth);
                }

                //обновленные координаты целевого ползунка после изменения позиции курсора
                let newTargetSliderBoundingCoords = targetSlider.getBoundingClientRect();
                if (targetSliderIndex === 0) {//для первого ползунка
                    if (newTargetSliderBoundingCoords.x + sliderWidth > otherSliderCoordinates.x) {
                        let newTargetSliderPosInContainer = otherSliderCoordinates.x - slidersContainerBoundingCoords.x - sliderWidth;
                        view.setLeftMargin(targetSlider, newTargetSliderPosInContainer);
                    }
                    else {
                        //изменение отступа и размера закрашенной полосы
                        let filledStripPosInContainer = newTargetSliderBoundingCoords.x - slidersContainerBoundingCoords.x + sliderWidth / 2;
                        view.setLeftMargin(slidersFilledStrip, filledStripPosInContainer);
                        let filledStripWidth = otherSliderCoordinates.x - newTargetSliderBoundingCoords.x;
                        view.setWidth(slidersFilledStrip, filledStripWidth);

                        //запись значения в первый инпут
                        let targetSliderPosXInContainer = newTargetSliderBoundingCoords.x - slidersContainerBoundingCoords.x;
                        let maxDistanceBetweenSliders = slidersContainerBoundingCoords.width - newTargetSliderBoundingCoords.width * 2;

                        let maxInputDeltaValue = inputMaxValue - inputMinValue;
                        let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderPosXInContainer) / maxDistanceBetweenSliders + inputMinValue);

                        let temp1 = newTargetInputValue / Number.parseInt(targetSlidersContainer.dataset.valueRound);
                        let temp2 = Math.round(temp1);
                        let temp3 = temp2 * Number.parseInt(targetSlidersContainer.dataset.valueRound);
                        newTargetInputValue = temp3;

                        targetInput.value = newTargetInputValue;

                        let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
                        let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
                        splitedInputsValueRangeTextInTitle[0] = newTargetInputValue.toString() + targetSlidersContainer.dataset.valueType;
                        inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
                        inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
                    }
                }
                else if (targetSliderIndex === 1) {//для второго ползунка
                    if (newTargetSliderBoundingCoords.x < otherSliderCoordinates.x + sliderWidth) {
                        let newTargetSliderPosInContainer = otherSliderCoordinates.x - slidersContainerBoundingCoords.x + sliderWidth;
                        view.setLeftMargin(targetSlider, newTargetSliderPosInContainer);
                    }
                    else {
                        //изменение отступа и размера закрашенной полосы
                        let filledStripPosInContainer = otherSliderCoordinates.x - slidersContainerBoundingCoords.x + sliderWidth / 2;
                        view.setLeftMargin(slidersFilledStrip, filledStripPosInContainer);
                        let filledStripWidth = newTargetSliderBoundingCoords.x - otherSliderCoordinates.x;
                        view.setWidth(slidersFilledStrip, filledStripWidth);

                        //запись значения во второй инпут
                        let targetSliderPosXInContainer = newTargetSliderBoundingCoords.x - slidersContainerBoundingCoords.x - newTargetSliderBoundingCoords.width;
                        let maxDistanceBetweenSliders = slidersContainerBoundingCoords.width - newTargetSliderBoundingCoords.width * 2;

                        let maxInputDeltaValue = inputMaxValue - inputMinValue;
                        let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderPosXInContainer) / maxDistanceBetweenSliders + inputMinValue);

                        let temp1 = newTargetInputValue / Number.parseInt(targetSlidersContainer.dataset.valueRound);
                        let temp2 = Math.round(temp1);
                        let temp3 = temp2 * Number.parseInt(targetSlidersContainer.dataset.valueRound);
                        newTargetInputValue = temp3;

                        targetInput.value = newTargetInputValue;

                        let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
                        let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
                        splitedInputsValueRangeTextInTitle[2] = newTargetInputValue.toString() + targetSlidersContainer.dataset.valueType;
                        inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
                        inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
                    }
                }
                view.setLeftMargin(targetSliderBorder, Number.parseInt(targetSlider.style.marginLeft) - 2);
                view.setLeftMargin(otherSliderBorder, Number.parseInt(otherSlider.style.marginLeft) - 2);
            }

            function mouseUp(event) {
                document.removeEventListener("mousemove", mouseMove);
                document.removeEventListener("mouseup", mouseUp);
                document.removeEventListener("touchmove", mouseMove);
                document.removeEventListener("touchend", mouseUp);

                mouseMove({ isLastUpdate: true });
            }
        }
    }
}