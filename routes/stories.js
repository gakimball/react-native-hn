import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StoryList from '../components/story-list';

export default class StoriesView extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  render() {
    return (
      <StoryList navigator={this.props.navigator} />
    );
  }
}
