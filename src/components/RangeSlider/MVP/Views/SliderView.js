import { View } from "./View.js";

import { SlidersContainer } from "./SliderParts/SliderContainer.js";
import { Handle } from "./SliderParts/Handle.js";
import { FilledStrip } from "./SliderParts/FilledStrip.js";
import { EmptyStrip } from "./SliderParts/EmptyStrip.js";

import { MathFunctions } from "../../Helpers/MathFunctions.js";
import { Vector } from "../../Helpers/Vector.js";

export class SliderView extends View {
    constructor(mainContentContainer) {
        super();

        this.slidersContainer = mainContentContainer;

        this._handlerMouseDown = this._handlerMouseDown.bind(this);

        this._sliderParts = [];

        this.onHandleMove = () => { };
        this.onModelOptionUpdate = () => { };
    }

    initialize() {
        this._render();
    }

    update(neededRerender) {
        if (neededRerender) {//полный перерендер всех элементов слайдера
            this._render();
        }
        else {//или просто обновление их состояний
            for (let part of this._sliderParts) {/////
                if (part.calculatePosition) part.calculatePosition();
            }
        }
    }

    _render() {
        let modelData = this.getModelData();
        this._sliderParts = [];

        this.slidersContainer.innerHTML = "";
        //---------------------------------------------------------------------------------------------------
        if (modelData.orientation === "horizontal") {
            this.slidersContainer.parentElement.classList.remove("range-slider__main-content-container_vertical");
            this.slidersContainer.parentElement.classList.add("range-slider__main-content-container_horizontal");
            this.slidersContainer.parentElement.parentElement.classList.remove("range-slider_vertical");
            this.slidersContainer.parentElement.parentElement.classList.add("range-slider_horizontal");
        }
        else {
            this.slidersContainer.parentElement.classList.remove("range-slider__main-content-container_horizontal");
            this.slidersContainer.parentElement.classList.add("range-slider__main-content-container_vertical");
            this.slidersContainer.parentElement.parentElement.classList.remove("range-slider_horizontal");
            this.slidersContainer.parentElement.parentElement.classList.add("range-slider_vertical");
        }
        //---------------------------------------------------------------------------------------------------

        if (modelData.orientation === "horizontal") {
            this.slidersContainer.style.width = `${modelData.sliderStripLength}px`;
            this.slidersContainer.style.height = "auto";
        }
        else if (modelData.orientation === "vertical") {
            this.slidersContainer.style.height = `${modelData.sliderStripLength}px`;
            this.slidersContainer.style.width = "auto";
        }

        this.emptyStrip = document.createElement("div");
        this.emptyStrip.className = "range-slider__slider-body-empty";
        if (modelData.orientation === "horizontal") {
            this.emptyStrip.style.width = `${modelData.sliderStripLength}px`;
            this.emptyStrip.style.height = `${modelData.sliderStripThickness}px`;
        }
        else if (modelData.orientation === "vertical") {
            this.emptyStrip.style.height = `${modelData.sliderStripLength}px`;
            this.emptyStrip.style.width = `${modelData.sliderStripThickness}px`;
        }
        this.slidersContainer.append(this.emptyStrip);

        this.filledStrip = document.createElement("div");
        this.filledStrip.className = "range-slider__slider-body-filled";
        this.slidersContainer.append(this.filledStrip);

        if (modelData.borderThickness !== undefined) {
            this.firstSliderBorder = document.createElement("div");
            this.firstSliderBorder.className = "range-slider__first-slider-outside";
            this.firstSliderBorder.dataset.sliderCountNumber = 1;
            this.slidersContainer.append(this.firstSliderBorder);
            if (modelData.hasTwoSlider) {
                this.lastSliderBorder = document.createElement("div");
                this.lastSliderBorder.className = "range-slider__last-slider-outside";
                this.lastSliderBorder.dataset.sliderCountNumber = 2;
                this.slidersContainer.append(this.lastSliderBorder);
            }
        }

        this.firstSlider = document.createElement("div");
        this.firstSlider.className = "range-slider__first-slider";
        this.firstSlider.dataset.sliderCountNumber = 1;
        this.firstSlider.style.width = `${modelData.handleWidth}px`;
        this.firstSlider.style.height = `${modelData.handleHeight}px`;
        this.slidersContainer.append(this.firstSlider);
        if (modelData.hasTwoSlider) {
            this.lastSlider = document.createElement("div");
            this.lastSlider.className = "range-slider__last-slider";
            this.lastSlider.dataset.sliderCountNumber = 2;
            this.lastSlider.style.width = `${modelData.handleWidth}px`;
            this.lastSlider.style.height = `${modelData.handleHeight}px`;
            this.slidersContainer.append(this.lastSlider);

            if (modelData.lastValue < modelData.firstValue)
                this.onModelOptionUpdate({
                    lastValue: modelData.firstValue,
                });
        }


        this.slidersContainerInstance = new SlidersContainer(this, this.slidersContainer);
        this._sliderParts.push(this.slidersContainerInstance);

        this.firstSliderInstance = new Handle(this, this.firstSlider, this.firstSliderBorder, 1);
        this._sliderParts.push(this.firstSliderInstance);

        if (modelData.hasTwoSlider) {
            this.lastSliderInstance = new Handle(this, this.lastSlider, this.lastSliderBorder, 2);
            this._sliderParts.push(this.lastSliderInstance);
        }

        this.emptyStripInstance = new EmptyStrip(this, this.emptyStrip);
        this._sliderParts.push(this.emptyStripInstance);

        this.filledStripInstance = new FilledStrip(this, this.filledStrip);
        this._sliderParts.push(this.filledStripInstance);

        for (let part of this._sliderParts) {/////
            if (part.initialize) part.initialize();
        }

        this._setEventHandlers(modelData);
    }

