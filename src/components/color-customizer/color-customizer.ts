/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable fsd/no-heavy-constructor */
import ColorSlider from "./color-slider";
import "./color-customizer.scss";

class ColorCustomizer {
    public containerElement: HTMLElement;
    public colorSquare: HTMLElement;

    public red: ColorSlider;
    public green: ColorSlider;
    public blue: ColorSlider;
    public alpha: ColorSlider;

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

        this.initialize();
    }

    public initialize(): void {
        this.changeSquareColor();
    }

    public changeSquareColor = () => {
        const rgba = `rgba(${this.red.color}, ${this.green.color}, ${this.blue.color}, ${this.alpha.color / 255})`;
        this.colorSquare.style.background = rgba;
    };
}

export default ColorCustomizer;
