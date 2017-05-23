import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';
import Stories from './routes/stories';
import colors from './constants/colors';

export default class App extends Component {
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
        tintColor={colors.primary}
      />
    );
  }
}
