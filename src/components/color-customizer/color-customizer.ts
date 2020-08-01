/* eslint-disable fsd/no-heavy-constructor */
import "./color-customizer.scss";

import ColorSlider from "./color-slider";

class ColorCustomizer {
    public containerElement: HTMLElement;

    public red: ColorSlider;

    public green: ColorSlider;

    public blue: ColorSlider;

    public alpha: ColorSlider;

    public colorSquare: HTMLElement;

    constructor(containerElement: HTMLElement) {
        this.containerElement = containerElement;

        const redContainer = <HTMLElement>(this.containerElement.querySelector(".js-color-customizer__red"));
        const greenContainer = <HTMLElement>(this.containerElement.querySelector(".js-color-customizer__green"));
        const blueContainer = <HTMLElement>(this.containerElement.querySelector(".js-color-customizer__blue"));
        const alphaContainer = <HTMLElement>(this.containerElement.querySelector(".js-color-customizer__alpha"));

        this.red = new ColorSlider(this, redContainer);
        this.green = new ColorSlider(this, greenContainer);
        this.blue = new ColorSlider(this, blueContainer);
        this.alpha = new ColorSlider(this, alphaContainer);

        this.colorSquare = <HTMLElement>(this.containerElement.querySelector(".js-color-customizer__color-square"));

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

export default ColorCustomizer;
