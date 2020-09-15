import Vector from '../../Helpers/Vector';
import ViewManager from './ViewManager';

abstract class View {
  public containerElement: HTMLElement;
  public viewManager: ViewManager;

  constructor(containerElement: HTMLElement, viewManager: ViewManager) {
    this.containerElement = containerElement;
    this.viewManager = viewManager;
  }

  public abstract initialize(): void;

  public abstract build(): void;

  public abstract update(isNeedRebuild: boolean): void;

  public static renderPosition(htmlElement: HTMLElement, position: Vector): void {
    const element = htmlElement;

    const left = `${position.x}px`;
    element.style.left = left;

    const bottom = `${position.y}px`;
    element.style.bottom = bottom;
  }

  public static renderSize(htmlElement: HTMLElement, size: Vector): void {
    const element = htmlElement;

    const width = `${size.width}px`;
    element.style.width = width;

    const height = `${size.height}px`;
    element.style.height = height;
  }
}

export default View;
