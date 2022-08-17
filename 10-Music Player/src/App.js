import MusicInfo from './component/MusicInfo.js';
import Audio from './component/Audio.js';
import ImgContainer from './component/ImageContainer.js';
import Navigation from './component/Navigation.js';

const titleList = ['hey', 'summer', 'ukulele'];

export default class App {
  constructor($app) {
    this.state = {
      currentIdx: 0,
      play: false,
    };
    this.$target = $app;
    this.onClick = () => {
      this.$target.classList.add('play');
      this.setState({
        ...this.state,
        currentIdx:
          this.state.currentIdx + 1 >= titleList.length
            ? 0
            : this.state.currentIdx + 1,
        play: true,
      });
    };

    this.musicInfo = new MusicInfo({
      $app,
      initialState: titleList[this.state.currentIdx],
      onClickProgress: (clickPercent) => {
        this.audio?.setCurrentTime(clickPercent);
      },
    });

    this.audio = new Audio({
      $app,
      initialState: {
        music: titleList[this.state.currentIdx],
        play: this.state.play,
      },
      handleProgress: (width) => {
        this.musicInfo.progress(width);
      },
      onClickNext: this.onClick,
    });

    this.imgContainer = new ImgContainer({
      $app,
      initialState: titleList[this.state.currentIdx],
    });

    this.navigation = new Navigation({
      $app,
      initialState: this.state.play,
      onClickPrev: () => {
        this.$target.classList.add('play');
        this.setState({
          ...this.state,
          currentIdx:
            this.state.currentIdx - 1 < 0
              ? titleList.length - 1
              : this.state.currentIdx - 1,
          play: true,
        });
      },
      onClickPlay: () => {
        this.$target.classList.toggle('play');
        this.setState({
          ...this.state,
          play: !this.state.play,
        });
      },
      onClickNext: this.onClick,
    });
  }
  setState(nextState) {
    this.state = nextState;
    this.musicInfo.setState(titleList[this.state.currentIdx]);
    this.audio.setState({
      music: titleList[this.state.currentIdx],
      play: this.state.play,
    });
    this.imgContainer.setState(titleList[this.state.currentIdx]);
    this.navigation.setState(this.state.play);
  }
}
