var self = this;

if (this.artist.indexOf('(new)') !== -1) {
    dpd.artists.post({name: this.artist.replace('(new)', '')}, function(artist) {
        this.artist = artist.name;
    });
}

if (!this.itunesId) {
    dpd.itunes.get({displayText: this.displayText}, function(result, error) {
        if (error) {
            console.log(error);
        }
        
        if (result) {
            resultObj = JSON.parse(result.response.trim());
            if (resultObj && resultObj.results.length > 0) {
                self.itunesId = String(resultObj.results[0].trackId);
                self.itunesPreviewUrl = resultObj.results[0].previewUrl;
                self.itunesBuyUrl = resultObj.results[0].trackViewUrl;
            }
        }
    });
}