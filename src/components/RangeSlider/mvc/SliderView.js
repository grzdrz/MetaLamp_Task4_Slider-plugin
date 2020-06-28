import { View } from "./View.js";

import { SlidersContainer } from "../elements/SlidersContainer.js";
import { Slider } from "../elements/Slider.js";
import { FilledStrip } from "../elements/FilledStrip.js";
import { EmptyStrip } from "../elements/EmptyStrip.js";

export class SliderView extends View {
    constructor(elements) {
        super();

        this._handlerMouseDown = this._handlerMouseDown.bind(this);

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

        this.firstSliderInstance.DOMElement.addEventListener("mousedown", this._handlerMouseDown);
        this.lastSliderInstance.DOMElement.addEventListener("mousedown", this._handlerMouseDown);

        this.firstSliderInstance.DOMElement.addEventListener("touchstart", this._handlerMouseDown);
        this.lastSliderInstance.DOMElement.addEventListener("touchstart", this._handlerMouseDown);
    }

    update() {
        this.slidersContainerInstance.calculatePosition();
        this.firstSliderInstance.calculatePosition();
        this.lastSliderInstance.calculatePosition();
        this.emptyStripInstance.calculatePosition();
        this.filledStripInstance.calculatePosition();
    }

    //d&d
    _handlerMouseDown(event) {
        event.preventDefault();
        /* let view = this; */

        let cursorMouseDownPosX;//место нажатия левой кнопки мыши
        if (event.changedTouches) cursorMouseDownPosX = event.changedTouches[0].pageX;
        else cursorMouseDownPosX = event.clientX;

        let sliderCountNumber = Number.parseInt(event.currentTarget.dataset.sliderCountNumber);
        let targetSliderInstance;
        let targetSlider;
        let otherSliderInstance;
        let otherSlider;
        let targetSliderIndex;

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

        let targetSliderBoundingCoords = targetSlider.getBoundingClientRect();

        //расстояние между местом нажатия кнопки мыши внутри бегунка и левым краем бегунка(где внутри бегунка находится курсор)
        let mousePositionInsideTargetSlider = cursorMouseDownPosX - targetSliderBoundingCoords.x;


        let optionsForMouseMove = {
            mousePositionInsideTargetSlider: mousePositionInsideTargetSlider,
            targetSliderInstance: targetSliderInstance,
            targetSlider: targetSlider,
            otherSliderInstance: otherSliderInstance,
            otherSlider: otherSlider,
            targetSliderIndex: targetSliderIndex,
        };
        let handlerMouseMove = this._handlerMouseMove.bind(this, optionsForMouseMove);

        let optionsForMouseUp = {
            handlerMouseMove: handlerMouseMove,//чтобы обработчик mouseMove можно было отписать
        };
        let handlerMouseUp = this._handlerMouseUp.bind(this, optionsForMouseUp);

        document.addEventListener("mousemove", handlerMouseMove);
        document.addEventListener("mouseup", handlerMouseUp);
        document.addEventListener("touchmove", handlerMouseMove);
        document.addEventListener("touchend", handlerMouseUp);
    }

