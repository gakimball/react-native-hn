import React, { Component } from 'react';
import { ScrollView, RefreshControl, ListView, Text, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import Story from './story';

@inject(stores => ({
  refreshing: stores.stories.refreshing,
  stories: stores.stories.stories,
  getStories: () => stores.stories.getStories(),
}))
export default class StoryList extends Component {
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  componentDidMount() {
    this.props.getStories(true);
  }

  renderRow = story => {
    return <Story story={story} navigator={this.props.navigator} />;
  }

  handleRefresh = () => {
    this.props.getStories();
  }

  get storiesLoaded() {
    return this.props.stories.getRowCount() > 0;
  }

  render() {
    const { styles } = this;
    const { refreshing, stories } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />}
      >
        {this.storiesLoaded && <ListView dataSource={stories} renderRow={this.renderRow} />}
      </ScrollView>
    );
  }
}
