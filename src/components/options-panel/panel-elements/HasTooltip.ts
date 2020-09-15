import OptionPanelElement from './OptionPanelElement';

class HasTooltip extends OptionPanelElement {
  public build(): void {
    super.build();

    const { hasTooltip } = this.view.getViewData();

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = hasTooltip;
    input.className = 'options__checkbox-input js-options__input';

    const text = document.createElement('p');
    text.className = 'options__text';
    text.textContent = 'has tooltip ?';

    this.DOMElement.append(input);
    this.DOMElement.append(text);

    this.DOMElement.addEventListener('change', this.handlerInputChange);

    this.view.containerElement.append(this.DOMElement);
  }

  public update(): void {
    const { hasTooltip } = this.view.getViewData();
    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    input.checked = hasTooltip;
  }

  private handlerInputChange = (event: globalThis.Event) => {
    event.preventDefault();

    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    const dataToUpdate = {
      hasTooltip: input.checked,
    };

    this.view.setViewData(dataToUpdate);
  };
}

export default HasTooltip;
