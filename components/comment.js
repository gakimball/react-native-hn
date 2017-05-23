import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import HTMLView from 'react-native-htmlview';
import CommentList from './comment-list';
import colors from '../constants/colors';

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.styles = StyleSheet.create({
      comment: {
        padding: 16,
        borderBottomWidth: 1,
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
        color: colors.primary,
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
        color: colors.primary,
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
    const { comment } = this.props;
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
                <FontAwesome name="comment" size={16} color={colors.primary} />
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
