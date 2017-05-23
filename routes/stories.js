import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ListView, NavigatorIOS, Animated } from 'react-native';
import Story from '../components/story';

export default class StoriesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id,
      }),
    };
  }

  componentDidMount() {
    this.fetchStories();
  }

  fetchStories() {
    const getStory = story => fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json`)
      .then(res => res.json());

    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then(stories => Promise.all(stories.slice(0, 20).map(getStory)))
      .then(stories => {
        this.setState({
          stories: this.state.stories.cloneWithRows(stories),
        });
      })
  }

  renderRow = story => {
    return <Story story={story} navigator={this.props.navigator} />;
  }

  get storiesEmpty() {
    return this.state.stories.getRowCount() === 0;
  }

  render() {
    const { stories } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.storiesEmpty
          ? <Text>Loading top stories...</Text>
          : <ListView dataSource={stories} renderRow={this.renderRow} />
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
