const playlist = document.getElementById("playlist")
const showplaylistbutton = document.getElementById("show-playlist")
const albumcover2 = document.getElementById("album-cover")
const songname2 = document.getElementById("song-name")
const songauthor2 = document.getElementById("song-author")
const pausebutton = document.getElementById("pause")
const musicplayer = document.getElementById("music-player-wrapper")
const buttons = document.getElementsByClassName("button")
const durationbar = document.getElementById("duration-bar")
const songlist = [
    {
        name: "Resurrections",
        author: "Lena Raine",
        album: "Celeste"
    },
    {
        name: "Confronting Myself",
        author: "Lena Raine",
        album: "Celeste"
    },
    {
        name: "Mirror Temple B",
        author: "Lena Raine",
        album: "Celeste B-sides"
    },
    {
        name: "Farewell",
        author: "Lena Raine",
        album: "Celeste Farewell"
    }
]

let playlist_is_shown = false
// Toggles the playlist when the "Show/hide playlist" button is pressed
const playlisthandler = () => {
    if (playlist_is_shown === false) {
        showplaylist()
    } else {
        // Hiding playlist
        playlist_is_shown = false
        showplaylistbutton.textContent = "Show playlist"
        playlist.innerHTML = ""
    }
}


const showplaylist = () => {
    playlist_is_shown = true

    showplaylistbutton.textContent = "Hide playlist"

    // Adds a <div> element representing each song into the playlist
    songlist.forEach(song => {
        song.id = songlist.indexOf(song)
        // Creates the <div> element "songwrapper"
        songwrapper = document.createElement("div")
        songwrapper.id = song.id
        songwrapper.className = "playlist-song"

        // Plays the corresponding song when clicked on
        songwrapper.setAttribute("onclick","javascript: play("+song.id+")")

        // Button pressed/released animation
        songwrapper.addEventListener("mousedown",function() {
            song = document.getElementById(song.id)
            song.style.backgroundColor = "lightcyan"
            song.style.color = "indigo"
            song.style.transform = "translateY(1px)"
        })
        songwrapper.addEventListener("mouseup",function() {
            setTimeout(() => {song = document.getElementById(song.id)
                song.style.backgroundColor = ""
                song.style.color = ""
                song.style.transform = "translateY(-1px)"
                song.style.transform = ""
            }, 50);
        })
        playlist.append(songwrapper)

        // Album cover
        albumcover = document.createElement("img")
        albumsource = "Album covers/" + song.album + ".jpg"
        albumcover.src = albumsource
        albumcover.className = "playlist-album-cover"
        songwrapper.append(albumcover)
        
        // A smaller <div> element to contain song name and song author
        subwrapper = document.createElement("div")
        subwrapper.className = "playlist-subwrapper"
        songwrapper.append(subwrapper)
        
        // Song name
        songname = document.createElement("p")
        songname.className = "playlist-song-name"
        songname.textContent = song.name
        subwrapper.append(songname)
        
        // Song author
        songauthor = document.createElement("p")
        songauthor.className = "playlist-song-author"
        songauthor.textContent = song.author
        subwrapper.append(songauthor)
    })
}



let currentlyplaying = null
const play = (id) => {
    // Getting the song object from "songlist" array
    currentlyplaying = id
    song = songlist[id]

    // Changing interface based on current song object
    albumsource = "Album covers/" + song.album + ".jpg"
    albumcover2.src = albumsource // Album cover
    songname2.textContent = song.name // Song name
    songauthor2.textContent = song.author // Song author

    // Changes "resume" button back to "pause" (for good measures :D)
    pausebutton.className = "fa-solid fa-pause main-button button"
    pausebutton.setAttribute("onclick","javascript: pause()") 
    
    // Remove currently playing audio (if there is one)
    if (document.getElementById("audio-file") != null) {
        musicplayer.removeChild(document.getElementById("audio-file"))
    }

    // Add the <audio> element
    audio = document.createElement("audio")
    audio.id = "audio-file"
    musicplayer.append(audio)

    // Add the <source> element
    source = document.createElement("source")
    audiosource = "Music files/" + song.name + ".mp3"
    source.src = audiosource
    source.id = "audio-source"
    source.type = "audio/mpeg"
    audio.append(source)

    // Setting up duration text (aka the 0:00/0:00 thing)
    duration = document.getElementById("duration")
    setInterval(() => {
        currenttime = audio.currentTime
        currentminutes = Math.floor(currenttime/60)
        currentseconds = Math.floor(currenttime%60)
        if(currentseconds < 10) {
            currentseconds = "0" + currentseconds
        }
        totalduration = audio.duration
        totalminutes = Math.floor(totalduration/60)
        totalseconds = Math.floor(totalduration%60)
        if(totalseconds < 10) {
            totalseconds = "0" + totalseconds
        }
        if (totalduration != null) {
            duration.textContent = currentminutes + ":" + currentseconds + "/" + totalminutes + ":" + totalseconds
        } else {
            duration.textContent = "0:00"
        }
        
        
        // Moves the duration slider according to current time
        durationbar.value = audio.currentTime
        durationbar.max = totalduration
    }, 50);

    // Automatically starts playing the audio
    audio.play()

}

// Plays the audio file at a different time based on where the duration slider got slided
audio = document.getElementById("audio-file")
durationbar.addEventListener("input", function() {
    audio.currentTime = durationbar.value
    audio.pause()
})
durationbar.addEventListener("mouseup", function() {
    audio.currentTime = durationbar.value
    audio.play()
}) 

// Pause button
let paused = false 
const pause = () => { 
    audiofile =  document.getElementById("audio-file")
    if (audiofile != null) {
        if (paused === false) {
            audiofile.pause()
            paused = true
            pausebutton.className = "fa-solid fa-play button"
        } else {
            audiofile.play()
            paused = false
            pausebutton.className = "fa-solid fa-pause button"
        }
        
    }
}
    

const resume = () => {
    audiofile =  document.getElementById("audio-file")
    audiofile.play()
    pausebutton.className = "fa-solid fa-pause main-button button"
    pausebutton.setAttribute("onclick","javascript: pause()") 
}

const next = () => {
    if (currentlyplaying != null && (currentlyplaying + 1) < songlist.length) {
        play((currentlyplaying + 1))
    } 
}

const back = () => {
    if (currentlyplaying != null && currentlyplaying > 0) {
        play((currentlyplaying - 1))
    }
}


