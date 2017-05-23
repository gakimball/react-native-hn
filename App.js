import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Navigator from './components/navigator';
import SettingsStore from './stores/settings';

export default class App extends Component {
  settings = new SettingsStore()

  render() {
    return (
      <Provider settings={this.settings}>
        <Navigator />
      </Provider>
    );
  }
}
