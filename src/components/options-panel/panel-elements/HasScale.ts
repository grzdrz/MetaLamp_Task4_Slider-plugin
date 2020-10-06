import OptionPanelElement from './OptionPanelElement';

class HasScale extends OptionPanelElement {
  public build(): void {
    super.build();

    const { hasScale } = this.view.getViewData();

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = hasScale;
    input.className = 'options__checkbox-input js-options__input';

    const text = document.createElement('p');
    text.className = 'options__text';
    text.textContent = 'has scale ?';

    this.DOMElement.append(input);
    this.DOMElement.append(text);

    this.DOMElement.addEventListener('change', this.handleInputChange);

    this.view.containerElement.append(this.DOMElement);
  }

  public update(): void {
    const { hasScale } = this.view.getViewData();
    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    input.checked = hasScale;
  }

  private handleInputChange = (event: globalThis.Event) => {
    event.preventDefault();

    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    const dataToUpdate = {
      hasScale: input.checked,
    };

    this.view.setViewData(dataToUpdate);
  };
}

export default HasScale;
