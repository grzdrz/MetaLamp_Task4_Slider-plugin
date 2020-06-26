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

        let cursorMouseDownPosX;//место нажатия левой кнопки мыши
        if (event.changedTouches) cursorMouseDownPosX = event.changedTouches[0].pageX;
        else cursorMouseDownPosX = event.clientX;

        let sliderCountNumber = Number.parseInt(event.currentTarget.dataset.sliderCountNumber);
        let targetSliderInstance;
        let targetSlider;
        let otherSliderInstance;
        let otherSlider;
        let targetSliderIndex;

        if (event.currentTarget.className) {//чтобы не вылететь при кликах по document
            let classArray = event.currentTarget.className.split(/\s/i);
            if (sliderCountNumber === 1) {
                targetSliderInstance = this.firstSliderInstance;
                otherSliderInstance = this.lastSliderInstance;
                targetSliderIndex = 0;
            }
            else {
                targetSliderInstance = this.lastSliderInstance;
                otherSliderInstance = this.firstSliderInstance;
                targetSliderIndex = 1;
            }
            targetSlider = targetSliderInstance.DOMElement;
            otherSlider = otherSliderInstance.DOMElement;
            /* if (classArray.includes("range-slider__first-slider")) {
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
            else return; */
        }
        else return;

        let modelData = view.getModelData();
        let inputMaxValue = modelData.maxValue;
        let inputMinValue = modelData.minValue;
        let inputsValueRangeInTitle = targetSlider.parentElement.parentElement.querySelector(".range-slider__inputs-value-range");

        let slidersFilledStripInstance = view.filledStripInstance;
        let slidersFilledStrip = slidersFilledStripInstance.DOMElement;

        let containerPositionInDocument = view.slidersContainerInstance.containerPositionInDocument;
        let slidersContainerWidth = view.slidersContainerInstance.size.width;

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
            let cursorGlobalPositionX;
            if (event.changedTouches) cursorGlobalPositionX = event.changedTouches[0].pageX;
            else cursorGlobalPositionX = event.clientX;

            if (!event.isLastUpdate) {
                //отрезок между левой границей контейнера и левой границей перетаскивоемого ползунка,
                //где граница определяется текущим положением мыши, а не положением самого ползунка
                let newDeltaXForTargetSlider = Math.round(cursorGlobalPositionX - containerPositionInDocument.x - mouseXPosInsideTargetSlider);
                targetSliderInstance.setPosition({ x: newDeltaXForTargetSlider });

                //проверка на выход за граничные значения
                if (newDeltaXForTargetSlider < 0) {
                    targetSliderInstance.setPosition({ x: 0 });
                }
                else if (newDeltaXForTargetSlider + sliderWidth > slidersContainerWidth) {
                    targetSliderInstance.setPosition({ x: slidersContainerWidth - sliderWidth });
                }
            }

            //обновленные координаты целевого ползунка после изменения позиции курсора
            let newTargetSliderBoundingCoords = targetSlider.getBoundingClientRect();
            if (targetSliderIndex === 0) {//для первого ползунка
                if (newTargetSliderBoundingCoords.x + sliderWidth > otherSliderCoordinates.x) {
                    let newTargetSliderPosInContainer = otherSliderCoordinates.x - containerPositionInDocument.x - sliderWidth;
                    targetSliderInstance.setPosition({ x: newTargetSliderPosInContainer });
                }
                else {
                    //изменение отступа и размера закрашенной полосы
                    let filledStripPosInContainer = newTargetSliderBoundingCoords.x - containerPositionInDocument.x + sliderWidth / 2;
                    slidersFilledStripInstance.setPosition({ x: filledStripPosInContainer });
                    let filledStripWidth = otherSliderCoordinates.x - newTargetSliderBoundingCoords.x;
                    slidersFilledStripInstance.setSize({ width: filledStripWidth });

                    //запись значения в первый инпут
                    let targetSliderPosXInContainer = newTargetSliderBoundingCoords.x - containerPositionInDocument.x;
                    let maxDistanceBetweenSliders = containerPositionInDocument.width - newTargetSliderBoundingCoords.width * 2;

                    let maxInputDeltaValue = inputMaxValue - inputMinValue;
                    let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderPosXInContainer) / maxDistanceBetweenSliders + inputMinValue);

                    let temp1 = newTargetInputValue / Number.parseInt(modelData.valueRound);
                    let temp2 = Math.round(temp1);
                    let temp3 = temp2 * Number.parseInt(modelData.valueRound);
                    newTargetInputValue = temp3;

                    view.updateInputs({ firstValue: newTargetInputValue });

                    let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
                    let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
                    splitedInputsValueRangeTextInTitle[0] = newTargetInputValue.toString() + modelData.valueType;
                    inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
                    inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
                }
            }
            else if (targetSliderIndex === 1) {//для второго ползунка
                if (newTargetSliderBoundingCoords.x < otherSliderCoordinates.x + sliderWidth) {
                    let newTargetSliderPosInContainer = otherSliderCoordinates.x - containerPositionInDocument.x + sliderWidth;
                    targetSliderInstance.setPosition({ x: newTargetSliderPosInContainer });
                }
                else {
                    //изменение отступа и размера закрашенной полосы
                    let filledStripPosInContainer = otherSliderCoordinates.x - containerPositionInDocument.x + sliderWidth / 2;
                    slidersFilledStripInstance.setPosition({ x: filledStripPosInContainer });
                    let filledStripWidth = newTargetSliderBoundingCoords.x - otherSliderCoordinates.x;
                    slidersFilledStripInstance.setSize({ width: filledStripWidth });

                    //запись значения во второй инпут
                    let targetSliderPosXInContainer = newTargetSliderBoundingCoords.x - containerPositionInDocument.x - newTargetSliderBoundingCoords.width;
                    let maxDistanceBetweenSliders = containerPositionInDocument.width - newTargetSliderBoundingCoords.width * 2;

                    let maxInputDeltaValue = inputMaxValue - inputMinValue;
                    let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderPosXInContainer) / maxDistanceBetweenSliders + inputMinValue);

                    let temp1 = newTargetInputValue / Number.parseInt(modelData.valueRound);
                    let temp2 = Math.round(temp1);
                    let temp3 = temp2 * Number.parseInt(modelData.valueRound);
                    newTargetInputValue = temp3;

                    view.updateInputs({ lastValue: newTargetInputValue });

                    let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
                    let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
                    splitedInputsValueRangeTextInTitle[2] = newTargetInputValue.toString() + modelData.valueType;
                    inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
                    inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
                }
            }
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
    /*     //d&d
        onSliderMouseDown(event) {
            //let view = this;
            let modelData = this.getModelData();
    
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
            this.mouseXPosInsideTargetSlider = cursorMouseDownPosX - targetSliderBoundingCoords.x;
    
    
            document.addEventListener("mousemove", this.mouseMove);
            document.addEventListener("mouseup", this.mouseUp);
            document.addEventListener("touchmove", this.mouseMove);
            document.addEventListener("touchend", this.mouseUp);
        }
    
        mouseMove(event) {
    
            let cursorMouseDownPosX;
            if (event.changedTouches) cursorMouseDownPosX = event.changedTouches[0].pageX;
            else cursorMouseDownPosX = event.clientX;
    
            let containerPositionInDocument = this.slidersContainerInstance.containerPositionInDocument;
    
            let sliderCountNumber = Number.parseInt(event.currentTarget.dataset.sliderCountNumber);
            let targetSliderInstace;
            let targetSlider;
            let otherSliderInstace;
            let otherSlider;
            if (sliderCountNumber === 1) {
                targetSliderInstace = this.firstSliderInstance;
                otherSliderInstace = this.lastSliderInstance;
            }
            else {
                targetSliderInstace = this.lastSliderInstance;
                otherSliderInstace = this.firstSliderInstance;
            }
            targetSlider = targetSliderInstace.DOMElement;
            otherSlider = otherSliderInstace.DOMElement;
    
            if (!event.isLastUpdate) {
                //дистанция между левой границей контейнера и левой границей целевого ползунка зависящая от позиции курсора
                let newDeltaXForTargetSlider = Math.round(cursorMouseDownPosX - containerPositionInDocument.x - this.mouseXPosInsideTargetSlider);
                this.setLeftMargin(targetSlider, newDeltaXForTargetSlider);
                //проверка на выход за граничные значения
                if (newDeltaXForTargetSlider < 0)
                    this.setLeftMargin(targetSlider, 0);
                else if (newDeltaXForTargetSlider + sliderWidth > slidersContainerWidth)
                    this.setLeftMargin(targetSlider, slidersContainerWidth - sliderWidth);
            }
    
            //обновленные координаты целевого ползунка после изменения позиции курсора
            let newTargetSliderBoundingCoords = targetSlider.getBoundingClientRect();
            if (targetSliderIndex === 0) {//для первого ползунка
                if (newTargetSliderBoundingCoords.x + sliderWidth > otherSliderCoordinates.x) {
                    let newTargetSliderPosInContainer = otherSliderCoordinates.x - containerPositionInDocument.x - sliderWidth;
                    this.setLeftMargin(targetSlider, newTargetSliderPosInContainer);
                }
                else {
                    //изменение отступа и размера закрашенной полосы
                    let filledStripPosInContainer = newTargetSliderBoundingCoords.x - containerPositionInDocument.x + sliderWidth / 2;
                    this.setLeftMargin(slidersFilledStrip, filledStripPosInContainer);
                    let filledStripWidth = otherSliderCoordinates.x - newTargetSliderBoundingCoords.x;
                    this.setSize(slidersFilledStrip, filledStripWidth);
    
                    //запись значения в первый инпут
                    let targetSliderPosXInContainer = newTargetSliderBoundingCoords.x - containerPositionInDocument.x;
                    let maxDistanceBetweenSliders = containerPositionInDocument.width - newTargetSliderBoundingCoords.width * 2;
    
                    let maxInputDeltaValue = inputMaxValue - inputMinValue;
                    let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderPosXInContainer) / maxDistanceBetweenSliders + inputMinValue);
    
                    let temp1 = newTargetInputValue / Number.parseInt(modelData.valueRound);
                    let temp2 = Math.round(temp1);
                    let temp3 = temp2 * Number.parseInt(modelData.valueRound);
                    newTargetInputValue = temp3;
    
                    this.updateInputs({ firstValue: newTargetInputValue });
    
                    let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
                    let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
                    splitedInputsValueRangeTextInTitle[0] = newTargetInputValue.toString() + modelData.valueType;
                    inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
                    inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
                }
            }
            else if (targetSliderIndex === 1) {//для второго ползунка
                if (newTargetSliderBoundingCoords.x < otherSliderCoordinates.x + sliderWidth) {
                    let newTargetSliderPosInContainer = otherSliderCoordinates.x - containerPositionInDocument.x + sliderWidth;
                    this.setLeftMargin(targetSlider, newTargetSliderPosInContainer);
                }
                else {
                    //изменение отступа и размера закрашенной полосы
                    let filledStripPosInContainer = otherSliderCoordinates.x - containerPositionInDocument.x + sliderWidth / 2;
                    this.setLeftMargin(slidersFilledStrip, filledStripPosInContainer);
                    let filledStripWidth = newTargetSliderBoundingCoords.x - otherSliderCoordinates.x;
                    this.setSize(slidersFilledStrip, filledStripWidth);
    
                    //запись значения во второй инпут
                    let targetSliderPosXInContainer = newTargetSliderBoundingCoords.x - containerPositionInDocument.x - newTargetSliderBoundingCoords.width;
                    let maxDistanceBetweenSliders = containerPositionInDocument.width - newTargetSliderBoundingCoords.width * 2;
    
                    let maxInputDeltaValue = inputMaxValue - inputMinValue;
                    let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderPosXInContainer) / maxDistanceBetweenSliders + inputMinValue);
    
                    let temp1 = newTargetInputValue / Number.parseInt(modelData.valueRound);
                    let temp2 = Math.round(temp1);
                    let temp3 = temp2 * Number.parseInt(modelData.valueRound);
                    newTargetInputValue = temp3;
    
                    this.updateInputs({ lastValue: newTargetInputValue });
    
                    let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
                    let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
                    splitedInputsValueRangeTextInTitle[2] = newTargetInputValue.toString() + modelData.valueType;
                    inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
                    inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
                }
            }
            this.setLeftMargin(targetSliderBorder, Number.parseInt(targetSlider.style.marginLeft) - 2);
            this.setLeftMargin(otherSliderBorder, Number.parseInt(otherSlider.style.marginLeft) - 2);
        }
    
        mouseUp(event) {
    
            document.removeEventListener("mousemove", this.mouseMove);
            document.removeEventListener("mouseup", this.mouseUp);
            document.removeEventListener("touchmove", this.mouseMove);
            document.removeEventListener("touchend", this.mouseUp);
    
            mouseMove({ isLastUpdate: true });
    
            this.update();//вызывается update() из контроллера, который обновляет все представления(или какието определенные) и модель(если нужно)
        } */
}