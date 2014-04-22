dpd.songcategories.get({"id": { $in : this.songcategories }, $sort: {$natural: 1}}, function(songcategories) {
    this.songcategories = songcategories;
});

//hide('songcategories');