    _handlerMouseMove(optionsFromMouseDown, event) {
        let mousePositionInsideTargetSlider = optionsFromMouseDown.mousePositionInsideTargetSlider;
        let targetSliderInstance = optionsFromMouseDown.targetSliderInstance;
        let targetSlider = optionsFromMouseDown.targetSlider;
        let otherSlider = optionsFromMouseDown.otherSlider;
        let targetSliderIndex = optionsFromMouseDown.targetSliderIndex;

        let modelData = this.getModelData();
        let inputMaxValue = modelData.maxValue;
        let inputMinValue = modelData.minValue;
        let inputsValueRangeInTitle = optionsFromMouseDown.targetSlider.parentElement.parentElement.querySelector(".range-slider__inputs-value-range");

        let slidersFilledStripInstance = this.filledStripInstance;

        let containerBoundingRect = this.slidersContainerInstance.containerBoundingRect;
        let slidersContainerWidth = this.slidersContainerInstance.size.width;

        let targetSliderBoundingCoords = targetSlider.getBoundingClientRect();
        let otherSliderCoordinates = otherSlider.getBoundingClientRect();
        let sliderWidth = targetSliderBoundingCoords.width;



        let mouseGlobalPosition;
        if (event.changedTouches) mouseGlobalPosition = event.changedTouches[0].pageX;
        else mouseGlobalPosition = event.clientX;

        {
            /* let newDeltaXForTargetSlider = Math.round(mouseGlobalPosition - containerBoundingRect.x - mousePositionInsideTargetSlider); */
            /*  if (!event.isLastUpdate) {
                //отрезок между левой границей контейнера и левой границей перетаскивоемого ползунка,
                //где граница определяется текущим положением мыши, а не положением самого ползунка
                let newDeltaXForTargetSlider = Math.round(mouseGlobalPosition - containerBoundingRect.x - mousePositionInsideTargetSlider);
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
                //валидация перехода за пределы другово ползунка
                if (newTargetSliderBoundingCoords.x + sliderWidth > otherSliderCoordinates.x) {
                    let newTargetSliderPosInContainer = otherSliderCoordinates.x - containerBoundingRect.x - sliderWidth;
                    targetSliderInstance.setPosition({ x: newTargetSliderPosInContainer });
                }
                else {
                    //изменение отступа и размера закрашенной полосы
                    let filledStripPosInContainer = newTargetSliderBoundingCoords.x - containerBoundingRect.x + sliderWidth / 2;
                    slidersFilledStripInstance.setPosition({ x: filledStripPosInContainer });
                    let filledStripWidth = otherSliderCoordinates.x - newTargetSliderBoundingCoords.x;
                    slidersFilledStripInstance.setSize({ width: filledStripWidth });
    
                    //запись значения в первый инпут
                    let targetSliderPosXInContainer = newTargetSliderBoundingCoords.x - containerBoundingRect.x;
                    let maxDistanceBetweenSliders = containerBoundingRect.width - newTargetSliderBoundingCoords.width * 2;
    
                    let maxInputDeltaValue = inputMaxValue - inputMinValue;
                    let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderPosXInContainer) / maxDistanceBetweenSliders + inputMinValue);
    
                    let temp1 = newTargetInputValue / Number.parseInt(modelData.stepSize);
                    let temp2 = Math.round(temp1);
                    let temp3 = temp2 * Number.parseInt(modelData.stepSize);
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
                    let newTargetSliderPosInContainer = otherSliderCoordinates.x - containerBoundingRect.x + sliderWidth;
                    targetSliderInstance.setPosition({ x: newTargetSliderPosInContainer });
                }
                else {
                    //изменение отступа и размера закрашенной полосы
                    let filledStripPosInContainer = otherSliderCoordinates.x - containerBoundingRect.x + sliderWidth / 2;
                    slidersFilledStripInstance.setPosition({ x: filledStripPosInContainer });
                    let filledStripWidth = newTargetSliderBoundingCoords.x - otherSliderCoordinates.x;
                    slidersFilledStripInstance.setSize({ width: filledStripWidth });
    
                    //запись значения во второй инпут
                    let targetSliderPosXInContainer = newTargetSliderBoundingCoords.x - containerBoundingRect.x - newTargetSliderBoundingCoords.width;
                    let maxDistanceBetweenSliders = containerBoundingRect.width - newTargetSliderBoundingCoords.width * 2;
    
                    let maxInputDeltaValue = inputMaxValue - inputMinValue;
                    let newTargetInputValue = Math.round((maxInputDeltaValue * targetSliderPosXInContainer) / maxDistanceBetweenSliders + inputMinValue);
    
                    let temp1 = newTargetInputValue / Number.parseInt(modelData.stepSize);
                    let temp2 = Math.round(temp1);
                    let temp3 = temp2 * Number.parseInt(modelData.stepSize);
                    newTargetInputValue = temp3;
    
                    this.updateInputs({ lastValue: newTargetInputValue });
    
                    let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
                    let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
                    splitedInputsValueRangeTextInTitle[2] = newTargetInputValue.toString() + modelData.valueType;
                    inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
                    inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
                }
            } */
        }


        {
            /* let newDeltaXForTargetSlider = Math.round(mouseGlobalPosition - containerBoundingRect.x - mousePositionInsideTargetSlider);
            if (!event.isLastUpdate) {
                //отрезок между левой границей контейнера и левой границей перетаскивоемого ползунка,
                //где граница определяется текущим положением мыши, а не положением самого ползунка
                let newDeltaXForTargetSlider = Math.round(mouseGlobalPosition - containerBoundingRect.x - mousePositionInsideTargetSlider);
                //targetSliderInstance.setPosition({ x: newDeltaXForTargetSlider });
    
                //проверка на выход за граничные значения
                if (newDeltaXForTargetSlider < 0) {
                    //targetSliderInstance.setPosition({ x: 0 });
                }
                else if (newDeltaXForTargetSlider + sliderWidth > slidersContainerWidth) {
                    //targetSliderInstance.setPosition({ x: slidersContainerWidth - sliderWidth });
                }
            } */
        }

        //значение в заданных единицах пропорциональное пиксельным координатам курсора в контейнере
        let newTargetInputValue = this._calculateValueProportionalToPixelValue(modelData, mouseGlobalPosition, mousePositionInsideTargetSlider);

        if (newTargetInputValue !== modelData.firstValue) {//типо первый ползунок

            // перезапись значения инпута 
            //--------------------------------------------------
            this.updateInputs({ firstValue: newTargetInputValue });
            //--------------------------------------------------

            // перезапись значения позиции ползунка
            //--------------------------------------------------
            let slidersContainerWidth = this.slidersContainerInstance.size.width;
            let dSliderInputFullValue = modelData.maxValue - modelData.minValue;
            let dSliderStripFullValue = slidersContainerWidth - sliderWidth * 2;
            let newTargetSliderPosInContainer = ((/* modelData.firstValue */newTargetInputValue - modelData.minValue) * dSliderStripFullValue) / dSliderInputFullValue;;
            targetSliderInstance.setPosition({ x: newTargetSliderPosInContainer });
            //--------------------------------------------------

            // перезапись титульника
            //--------------------------------------------------
            let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
            let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
            splitedInputsValueRangeTextInTitle[0] = newTargetInputValue.toString() + modelData.valueType;
            inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
            inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
            //--------------------------------------------------
        }
    }

