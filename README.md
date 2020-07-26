# FSD_Task4
<p>FSD_Задание 4: Плагин слайдера</p>
<a href="https://grzdrz.github.io/FSD_Task4"><p>Github Pages</p></a>

# Сборка
```
$ npm install
$ npm run dev
```

# Запуск тестов
```
$ npm run test
```

# Как использовать
1) Подключить jQuery и сам плагин:
```
import "../plugin.ts";
import $ from "jquery";
```
2) С помощью jQuery выбрать нужный элемент-контейнер и вызвать функцию rangeSlider:
```
const slider = $(".js-some-container").rangeSlider(modelData, viewData);
```
где modelData и viewData объекты с нужными настройками(см. Настройки)


# Найстроки
1) Первый объект(modelData)

| Свойство | Тип | Значение по умолчанию | Описание |
| --- | --- | --- | --- |
| values | number[] | [0, 0] | Определяет values.length число ползунков, где элементы массива соответствуют условным значениям ползунков |
| minValue | number | -100 | Минимальное значение |
| maxValue | number | 100 | Максимальное значение |
| stepSize | number | 10 | Размер шага |
| canPush | boolean | true | Могут ли ползунки проталкивать друг друга при движении |

2) Второй объект(viewData)

| Свойство | Тип | Значение по умолчанию | Описание |
| --- | --- | --- | --- |
| sliderStripThickness | number | 10 | Толщина "рельсы" по которой движутся ползунки |
| handleWidth | number | 15 | Ширина ползунка |
| handleHeight | number | 15 | Высота ползунка |
| borderThickness | number | 5 | Толщина рамки вокруг ползунка |
| hasTooltip | boolean | true | Есть ли подсказки над ползунками |
| tooltipMargin | number | 10 | Отступ подсказки со значением от ползунка |
| hasScale | boolean | true | Есть ли шкала |
| maxSegmentsCount | number | 10 | Максимальное количество сегментов шкалы |
| scaleMargin | number | 30 | Отступ шкалы от основной части слайдера |
| angle | number | 0 | Угол наклона слайдера в градусах(от 0 до 90) |
| filledStrips | boolean[] | [true, false] | Определяет какие интервалы отрисовывать |
| isHandlesSeparated | boolean | false | Определяет будут ли ползунки заезжать друг на друга, или сталкиваться по своим границам |


# Методы

| Метод | Тип | Описание |
| --- | --- | --- |
| setData | (modelData: IModelData, viewData: IViewData) => void | Изменяет указанные настройки экземпляра плагина |
| getModelData | () => ModelData | Извлекает из экземпляра плагина настройки модели |
| getViewData | () => ViewData | Извлекает из экземпляра плагина настройки представлений |