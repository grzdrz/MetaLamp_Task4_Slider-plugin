import { View } from "./View.js";

import { SlidersContainer } from "../elements/SlidersContainer.js";
import { Handle } from "../elements/Slider.js";
import { FilledStrip } from "../elements/FilledStrip.js";
import { EmptyStrip } from "../elements/EmptyStrip.js";

export class SliderView extends View {
    constructor(mainContentContainer) {
        super();

        this.slidersContainer = mainContentContainer;

        this._handlerMouseDown = this._handlerMouseDown.bind(this);

        this.updateInputs = () => { };
    }

    initialize() {
        this._render();
    }

    update(neededRerender) {
        if (neededRerender) {
            this._render();
        }
        else {
            for (let elementName in this) {
                if (this[elementName].calculatePosition)
                    this[elementName].calculatePosition();
            }
        }
    }

    _render() {
        let modelData = this.getModelData();

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
        }


        this.slidersContainerInstance = new SlidersContainer(this, this.slidersContainer);
        this.firstSliderInstance = new Handle(this, this.firstSlider, this.firstSliderBorder, 1);
        if (modelData.hasTwoSlider) this.lastSliderInstance = new Handle(this, this.lastSlider, this.lastSliderBorder, 2);
        this.emptyStripInstance = new EmptyStrip(this, this.emptyStrip);
        this.filledStripInstance = new FilledStrip(this, this.filledStrip);

