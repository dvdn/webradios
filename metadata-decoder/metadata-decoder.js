function webradioData() {
    this.url;
    this.currentSong;
}
webradioData.prototype.getCurrentSong = function() {
    console.log ("url :" + this.url);
    console.log ("Song name :" + this.currentSong);
};
