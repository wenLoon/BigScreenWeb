import React, { Component } from 'react';
import Video from './../../component/Video/index';

const data = [
    // { file_url:  'http://10.4.69.110:8080/l/test.mp4' },
    { file_url:  'http://192.168.1.178:80/hls/adbc/index.m3u8' },
    { file_url: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
    { file_url: 'http://10.4.69.110:8080/media/playlist.m3u8', videoType: 'stream' },
    { file_url: 'http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4' },
];
export default class index extends Component {
    render() {
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            sources: [
                {
                    src: '/videoFile/playlist.m3u8',
                    // type: 'video/mp4'
                },
            ],
        };
        return (
                <Video data={data} />
                // {/* <Video {...videoJsOptions} videoType={data.videoType ? 'stream' : ''} /> */}
        )
    }
}
