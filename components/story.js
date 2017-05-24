import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, ActionSheetIOS } from 'react-native';
import StoryView from '../routes/story';

const noop = () => {};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
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

  handleLongPress = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Share', 'Close'],
      cancelButtonIndex: 1,
      title: this.props.story.title,
    }, index => {
      if (index === 0) {
        this.showShareDialog();
      }
    });
  }

  showShareDialog() {
    const { story } = this.props;

    ActionSheetIOS.showShareActionSheetWithOptions({
      url: story.url,
    }, noop, noop);
  }

  render() {
    const { story } = this.props;

    return (
      <TouchableHighlight style={styles.container} onPress={this.handlePress} onLongPress={this.handleLongPress} underlayColor="#f9f9f9">
        <Text>{story.title}</Text>
      </TouchableHighlight>
    );
  }
}
