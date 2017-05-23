import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';
import StoryView from '../routes/story';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default class Story extends Component {
  handlePress = () => {
    this.props.navigator.push({
      component: StoryView,
      title: this.props.story.title,
      passProps: {
        story: this.props.story,
      },
    });
  }

  render() {
    const { story } = this.props;

    return (
      <TouchableHighlight style={styles.container} onPress={this.handlePress} underlayColor="#f9f9f9">
        <Text>{story.title}</Text>
      </TouchableHighlight>
    );
  }
}
