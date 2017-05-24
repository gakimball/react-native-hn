import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import StoriesView from '../routes/stories';
import SettingsView from '../routes/settings';

@inject(stores => ({
  tintColor: stores.settings.color,
}))
export default class Navigator extends Component {
  static propTypes = {
    tintColor: PropTypes.string.isRequired,
  }

  goToSettings() {
    this.nav.push({
      component: SettingsView,
      title: 'Settings',
    });
  }

  render() {
    return (
      <NavigatorIOS
        ref={e => {
          this.nav = e;
        }}
        initialRoute={{
          component: StoriesView,
          title: 'Top Stories',
          rightButtonTitle: 'Settings',
          onRightButtonPress: () => this.goToSettings(),
        }}
        style={{
          flex: 1,
        }}
        tintColor={this.props.tintColor}
      />
    );
  }
}
