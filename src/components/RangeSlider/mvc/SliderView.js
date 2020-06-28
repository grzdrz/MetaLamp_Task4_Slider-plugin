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
        for (let elementName in this) {
            if (this[elementName].initialize)
                this[elementName].initialize();
        }

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

        this.firstSliderInstance.outsideDOMElement.addEventListener("mousedown", (event) => {
            this._handlerMouseDown(event);
        });
        this.lastSliderInstance.outsideDOMElement.addEventListener("mousedown", (event) => {
            this._handlerMouseDown(event);
        });
        this.firstSliderInstance.outsideDOMElement.addEventListener("touchstart", (event) => {
            this._handlerMouseDown(event);
        });
        this.lastSliderInstance.outsideDOMElement.addEventListener("touchstart", (event) => {
            this._handlerMouseDown(event);
        });
    }

    update() {
        for (let elementName in this) {
            if (this[elementName].calculatePosition)
                this[elementName].calculatePosition();
        }
    }

    //d&d
    _handlerMouseDown(event) {
        event.preventDefault();

        let cursorMouseDownPosX;//место нажатия левой кнопки мыши
        if (event.changedTouches) cursorMouseDownPosX = event.changedTouches[0].pageX;
        else cursorMouseDownPosX = event.clientX;

        let sliderCountNumber = Number.parseInt(event.currentTarget.dataset.sliderCountNumber);
        let targetSliderInstance;
        let targetSlider;
        let otherSliderInstance;
        let otherSlider;
        let targetHandleCountNumber;

        if (sliderCountNumber === 1) {
            targetSliderInstance = this.firstSliderInstance;
            otherSliderInstance = this.lastSliderInstance;
            targetHandleCountNumber = 1;
        }
        else {
            targetSliderInstance = this.lastSliderInstance;
            otherSliderInstance = this.firstSliderInstance;
            targetHandleCountNumber = 2;
        }
        targetSlider = targetSliderInstance.DOMElement;
        otherSlider = otherSliderInstance.DOMElement;

        let targetSliderBoundingCoords = targetSlider.getBoundingClientRect();

        //расстояние между местом нажатия кнопки мыши внутри бегунка и левым краем бегунка(где внутри бегунка находится курсор)
        let mousePositionInsideTargetSlider = cursorMouseDownPosX - targetSliderBoundingCoords.x;


        let optionsForMouseEvents = {
            handlerMouseMove: null,
            handlerMouseUp: null,
            mousePositionInsideTargetSlider: mousePositionInsideTargetSlider,
            targetSliderInstance: targetSliderInstance,
            targetSlider: targetSlider,
            otherSliderInstance: otherSliderInstance,
            otherSlider: otherSlider,
            targetHandleCountNumber: targetHandleCountNumber,
            isLastUpdate: false,
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
        let inputsValueRangeInTitle = targetSliderInstance
            .DOMElement.closest(".range-slider").querySelector(".range-slider__inputs-value-range");


        let mouseGlobalPosition;
        if (event.changedTouches) mouseGlobalPosition = event.changedTouches[0].pageX;
        else mouseGlobalPosition = event.clientX;

        //значение в заданных единицах пропорциональное пиксельным координатам курсора в контейнере
        let newTargetInputValue = this._calculateValueProportionalToPixelValue(modelData, mouseGlobalPosition, mousePositionInsideTargetSlider, targetHandleCountNumber);

        if (optionsFromMouseDown.isLastUpdate && targetHandleCountNumber === 1) {
            if (newTargetInputValue <= modelData.minValue) {
                newTargetInputValue = modelData.minValue;
            }
            else if (newTargetInputValue >= modelData.lastValue) {
                newTargetInputValue = modelData.lastValue;
            }
        }
        else if (optionsFromMouseDown.isLastUpdate && targetHandleCountNumber === 2) {
            if (newTargetInputValue >= modelData.maxValue) {
                newTargetInputValue = modelData.maxValue;
            }
            else if (newTargetInputValue <= modelData.firstValue) {
                newTargetInputValue = modelData.firstValue;
            }
        }

        if (targetHandleCountNumber === 1 &&
            newTargetInputValue !== modelData.firstValue &&
            newTargetInputValue <= modelData.lastValue &&
            newTargetInputValue >= modelData.minValue) {//первый ползунок

            // перезапись значения инпута 
            //--------------------------------------------------
            this.updateInputs({ firstValue: newTargetInputValue });
            //--------------------------------------------------

            // перезапись значения позиции ползунка
            //--------------------------------------------------
            targetSliderInstance.calculatePosition();
            this.filledStripInstance.calculatePosition();
            //--------------------------------------------------

            // перезапись титульника(тест)
            //--------------------------------------------------
            let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
            let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
            splitedInputsValueRangeTextInTitle[0] = newTargetInputValue.toString() + modelData.valueType;
            inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
            inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
            //--------------------------------------------------
        }
        else if (targetHandleCountNumber === 2 &&
            newTargetInputValue !== modelData.lastValue &&
            newTargetInputValue >= modelData.firstValue &&
            newTargetInputValue <= modelData.maxValue) {//второй ползунок
            // перезапись значения инпута 
            //--------------------------------------------------
            this.updateInputs({ lastValue: newTargetInputValue });
            //--------------------------------------------------

            // перезапись значения позиции ползунка
            //--------------------------------------------------
            targetSliderInstance.calculatePosition();
            this.filledStripInstance.calculatePosition();
            //--------------------------------------------------

            // перезапись титульника(тест)
            //--------------------------------------------------
            let inputsValueRangeTextInTitle = inputsValueRangeInTitle.textContent;
            let splitedInputsValueRangeTextInTitle = inputsValueRangeTextInTitle.split(/\s/i);
            splitedInputsValueRangeTextInTitle[2] = newTargetInputValue.toString() + modelData.valueType;
            inputsValueRangeTextInTitle = splitedInputsValueRangeTextInTitle.join(" ");
            inputsValueRangeInTitle.textContent = inputsValueRangeTextInTitle;
            //--------------------------------------------------
        }
    }

    _handlerMouseUp(optionsFromMouseDown, event) {
        document.removeEventListener("mousemove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("mouseup", optionsFromMouseDown.handlerMouseUp);
        document.removeEventListener("touchmove", optionsFromMouseDown.handlerMouseMove);
        document.removeEventListener("touchend", optionsFromMouseDown.handlerMouseUp);

        optionsFromMouseDown.isLastUpdate = true;
        optionsFromMouseDown.handlerMouseMove(event);

        // optionsFromMouseDown.isLastUpdate и последний запуск optionsFromMouseDown.handlerMouseMove нужны для случаев
        // когда из-за быстрого движения курсора происходит неточный расчет координат курсора и при маленьких размерах хода
        // можно получить неточные значения на границах(при столкновении ползунков друг с другом или с предельными боковыми границами).
        // Финальный запуск handlerMouseMove в свою очередь просто приравнивает позиции ползунков и значения инпутов 
        // к соответствующим границам за которые они вышли. 
    }



    _calculateValueProportionalToPixelValue(modelData, mouseGlobalPosition, mousePositionInsideTargetSlider, targetHandleCountNumber) {
        let containerBoundingRect = this.slidersContainerInstance.containerBoundingRect;

        let cursorPositionInContainer = mouseGlobalPosition - containerBoundingRect.x - mousePositionInsideTargetSlider /* - this.firstSliderInstance.size.width */;
        targetHandleCountNumber === 2 ? cursorPositionInContainer -= this.firstSliderInstance.size.width : 0;
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
            return Number.parseFloat(value.toFixed(countOfNumbers));
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