    _setEventHandlers(modelData) {
        this.firstSliderInstance.DOMElement.ondragstart = function () {
            return false;
        };
        this.firstSliderInstance.DOMElement.addEventListener("mousedown", this._handlerMouseDown);
        this.firstSliderInstance.DOMElement.addEventListener("touchstart", this._handlerMouseDown);
        this.firstSliderInstance.outsideDOMElement.addEventListener("mousedown", (event) => {
            this._handlerMouseDown(event);
        });
        this.firstSliderInstance.outsideDOMElement.addEventListener("touchstart", (event) => {
            this._handlerMouseDown(event);
        });

        if (modelData.hasTwoSlider) {
            this.lastSliderInstance.DOMElement.ondragstart = function () {
                return false;
            };
            this.lastSliderInstance.DOMElement.addEventListener("mousedown", this._handlerMouseDown);
            this.lastSliderInstance.DOMElement.addEventListener("touchstart", this._handlerMouseDown);
            this.lastSliderInstance.outsideDOMElement.addEventListener("mousedown", (event) => {
                this._handlerMouseDown(event);
            });
            this.lastSliderInstance.outsideDOMElement.addEventListener("touchstart", (event) => {
                this._handlerMouseDown(event);
            });
        }
    }

    //d&d
    _handlerMouseDown(event) {
        event.preventDefault();

        let modelData = this.getModelData();
        /* let cursorMouseDownPosition = new Vector(0 ,0);//место нажатия левой кнопки мыши */
        /* if (modelData.orientation === "horizontal") {
            if (event.changedTouches) cursorMouseDownPosition = event.changedTouches[0].pageX;
            else cursorMouseDownPosition = event.clientX;
        }
        else if (modelData.orientation === "vertical") {
            if (event.changedTouches) cursorMouseDownPosition = event.changedTouches[0].pageY;
            else cursorMouseDownPosition = event.clientY;
            cursorMouseDownPosition = (document.documentElement.clientHeight + pageYOffset) - cursorMouseDownPosition;
        } */
        let cursorMouseDownPositionX;
        let cursorMouseDownPositionY;
        if (event.changedTouches) {
            cursorMouseDownPositionX = event.changedTouches[0].pageX;
            cursorMouseDownPositionY = event.changedTouches[0].pageY
        }
        else {
            cursorMouseDownPositionX = event.clientX;
            cursorMouseDownPositionY = event.clientY;
        }
        cursorMouseDownPositionY = (document.documentElement.clientHeight + pageYOffset) - cursorMouseDownPositionY;
        //cursorMouseDownPositionX =;
        let cursorMouseDownPosition = new Vector(cursorMouseDownPositionX, cursorMouseDownPositionY);//место нажатия левой кнопки мыши 

        let sliderCountNumber = Number.parseInt(event.currentTarget.dataset.sliderCountNumber);
        let targetSliderInstance;
        let targetHandleCountNumber;
        if (sliderCountNumber === 1) {
            targetSliderInstance = this.firstSliderInstance;
            targetHandleCountNumber = 1;
        }
        else if (modelData.hasTwoSlider) {
            targetSliderInstance = this.lastSliderInstance;
            targetHandleCountNumber = 2;
        }

        /* let targetSliderBoundingCoords = targetSliderInstance.DOMElement.getBoundingClientRect(); */
        //расстояние между местом нажатия кнопки мыши внутри бегунка и левым краем бегунка(где внутри бегунка находится курсор)
        /* let mousePositionInsideTargetSlider;
        if (modelData.orientation === "horizontal") {
            mousePositionInsideTargetSlider = cursorMouseDownPosition - targetSliderBoundingCoords.x;
        }
        else if (modelData.orientation === "vertical") {
            mousePositionInsideTargetSlider = cursorMouseDownPosition - (document.documentElement.clientHeight - pageYOffset - targetSliderBoundingCoords.y - targetSliderBoundingCoords.height);
        } */
        let targetSliderBoundingCoords = targetSliderInstance./* outsideDOMElement */DOMElement.getBoundingClientRect();
        let mousePositionInsideTargetSliderX = cursorMouseDownPosition.x - targetSliderBoundingCoords.x;
        let mousePositionInsideTargetSliderY = cursorMouseDownPosition.y - (document.documentElement.clientHeight + pageYOffset - targetSliderBoundingCoords.y - targetSliderInstance.size.height/* targetSliderBoundingCoords.height */);
        let mousePositionInsideTargetSlider = new Vector(mousePositionInsideTargetSliderX, mousePositionInsideTargetSliderY);


        let optionsForMouseEvents = {
            handlerMouseMove: null,
            handlerMouseUp: null,
            mousePositionInsideTargetSlider: mousePositionInsideTargetSlider,
            targetSliderInstance: targetSliderInstance,
            targetHandleCountNumber: targetHandleCountNumber,
        };
        let handlerMouseMove = this._handlerMouseMove.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseMove = handlerMouseMove;// чтобы обработчик mouseMove можно было отписать

        let handlerMouseUp = this._handlerMouseUp.bind(this, optionsForMouseEvents);
        optionsForMouseEvents.handlerMouseUp = handlerMouseUp;// -//-

        document.addEventListener("mousemove", handlerMouseMove);
        document.addEventListener("mouseup", handlerMouseUp);
        document.addEventListener("touchmove", handlerMouseMove);
        document.addEventListener("touchend", handlerMouseUp);
    }

