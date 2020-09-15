import OptionPanelElement from './OptionPanelElement';

class HandlesSeparated extends OptionPanelElement {
  public build(): void {
    super.build();

    const { isHandlesSeparated } = this.view.getViewData();

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = isHandlesSeparated;
    input.className = 'options__checkbox-input js-options__input';

    const text = document.createElement('p');
    text.className = 'options__text';
    text.textContent = 'is handles separated ?';

    this.DOMElement.append(input);
    this.DOMElement.append(text);

    this.DOMElement.addEventListener('change', this.handlerInputChange);

    this.view.containerElement.append(this.DOMElement);
  }

  public update(): void {
    const { isHandlesSeparated } = this.view.getViewData();
    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    input.checked = isHandlesSeparated;
  }

  private handlerInputChange = (event: globalThis.Event) => {
    event.preventDefault();

    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    const dataToUpdate = {
      isHandlesSeparated: input.checked,
    };

    this.view.setViewData(dataToUpdate);
  };
}

export default HandlesSeparated;
