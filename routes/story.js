import React, { Component } from 'react';
import { View, WebView, StyleSheet, Text, SegmentedControlIOS, ScrollView } from 'react-native';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import CommentList from '../components/comment-list';

@inject(stores => ({
  tintColor: stores.settings.color,
}))
export default class StoryView extends Component {
  static propTypes = {
    story: PropTypes.object.isRequired,
    tintColor: PropTypes.string.isRequired,
  }

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
        this.setState({ comments });
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
    const { story, tintColor } = this.props;
    const { comments, viewIndex } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.controls}>
          <SegmentedControlIOS
            values={['Story', 'Comments']}
            selectedIndex={viewIndex}
            onChange={this.handleSegmentedControlChange}
            tintColor={tintColor}
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
