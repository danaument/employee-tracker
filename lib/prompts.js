const inquirer = require('inquirer');
const [
    ALL_SONGS_BY_ARTIST,
    ARTISTS_WITH_TWO_OR_MORE_SONGS,
    SONGS_BY_RANGE,
    SPECIFIC_SONG,
    TOP_SONG_AND_ALBUM_BY_ARTIST
] = require('./const'); 

async function promptChoices() {
    try {
        answer = await inquirer
            .prompt({
                name: "name",
                type: "rawlist",
                message: "What would you like to do?",
                choices: [
                    ALL_SONGS_BY_ARTIST,
                    ARTISTS_WITH_TWO_OR_MORE_SONGS,
                    SONGS_BY_RANGE,
                    SPECIFIC_SONG,
                    TOP_SONG_AND_ALBUM_BY_ARTIST,
                    "EXIT"
                ]
            });

        return answer;
    } catch (error) {
        console.log(error);
    }
}

async function promptArtistName() {
    try {
        artist = await inquirer
            .prompt({
                name: "name",
                type: "input",
                message: "What is the artist name?"
            });

        return artist;
    } catch (error) {
        console.log(error);
    }
}

async function promptRange() {
    try {
        range = await inquirer
        .prompt([{
                name: "start",
                type: "input",
                message: "What is the start position?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                }
            },
            {
                name: "end",
                type: "input",
                message: "What is the end position?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                }
            }
        ]);

        return range;
    } catch (error) {
        console.log(error);
    }
}

async function promptSong() {
    try {
        song = await inquirer
        .prompt({
            name: "title",
            type: "input",
            message: "What is the song name?"
        });

        return song;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    promptChoices, 
    promptArtistName,
    promptRange,
    promptSong
};