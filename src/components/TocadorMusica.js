import { Pause, PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardMedia, IconButton, Slider, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { SongContext } from "../App";
import FilaMusica from "./FilaMusica";
import ReactPlayer from "react-player";

export default function TocadorMusica({ queue })
{
    const reactPlayerRef = React.useRef();
    const telaGrande = useMediaQuery('(min-width:900px');
    const { currentSong, songDispatch } = React.useContext(SongContext);
    const [ played, setPlayed ] = React.useState(0);
    const [ changing, setChanging] = React.useState(false);
    const [ playedSeconds, setPlayedSeconds ] = React.useState(0);
    const [ posicaoNaFila, setPosicaoNaFila ] = React.useState(0);

    React.useEffect(() => {
        const songIndex = queue.currentQueue.findIndex((song) => song.id === currentSong.song.id);
        setPosicaoNaFila(songIndex);
    },[queue, currentSong.song.id]);

    React.useEffect(() => {
        if(played > 0.99)
            handleSongNext();
    },[played])

    function handlePlayButton(){
        songDispatch({type: currentSong.isPlaying ? "PAUSE_SONG" : "PLAY_SONG"});
    }

    function handleSongProgress({ played, playedSeconds }){
        if(!changing)
            setPlayed(played);
        
        setPlayedSeconds(playedSeconds)
    }

    function handleSliderChange(event, newValue){
        setPlayed(newValue);
        reactPlayerRef.current.seekTo(played);
    }

    function handleSliderChanging(){
        setChanging(true)
    }

    function handleSliderChanged(){
        setChanging(false)
    }

    function handleSongPrevious(){
        const nextSong = queue.currentQueue[posicaoNaFila - 1];
        if(nextSong)
            songDispatch({type: "CHANGE_SONG", payload: { musica: nextSong }});
    }

    function handleSongNext(){
        const nextSong = queue.currentQueue[posicaoNaFila + 1];
        if(nextSong)
            songDispatch({type: "CHANGE_SONG", payload: { musica: nextSong }});
    }

    return(
        <>
            <Card style={{display: 'flex', flexDirection: 'column', margin: '10px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <CardContent>
                        <Typography variant="h5" component="h2">{currentSong.song.title}</Typography>
                        <Typography variant="subtitle1" component="h2">{currentSong.song.artist}</Typography>
                    </CardContent>

                    <CardActions>
                        <IconButton onClick={handleSongPrevious}>
                            <SkipPrevious />
                        </IconButton>
                        <IconButton onClick={handlePlayButton}>
                            {currentSong.isPlaying ? <Pause style={{fontSize: "40px"}}/> : <PlayArrow style={{fontSize: "40px"}}/>}
                        </IconButton>
                        <IconButton onClick={handleSongNext}>
                            <SkipNext />
                        </IconButton>
                        <Typography>{new Date(playedSeconds * 1000).toISOString().substr(11,8)}</Typography>
                    </CardActions>

                    <CardMedia image={currentSong.song.thumbnail} style={{width: '140px', height: '140px'}}/>
                </div>
                <Slider type="range" value={played} onChange={handleSliderChange} onMouseDown={handleSliderChanging} onMouseUp={handleSliderChanged} min={0} max={1} step={0.01} style={{marginLeft: '30px', width: '90%'}} />
                <ReactPlayer hidden ref={reactPlayerRef} url={currentSong.song.url} playing={currentSong.isPlaying} onProgress={handleSongProgress}/>
            </Card>
            {
                telaGrande &&
                <FilaMusica queue={queue}/>
            }
        </>
    )

}