    _handlerMouseMove(optionsFromMouseDown, event) {
        let modelData = this.getModelData();
        let {
            mousePositionInsideTargetSlider,
            targetSliderInstance,
            targetHandleCountNumber,
        } = optionsFromMouseDown;

        /* let mouseGlobalPosition;
        if (modelData.orientation === "horizontal") {
            if (event.changedTouches) mouseGlobalPosition = event.changedTouches[0].pageX;
            else mouseGlobalPosition = event.clientX;
        }
        else if (modelData.orientation === "vertical") {
            if (event.changedTouches) mouseGlobalPosition = event.changedTouches[0].pageY;
            else mouseGlobalPosition = event.clientY;
            mouseGlobalPosition = (document.documentElement.clientHeight + pageYOffset) - mouseGlobalPosition;
        } */
        let mouseGlobalPositionX;
        let mouseGlobalPositionY;
        if (event.changedTouches) {
            mouseGlobalPositionX = event.changedTouches[0].pageX;
            mouseGlobalPositionY = event.changedTouches[0].pageY
        }
        else {
            mouseGlobalPositionX = event.clientX;
            mouseGlobalPositionY = event.clientY;
        }
        mouseGlobalPositionY = (document.documentElement.clientHeight + pageYOffset) - mouseGlobalPositionY;
        //mouseGlobalPositionX =;
        let mouseGlobalPosition = new Vector(mouseGlobalPositionX, mouseGlobalPositionY);//место нажатия левой кнопки мыши 

        //значение в заданных единицах пропорциональное пиксельным координатам курсора в контейнере
        let newTargetInputValueVector = this._calculateValueProportionalToPixelValue([
            modelData,
            mouseGlobalPosition,
            mousePositionInsideTargetSlider,
            targetHandleCountNumber
        ]);
        let newTargetInputValue = newTargetInputValueVector/* .width *//* length */;

        if (targetHandleCountNumber === 1 &&
            newTargetInputValue !== modelData.firstValue) {
            if (newTargetInputValue < modelData.minValue)
                this.onHandleMove({ firstValue: modelData.minValue });
            else if (newTargetInputValue > modelData.lastValue && modelData.hasTwoSlider)
                this.onHandleMove({ firstValue: modelData.lastValue });
            else if (newTargetInputValue > modelData.maxValue)
                this.onHandleMove({ firstValue: modelData.maxValue });
            else
                this.onHandleMove({ firstValue: newTargetInputValue });

            // перезапись значения позиции ползунка
            targetSliderInstance.calculatePosition();
            this.filledStripInstance.calculatePosition();
        }
        else if (modelData.hasTwoSlider) {
            if (targetHandleCountNumber === 2 &&
                newTargetInputValue !== modelData.lastValue) {
                if (newTargetInputValue > modelData.maxValue)
                    this.onHandleMove({ lastValue: modelData.maxValue });
                else if (newTargetInputValue < modelData.firstValue)
                    this.onHandleMove({ lastValue: modelData.firstValue });
                else
                    this.onHandleMove({ lastValue: newTargetInputValue });

                // перезапись значения позиции ползунка
                targetSliderInstance.calculatePosition();
                this.filledStripInstance.calculatePosition();
            }
        }
    }

