import React, { Component } from 'react';
import { ScrollView, RefreshControl, ListView, Text, StyleSheet } from 'react-native';
import Story from './story';

export default class StoryList extends Component {
  state = {
    refreshing: false,
    stories: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id,
    }),
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  componentDidMount() {
    this.fetchStories(true);
  }

  fetchStories(initial = true) {
    const getStory = story => fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json`)
      .then(res => res.json());

    const fetchStories = () => fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then(stories => Promise.all(stories.slice(0, 20).map(getStory)))
      .then(stories => {
        this.setState({
          refreshing: false,
          stories: this.state.stories.cloneWithRows(stories),
        });
      });

    if (initial) {
      fetchStories();
    } else {
      this.setState({
        refreshing: true,
      }, fetchStories);
    }
  }

  renderRow = story => {
    return <Story story={story} navigator={this.props.navigator} />;
  }

  handleRefresh = () => {
    this.fetchStories();
  }

  get storiesEmpty() {
    return this.state.stories.getRowCount() === 0;
  }

  render() {
    const { styles } = this;
    const { refreshing, stories } = this.state;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.handleRefresh} />}
      >
        {this.storiesEmpty
          ? <Text>Loading top stories...</Text>
          : <ListView dataSource={stories} renderRow={this.renderRow} />
        }
      </ScrollView>
    );
  }
}
