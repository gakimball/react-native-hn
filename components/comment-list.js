import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Comment from './comment';

export default class CommentList extends Component {
  render() {
    const { comments } = this.props;

    return (
      <View>
        {comments.map((comment, i) =>
          <Comment
            key={comment.id}
            comment={comment}
            last={i === comments.length - 1}
          />
        )}
      </View>
    );
  }
}
