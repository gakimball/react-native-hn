import { action, observable } from 'mobx';

export default class SettingsStore {
  @observable color = '#e62cc3'

  @action setColor(color) {
    if (typeof color !== 'string') {
      throw new TypeError(`Expected a string for color, but got ${typeof color}.`);
    }
    if (color[0] !== '#') {
      throw new Error('Expected a hex color.');
    }

    this.color = color;
  }
}
