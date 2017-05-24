import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import HTMLView from 'react-native-htmlview';
import CommentList from './comment-list';

@inject(stores => ({
  tintColor: stores.settings.color,
}))
export default class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    last: PropTypes.bool.isRequired,
    tintColor: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      comment: {
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
      },
      comment_last: {
        borderBottomWidth: 0,
      },
      commentTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
      },
      replies: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
      },
      repliesText: {
        color: props.tintColor,
        fontWeight: 'bold',
        marginLeft: 8,
      },
    });

    this.bodyStyles = StyleSheet.create({
      p: {
        marginTop: 0,
        marginBottom: 8,
      },
      a: {
        color: props.tintColor,
      },
    });

    this.state = {
      childrenVisible: false,
      childComments: [],
    };
  }

  handlePressReplies = async comments => {
    const childComments = await Promise.all(comments.map(id =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
    ));

    this.setState({
      childrenVisible: true,
      childComments,
    });
  }

  get containerStyles() {
    if (this.props.last) {
      return [this.styles.comment, this.styles.comment_last];
    }

    return this.styles.comment;
  }

  render() {
    const { styles } = this;
    const { comment, tintColor } = this.props;
    const { childrenVisible, childComments } = this.state;

    return (
      <View style={this.containerStyles}>
        <Text style={styles.commentTitle}>{comment.by}</Text>
        <HTMLView value={comment.text} stylesheet={this.bodyStyles} />
        {childrenVisible
          ? (
            <CommentList comments={childComments} />
          )
          : (
            comment.kids && (
              <TouchableOpacity style={styles.replies} onPress={() => this.handlePressReplies(comment.kids)} activeOpacity={0.5}>
                <FontAwesome name="comment" size={16} color={tintColor} />
                <Text style={styles.repliesText}>
                  {`${comment.kids.length} ${comment.kids.length === 1 ? 'Reply' : 'Replies'}`}
                </Text>
              </TouchableOpacity>
            )
          )
        }
      </View>
    );
  }
}
