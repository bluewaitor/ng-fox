import {Injectable} from '@angular/core';

@Injectable()
export class OverlayContainer {

  protected _containerElement: HTMLElement;

  constructor() {
  }

  getContainerElement(): HTMLElement {
    if (!this._containerElement) {
      this._createContainer();
    }
    return this._containerElement;
  }

  protected _createContainer(): void {
    const container = document.createElement('div');
    container.classList.add('fox-overlay-container');
    document.body.appendChild(container);
    this._containerElement = container;
  }

}
