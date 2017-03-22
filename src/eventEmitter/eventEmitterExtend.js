/**
 * Created by lijianxun on 2017/3/14.
 */
const events = require('events');

class MusicPlayer extends events {
    constructor(songName) {
        super();
        this.songName = songName;
    }
}

const musicPlayer = new MusicPlayer('逆流成河');


musicPlayer.on('play', function (track) {
    console.log('songName: ', this.songName); //可以取到this中的成员变量
    console.log('track: ', track);
});

musicPlayer.emit('play', '逆流成河开始唱了！');