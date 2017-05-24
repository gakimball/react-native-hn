import { observable, action, extendObservable } from 'mobx';
import { ListView } from 'react-native';

export default class StoryStore {
  @observable refreshing = false

  @observable stories = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id,
  });

  @action getStories(initial = false) {
    const getStory = story => fetch(`https://hacker-news.firebaseio.com/v0/item/${story}.json`)
      .then(res => res.json());

    if (!initial) {
      this.refreshing = true;
    }

    fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => res.json())
      .then(stories => Promise.all(stories.slice(0, 20).map(getStory)))
      .then(stories => {
        this.refreshing = false;
        extendObservable(this, {
          stories: this.stories.cloneWithRows(stories),
        });
      });
  }
}
