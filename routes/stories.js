import React, { Component } from 'react';
import StoryList from '../components/story-list';

export default class StoriesView extends Component {
  render() {
    return (
      <StoryList navigator={this.props.navigator} />
    );
  }
}
