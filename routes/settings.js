import React, { Component } from 'react';
import { View, Text, ScrollView, Picker, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import ListPicker from '../components/list-picker';

@inject(stores => ({
  color: stores.settings.color,
  setColor: c => stores.settings.setColor(c),
}))
export default class SettingsView extends Component {
  static colors = [
    {
      label: 'Sassy',
      value: '#e62cc3',
    },
    {
      label: 'Fruity',
      value: '#2ce66b',
    },
    {
      label: 'Tangy',
      value: '#e6a12c',
    },
  ]

  styles = StyleSheet.create({
    container: {
      paddingTop: 64 + 16,
      justifyContent: 'flex-start',
    },
    text: {
      textAlign: 'center',
      padding: 16,
    },
    picker: {
      flex: 1,
    },
  })

  handlePickerChange = color => {
    this.props.setColor(color);
  }

  render() {
    const { styles } = this;
    const { colors } = this.constructor;
    const { color } = this.props;

    return (
      <View style={styles.container}>
        <ListPicker
          choices={colors}
          label="Theme Color"
          onChange={this.handlePickerChange}
          value={color}
        />
      </View>
    )
  }
}