        for (let elementName in this) {
            if (this[elementName].initialize)
                this[elementName].initialize();
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
        let cursorMouseDownPosition;//место нажатия левой кнопки мыши
        if (modelData.orientation === "horizontal") {
            if (event.changedTouches) cursorMouseDownPosition = event.changedTouches[0].pageX;
            else cursorMouseDownPosition = event.clientX;
        }
        else if (modelData.orientation === "vertical") {
            if (event.changedTouches) cursorMouseDownPosition = event.changedTouches[0].pageY;
            else cursorMouseDownPosition = event.clientY;
            cursorMouseDownPosition = (document.documentElement.clientHeight + pageYOffset) - cursorMouseDownPosition;
        }

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

        let targetSliderBoundingCoords = targetSliderInstance.DOMElement.getBoundingClientRect();
        //расстояние между местом нажатия кнопки мыши внутри бегунка и левым краем бегунка(где внутри бегунка находится курсор)
        let mousePositionInsideTargetSlider;
        if (modelData.orientation === "horizontal") {
            mousePositionInsideTargetSlider = cursorMouseDownPosition - targetSliderBoundingCoords.x;
        }
        else if (modelData.orientation === "vertical") {
            mousePositionInsideTargetSlider = cursorMouseDownPosition - (document.documentElement.clientHeight - pageYOffset - targetSliderBoundingCoords.y - targetSliderBoundingCoords.height);
        }


        let optionsForMouseEvents = {
            handlerMouseMove: null,
            handlerMouseUp: null,
            mousePositionInsideTargetSlider: mousePositionInsideTargetSlider,
            targetSliderInstance: targetSliderInstance,
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

        let mouseGlobalPosition;
        if (modelData.orientation === "horizontal") {
            if (event.changedTouches) mouseGlobalPosition = event.changedTouches[0].pageX;
            else mouseGlobalPosition = event.clientX;
        }
        else if (modelData.orientation === "vertical") {
            if (event.changedTouches) mouseGlobalPosition = event.changedTouches[0].pageY;
            else mouseGlobalPosition = event.clientY;
            mouseGlobalPosition = (document.documentElement.clientHeight + pageYOffset) - mouseGlobalPosition;
        }

        //значение в заданных единицах пропорциональное пиксельным координатам курсора в контейнере
        let newTargetInputValue = this._calculateValueProportionalToPixelValue([
            modelData,
            mouseGlobalPosition,
            mousePositionInsideTargetSlider,
            targetHandleCountNumber
        ]);

        if (optionsFromMouseDown.isLastUpdate && targetHandleCountNumber === 1) {
            if (newTargetInputValue <= modelData.minValue) {
                newTargetInputValue = modelData.minValue;
            }
            else if (modelData.hasTwoSlider) {
                if (newTargetInputValue >= modelData.lastValue) {
                    newTargetInputValue = modelData.lastValue;
                }
            }
            else {
                if (newTargetInputValue >= modelData.maxValue) {
                    newTargetInputValue = modelData.maxValue;
                }
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

        let isLowestThenLastValue;
        if (modelData.hasTwoSlider)
            isLowestThenLastValue = newTargetInputValue <= modelData.lastValue;
        else
            isLowestThenLastValue = newTargetInputValue <= modelData.maxValue;

        if (targetHandleCountNumber === 1 &&
            newTargetInputValue !== modelData.firstValue &&
            isLowestThenLastValue &&
            newTargetInputValue >= modelData.minValue) {
            // перезапись значения инпута 
            this.updateInputs({ firstValue: newTargetInputValue });

            // перезапись значения позиции ползунка
            targetSliderInstance.calculatePosition();
            this.filledStripInstance.calculatePosition();
        }
        else if (modelData.hasTwoSlider) {
            if (targetHandleCountNumber === 2 &&
                newTargetInputValue !== modelData.lastValue &&
                newTargetInputValue >= modelData.firstValue &&
                newTargetInputValue <= modelData.maxValue) {
                // перезапись значения инпута 
                this.updateInputs({ lastValue: newTargetInputValue });

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

        optionsFromMouseDown.isLastUpdate = true;
        optionsFromMouseDown.handlerMouseMove(event);

        // optionsFromMouseDown.isLastUpdate и последний запуск optionsFromMouseDown.handlerMouseMove нужны для случаев
        // когда из-за быстрого движения курсора происходит неточный расчет координат курсора и при маленьких размерах хода
        // можно получить неточные значения на границах(при столкновении ползунков друг с другом или с предельными боковыми границами).
        // Финальный запуск handlerMouseMove в свою очередь просто приравнивает позиции ползунков и значения инпутов 
        // к соответствующим границам за которые они вышли. 
    }

    _calculateValueProportionalToPixelValue(args) {
        let [
            modelData,
            mouseGlobalPosition,
            mousePositionInsideTargetSlider,
            targetHandleCountNumber
        ] = args;

        let containerBoundingRect;
        if (modelData.orientation === "horizontal") {
            containerBoundingRect = this.slidersContainerInstance.DOMElement.getBoundingClientRect();
        }
        else if (modelData.orientation === "vertical") {
            containerBoundingRect = this.slidersContainerInstance.DOMElement.getBoundingClientRect();
            containerBoundingRect.y = (document.documentElement.clientHeight - pageYOffset) - (containerBoundingRect.y + containerBoundingRect.height);
        }

        let cursorPositionInContainer;
        if (modelData.orientation === "horizontal") {
            cursorPositionInContainer = mouseGlobalPosition - containerBoundingRect.x - mousePositionInsideTargetSlider;
        }
        else if (modelData.orientation === "vertical") {
            cursorPositionInContainer = mouseGlobalPosition - containerBoundingRect.y - mousePositionInsideTargetSlider;
        }

        let maxDistanceBetweenSliders;
        if (modelData.hasTwoSlider) {
            if (modelData.orientation === "horizontal") {
                targetHandleCountNumber === 2 ? cursorPositionInContainer -= this.firstSliderInstance.size.width : 0;
                maxDistanceBetweenSliders = containerBoundingRect.width - this.firstSliderInstance.size.width * 2;
            }
            else if (modelData.orientation === "vertical") {
                targetHandleCountNumber === 2 ? cursorPositionInContainer -= this.firstSliderInstance.size.height : 0;
                maxDistanceBetweenSliders = containerBoundingRect.height - this.firstSliderInstance.size.height * 2;
            }
        }
        else {
            if (modelData.orientation === "horizontal") {
                maxDistanceBetweenSliders = containerBoundingRect.width - this.firstSliderInstance.size.width;
            }
            else if (modelData.orientation === "vertical") {
                maxDistanceBetweenSliders = containerBoundingRect.height - this.firstSliderInstance.size.height;
            }
        }

        let deltaMaxMinValues = modelData.maxValue - modelData.minValue;

        let proportionalValue = (deltaMaxMinValues * cursorPositionInContainer) / (maxDistanceBetweenSliders) + modelData.minValue;

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