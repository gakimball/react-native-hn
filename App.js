import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Navigator from './components/navigator';
import SettingsStore from './stores/settings';
import StoryStore from './stores/story';

export default class App extends Component {
  settings = new SettingsStore()

  stories = new StoryStore()

  render() {
    return (
      <Provider settings={this.settings} stories={this.stories}>
        <Navigator />
      </Provider>
    );
  }
}
