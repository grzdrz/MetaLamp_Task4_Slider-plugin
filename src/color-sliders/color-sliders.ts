/* eslint-disable fsd/no-heavy-constructor */
import "./color-sliders.scss";

import ColorSlider from "./color-slider";

class ColorSliders {
    public containerElement: HTMLElement;

    public red: ColorSlider;

    public green: ColorSlider;

    public blue: ColorSlider;

    public alpha: ColorSlider;

    public colorSquare: HTMLElement;

    constructor(containerElement: HTMLElement) {
        this.containerElement = containerElement;

        const redContainer = <HTMLElement>(this.containerElement.querySelector(".js-color-sliders__red"));
        const greenContainer = <HTMLElement>(this.containerElement.querySelector(".js-color-sliders__green"));
        const blueContainer = <HTMLElement>(this.containerElement.querySelector(".js-color-sliders__blue"));
        const alphaContainer = <HTMLElement>(this.containerElement.querySelector(".js-color-sliders__alpha"));

        this.red = new ColorSlider(redContainer, this);
        this.green = new ColorSlider(greenContainer, this);
        this.blue = new ColorSlider(blueContainer, this);
        this.alpha = new ColorSlider(alphaContainer, this);

        this.colorSquare = <HTMLElement>(this.containerElement.querySelector(".js-color-sliders__color-square"));

        this.changeSquareColor = this.changeSquareColor.bind(this);

        this.initialize();
    }

    initialize(): void {
        this.changeSquareColor();
    }

    changeSquareColor(): void {
        const rgba = `rgba(${this.red.color}, ${this.green.color}, ${this.blue.color}, ${this.alpha.color / 255})`;
        this.colorSquare.style.background = rgba;
    }
}

export default ColorSliders;
