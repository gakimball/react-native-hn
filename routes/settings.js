import React, { Component } from 'react';
import { View, Text, ScrollView, Picker, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';

@inject(stores => ({
  color: stores.settings.color,
  setColor: c => stores.settings.setColor(c),
}))
export default class SettingsView extends Component {
  static colors = [
    ['Sassy', '#e62cc3'],
    ['Fruity', '#2ce66b'],
    ['Tangy', '#e6a12c'],
  ]

  styles = StyleSheet.create({
    container: {
      paddingTop: 64,
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
        <Text style={styles.text}>Theme Color</Text>
        <View style={styles.picker}>
          <Picker selectedValue={color} onValueChange={this.handlePickerChange}>
            {colors.map(([name, color]) =>
              <Picker.Item key={color} label={name} value={color} />
            )}
          </Picker>
        </View>
      </View>
    )
  }
}
