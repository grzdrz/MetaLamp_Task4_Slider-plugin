import OptionPanelElement from './OptionPanelElement';

class CanPush extends OptionPanelElement {
  public build(): void {
    super.build();

    const { canPush } = this.view.getModelData();

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = canPush;
    input.className = 'options__checkbox-input js-options__input';

    const text = document.createElement('p');
    text.className = 'options__text';
    text.textContent = 'can push ?';

    this.DOMElement.append(input);
    this.DOMElement.append(text);

    this.DOMElement.addEventListener('change', this.handleInputChange);

    this.view.containerElement.append(this.DOMElement);
  }

  public update(): void {
    const { canPush } = this.view.getModelData();
    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    input.checked = canPush;
  }

  private handleInputChange = (event: globalThis.Event) => {
    event.preventDefault();

    const input = <HTMLInputElement>(this.DOMElement.querySelector('.js-options__input'));
    const dataToUpdate = {
      canPush: input.checked,
    };

    this.view.setModelData(dataToUpdate);
  };
}

export default CanPush;
