import React, { Component } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

let audioArr;
let audioIndex;
export class Index extends Component {
  state = {};

  componentDidMount() {
    this.getAudio();
  }

  getAudio = () => {
    const { data = [] } = this.props;
    if (data && data.length > 0) {
      audioArr = data;
      audioIndex = 0;
      // 音乐播放
      const myAudio = document.getElementById('videoBox');
      myAudio.preload = true;
      myAudio.controls = true;
      myAudio.loop = false;
      myAudio.src = data[audioIndex].file_url;
      myAudio.style.width = "100%";
      myAudio.style.height = "100%";
      // 播完时候播放下一首
      myAudio.addEventListener('ended', this.listenerVideoEnd.bind(this, myAudio), false);
      // myAudio.play();
    }
  };
  // 切换音乐
  ChangeMusic = myAudio => {
    if (audioArr.length - 1 <= audioIndex) {
      audioIndex = 0;
      myAudio.src = audioArr[0].file_url;
      myAudio.play();
    } else {
      audioIndex = ++audioIndex;
      myAudio.src = audioArr[audioIndex].file_url;
      myAudio.play();
    }
  };

  listenerVideoEnd = myAudio => {
    if (audioArr.length - 1 <= audioIndex) {
      audioIndex = 0;
      myAudio.src = audioArr[0].file_url;
      myAudio.play();
    } else {
      audioIndex = ++audioIndex;
      myAudio.src = audioArr[audioIndex].file_url;
      myAudio.play();
    }
  };
  // render() {
  //   return (
  //     <div>
  //       <video controls="controls" name="media" id={"videoBox"}>
  //         {/* //type="video/mp4" type="application/x-mpegURL"  */}
  //         <source src="" />
  //       </video>
  //     </div>
  //   );
  // }

  componentDidMount() {
    if (this.props.videoType) {
      // instantiate Video.js
      this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
        console.log('onPlayerReady', this);
      });
    } else {
      this.getAudio();
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player && this.props.videoType) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div style={{width:"100%", height:'100%'}}>
        {this.props.videoType ? (
          <div data-vjs-player>
            <video ref={node => (this.videoNode = node)} className="video-js"></video>
          </div>
        ) : (
            <video controls="controls" name="media" id={'videoBox'}>
              {/* //type="video/mp4" type="application/x-mpegURL"  */}
              <source src="" />
            </video>
          )}
      </div>
    );
  }
}

export default Index;