    _handlerMouseUp(optionsFromMouseDown, event) {
        document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("mouseup", this._handlerMouseUp);
        document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("touchend", this._handlerMouseUp);
    }



    _calculateValueProportionalToPixelValue(modelData, mouseGlobalPosition, mousePositionInsideTargetSlider) {
        let containerBoundingRect = this.slidersContainerInstance.containerBoundingRect;

        let cursorPositionInContainer = mouseGlobalPosition - containerBoundingRect.x - mousePositionInsideTargetSlider;
        let maxDistanceBetweenSliders = containerBoundingRect.width - this.firstSliderInstance.size.width * 2;
        let deltaMaxMinValues = modelData.maxValue - modelData.minValue;

        let proportionalValue = (deltaMaxMinValues * cursorPositionInContainer) / maxDistanceBetweenSliders + modelData.minValue;

        //расчет текущего значения исходя из размера шага
        return this._calculateNearestPositionForHandler(proportionalValue, modelData.stepSize);
    }

    // подменяем текущее значение инпута на число к которому ближе всего текущее значение курсора
    // т.е. например шаг 10, значение 78 -> на выходе получаем 80, 
    // или например  шаг 10, значение 73 -> на выходе получаем 70
    _calculateNearestPositionForHandler(value, stepSize) {
        let temp1 = value / stepSize;
        let temp2 = Math.round(temp1);
        let temp3 = temp2 * stepSize;
        return this._cutOffJunkValuesFromFraction(temp3, stepSize);
    }

    // доп. обработка значения, на случай если шаг дробный для того чтобы убрать лишние дробные значения
    _cutOffJunkValuesFromFraction(value, stepSize) {
        // переводим значение шага в строку(попутно проверяя на наличие формата с экспонентой если дробь длинная)
        let temp411;
        if (this._hasEInNumber(stepSize)) {
            temp411 = this._getStringOfNumberWithoutE(stepSize);
        }
        else
            temp411 = stepSize.toString();

        // выделяем дробную часть
        let temp41 = temp411.split(".");
        let temp42 = temp41[1];

        // если дробная часть существует, то округляем значение до длины дробной части шага,
        // тем самым отрезая мусорные значения дроби, которые переодически появляются из-за неточностей при работе js с десятичными числами
        if (temp42) {
            let countOfNumbers = temp42.length;
            return value.toFixed(Number.parseInt(countOfNumbers));
        }
        else return value;
    }

    // заменяет строку с числом в формате с экспонентой на строку с числом в обычном формате
    // например "1e-9" -> на выходе получаем "0.000000001"
    // p.s. код стырен со стаковерфлове
    _getStringOfNumberWithoutE(number) {
        let data = number.toString().split(/[eE]/);
        if (data.length === 1) return data[0];

        let z = '',
            sign = this < 0 ? '-' : '',
            str = data[0].replace('.', ''),
            mag = Number(data[1]) + 1;

        if (mag < 0) {
            z = sign + '0.';
            while (mag++) z += '0';
            return z + str.replace(/^\-/, '');
        }
        mag -= str.length;
        while (mag--) z += '0';
        return str + z;
    }

    // проверка на запись очень большого(или маленького) числа через e(например 1e-10)
    _hasEInNumber(number) {
        let splitByE = number.toString().split("e");
        return splitByE.length === 2;
    }
}