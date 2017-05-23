import React, { Component } from 'react';
import { View, WebView, StyleSheet, TabBarIOS, Text, SegmentedControlIOS, ScrollView } from 'react-native';
import CommentList from '../components/comment-list';
import colors from '../constants/colors';

export default class StoryView extends Component {
  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      container: {
        paddingTop: 64,
        flex: 1,
      },
      controls: {
        padding: 16,
      },
      webview: {
        flex: 1,
      },
    });

    this.webview =

    this.state = {
      comments: [],
      viewIndex: 0,
    };
  }

  loadComments() {
    Promise.all(this.props.story.kids.map(comment =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${comment}.json`)
        .then(res => res.json())
    ))
      .then(comments => {
        this.setState({ comments })
      });
  }

  handleSegmentedControlChange = event => {
    const index = event.nativeEvent.selectedSegmentIndex;

    this.setState({
      viewIndex: index,
    });

    if (index === 1) {
      this.loadComments();
    }
  }

  render() {
    const { styles } = this;
    const { story } = this.props;
    const { comments, viewIndex } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.controls}>
          <SegmentedControlIOS
            values={['Story', 'Comments']}
            selectedIndex={viewIndex}
            onChange={this.handleSegmentedControlChange}
            tintColor={colors.primary}
          />
        </View>
        <View style={styles.webview}>
          {viewIndex === 0 && (
            <WebView
              source={{
                uri: story.url,
              }}
              automaticallyAdjustContentInsets={false}
              renderLoading={() => <Text>Loading...</Text>}
            />
          )}
          {viewIndex === 1 && (
            <ScrollView>
              <CommentList comments={comments} />
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}
