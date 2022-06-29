import { Grid, useMediaQuery } from "@mui/material";
import React from "react";
import AdicionaMusica from "./components/AdicionaMusica";
import Header from "./components/Header";
import ListaMusica from "./components/ListaMusica";
import TocadorMusica from "./components/TocadorMusica";
import { QueueReducer, SongReducer } from "./reducer";

export const SongContext = React.createContext({
  song: {
    id: '39171a96-7f98-4d34-b2ce-cca7a711054c',
    title: 'Uma História de Amor',
    artist: 'Ukurralle',
    thumbnail: 'https://lastfm.freetls.fastly.net/i/u/500x500/bed2de0673db45deb5974b791a2e76a7.jpg',
    url: 'https://www.youtube.com/watch?v=vEAaA1DWdU0',
    duration: 3.4
  },
  isPlaying: false,
});

export default function App() 
{
  const telaGrande = useMediaQuery('(min-width:900px');
  const initialSong = React.useContext(SongContext);
  const [currentSong, songDispatch] = React.useReducer(SongReducer, initialSong);
  const [currentQueue, queueDispatch] = React.useReducer(QueueReducer, []);

  return (
    <SongContext.Provider value={{currentSong, songDispatch}}>
      <Header />
      <Grid container style={{marginTop: '80px'}}>
        <Grid item md={7} xs={12}>
          <AdicionaMusica />
          <ListaMusica queue={{queueDispatch}}/>          
        </Grid>
        <Grid style={
            telaGrande ? 
            {position: 'fixed', width: '100%', right: 0, top: 80} : 
            {position: 'fixed', width: '100%', left: 0, bottom: 10}
          } 
          item md={5} xs={12}>
          <TocadorMusica queue={{currentQueue, queueDispatch}}/>
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}
