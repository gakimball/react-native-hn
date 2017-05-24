import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Comment from './comment';

export default class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    comments: [],
  }

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
