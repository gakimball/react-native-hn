import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject(stores => ({
  tintColor: stores.settings.color,
}))
export default class ListPicker extends Component {
  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    })).isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    tintColor: PropTypes.string.isRequired,
    value: PropTypes.any,
  }

  static styles = StyleSheet.create({
    label: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#ccc',
    },
    label_text: {
      fontWeight: 'bold',
      color: '#666',
    },
    choice: {
      padding: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#ccc',
    },
    text: {},
    text_selected: {
      color: 'red',
    },
  })

  getChoiceTextStyle(value) {
    const { styles } = this.constructor;

    if (value === this.props.value) {
      return [styles.text, {
        color: this.props.tintColor,
        fontWeight: 'bold',
      }];
    }

    return styles.text;
  }

  handleChange = choice => {
    this.props.onChange(choice);
  }

  render() {
    const { styles } = this.constructor;
    const { choices, label, value } = this.props;

    return (
      <View>
        <View style={styles.label}>
          <Text style={styles.label_text}>{label}</Text>
        </View>
        {choices.map(({ label, value }) =>
          <TouchableHighlight key={value} underlayColor="#f9f9f9" style={styles.choice} onPress={() => this.handleChange(value)}>
            <Text style={this.getChoiceTextStyle(value)}>{label}</Text>
          </TouchableHighlight>
        )}
      </View>
    )
  }
}
