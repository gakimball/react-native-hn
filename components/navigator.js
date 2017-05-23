import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';
import { inject } from 'mobx-react';
import Stories from '../routes/stories';

@inject(stores => ({
  tintColor: stores.settings.color,
}))
export default class Navigator extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Stories,
          title: 'Top Stories',
        }}
        style={{
          flex: 1,
        }}
        tintColor={this.props.tintColor}
      />
    );
  }
}