    _handlerMouseUp(optionsFromMouseDown, event) {
        document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("mouseup", optionsFromMouseDown.handlerMouseUp);
        document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("touchend", optionsFromMouseDown.handlerMouseUp);
    }

    _calculateValueProportionalToPixelValue(args) {
        let [
            modelData,
            mouseGlobalPosition,
            mousePositionInsideTargetSlider,
            targetHandleCountNumber
        ] = args;

        /*         let containerBoundingRect = this.slidersContainerInstance.DOMElement.getBoundingClientRect();
                let cursorPositionInContainer;
                let maxDistanceBetweenSliders; */
        /*         if (modelData.orientation === "horizontal") {
                    cursorPositionInContainer = mouseGlobalPosition - containerBoundingRect.x - mousePositionInsideTargetSlider;
                    if (modelData.hasTwoSlider) {
                        targetHandleCountNumber === 2 ? cursorPositionInContainer -= this.firstSliderInstance.size.width : 0;
                        maxDistanceBetweenSliders = containerBoundingRect.width - this.firstSliderInstance.size.width * 2;
                    }
                    else {
                        maxDistanceBetweenSliders = containerBoundingRect.width - this.firstSliderInstance.size.width;
                    }
                }
                else if (modelData.orientation === "vertical") {
                    containerBoundingRect.y = (document.documentElement.clientHeight - pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height);
                    cursorPositionInContainer = mouseGlobalPosition - containerBoundingRect.y - mousePositionInsideTargetSlider;
                    if (modelData.hasTwoSlider) {
                        targetHandleCountNumber === 2 ? cursorPositionInContainer -= this.firstSliderInstance.size.height : 0;
                        maxDistanceBetweenSliders = containerBoundingRect.height - this.firstSliderInstance.size.height * 2;
                    }
                    else {
                        maxDistanceBetweenSliders = containerBoundingRect.height - this.firstSliderInstance.size.height;
                    }
                } */
        //if (modelData.orientation === "horizontal") {
        //cursorPositionInContainer = mouseGlobalPosition - containerBoundingRect.x - mousePositionInsideTargetSlider;
        let maxDistanceBetweenSliders = new Vector(0, 0);
        let containerBoundingRect = this.slidersContainerInstance.DOMElement.getBoundingClientRect();
        let handle = this.firstSliderInstance;
        /*         let handleSize = handle.size;
                let styles = getComputedStyle(this.slidersContainerInstance.DOMElement);
                let borderWidthTop = Number.parseInt(styles.borderTopWidth);
                let borderWidthBottom = Number.parseInt(styles.borderBottomWidth); */
        containerBoundingRect.x = containerBoundingRect.x /* + (handleSize.height / 2 - (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2) */;
        containerBoundingRect.y = (document.documentElement.clientHeight + pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height) /* + (handleSize.height / 2 - (modelData.sliderStripThickness + borderWidthTop + borderWidthBottom) / 2) */;
        //let radFromDeg = modelData.angle * (Math.PI / 180);
        /* containerBoundingRect.width = modelData.sliderStripLength * Math.cos(radFromDeg);
        containerBoundingRect.height = modelData.sliderStripLength * Math.sin(radFromDeg); */


        let cursorPositionInContainer = new Vector(0, 0);
        cursorPositionInContainer.x = mouseGlobalPosition.x - containerBoundingRect.x - mousePositionInsideTargetSlider.x/*  - handle.size.width / 2 */;
        cursorPositionInContainer.y = mouseGlobalPosition.y - containerBoundingRect.y - mousePositionInsideTargetSlider.y;
        if (modelData.hasTwoSlider) {
            if (targetHandleCountNumber === 2) {
                cursorPositionInContainer.x = cursorPositionInContainer.x - this.firstSliderInstance.size.width;
                cursorPositionInContainer.y = cursorPositionInContainer.y - this.firstSliderInstance.size.width/* height */;
            }
            maxDistanceBetweenSliders.x = modelData.sliderStripLength - this.firstSliderInstance.size.width * 2;
            maxDistanceBetweenSliders.y = modelData.sliderStripLength - this.firstSliderInstance.size.width/* height */ * 2;
            //targetHandleCountNumber === 2 ? cursorPositionInContainer -= this.firstSliderInstance.size.width : 0;
            //maxDistanceBetweenSliders = containerBoundingRect.width - this.firstSliderInstance.size.width * 2;
            //targetHandleCountNumber === 2 ? cursorPositionInContainer -= this.firstSliderInstance.size.height : 0;
            //maxDistanceBetweenSliders = containerBoundingRect.height - this.firstSliderInstance.size.height * 2;
        }
        else {
            maxDistanceBetweenSliders.x = modelData.sliderStripLength - this.firstSliderInstance.size.width;
            maxDistanceBetweenSliders.y = modelData.sliderStripLength - this.firstSliderInstance.size.height;
        }
        /* //}
        //else if (modelData.orientation === "vertical") {
        containerBoundingRect.y = (document.documentElement.clientHeight - pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height);
        cursorPositionInContainer = mouseGlobalPosition - containerBoundingRect.y - mousePositionInsideTargetSlider;
        if (modelData.hasTwoSlider) {
            targetHandleCountNumber === 2 ? cursorPositionInContainer -= this.firstSliderInstance.size.height : 0;
            maxDistanceBetweenSliders = containerBoundingRect.height - this.firstSliderInstance.size.height * 2;
        }
        else {
            maxDistanceBetweenSliders = containerBoundingRect.height - this.firstSliderInstance.size.height;
        }
        //} */

        let deltaMaxMinValues = modelData.maxValue - modelData.minValue;
        let cursorPositionInContainerLength;
        if (modelData.angle === 0 || modelData.angle === 180) {
            cursorPositionInContainerLength = cursorPositionInContainer.x;
        }
        else if (modelData.angle === 90 || modelData.angle === 270) {
            cursorPositionInContainerLength = cursorPositionInContainer.y;
        }
        else if (cursorPositionInContainer.x <= 0 && cursorPositionInContainer.y <= 0) {
            cursorPositionInContainerLength = new Vector(cursorPositionInContainer.x, cursorPositionInContainer.y).length * (-1);
        }
        else {
            cursorPositionInContainerLength = new Vector(cursorPositionInContainer.x, cursorPositionInContainer.y).length;
        }
        let proportionalValue = (deltaMaxMinValues * cursorPositionInContainerLength) / (maxDistanceBetweenSliders.x) + modelData.minValue;
        return this._calculateNearestPositionForHandle(proportionalValue, modelData.stepSize, modelData.minValue);
        //let proportionalValue = (deltaMaxMinValues * cursorPositionInContainer) / (maxDistanceBetweenSliders) + modelData.minValue;

        /* let proportionalValueX = (deltaMaxMinValues * cursorPositionInContainer.x) / (maxDistanceBetweenSliders.x) + modelData.minValue;
        let proportionalValueY = (deltaMaxMinValues * cursorPositionInContainer.y) / (maxDistanceBetweenSliders.x) + modelData.minValue;
        let resultX = this._calculateNearestPositionForHandle(proportionalValueX, modelData.stepSize, modelData.minValue);
        let resultY = this._calculateNearestPositionForHandle(proportionalValueY, modelData.stepSize, modelData.minValue);
        return new Vector(resultX, resultY); */

        //расчет текущего значения исходя из размера шага
        //return this._calculateNearestPositionForHandle(proportionalValue, modelData.stepSize, modelData.minValue);
        //return new Vector(resultX, resultY);
    }

    // подменяем текущее значение инпута на число к которому ближе всего текущее значение курсора
    // т.е. например шаг 10, значение 78 -> на выходе получаем 80, 
    // или например  шаг 10, значение 73 -> на выходе получаем 70
    _calculateNearestPositionForHandle(value, stepSize, minValue) {
        let temp1;
        let temp3;
        if (minValue < 0) {
            temp1 = (value + Math.abs(minValue)) / stepSize;
            let temp2 = Math.round(temp1);
            temp3 = temp2 * stepSize - Math.abs(minValue);
        }
        else {
            temp1 = (value - Math.abs(minValue)) / stepSize;
            let temp2 = Math.round(temp1);
            temp3 = temp2 * stepSize + Math.abs(minValue);
        }
        return MathFunctions._cutOffJunkValuesFromFraction(temp3, stepSize);
    }
}