import {useEffect, useState} from "react";
import './App.css';
import React from 'react';
import background from "./images/background.jpeg";
import SpotifyLogo from "./images/spotify-logo.png";
function App() {
    const CLIENT_ID = ""
    const REDIRECT_URI = "https://coachella-lineup.web.app/"
    // const REDIRECT_URI = "http://localhost:3000/"
    // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    // const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    
    const scopes = 'user-top-read';


    const authUrl = 'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
      '&show_dialog=true';

    // const getToken = () => {
    //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    //     let token = urlParams.get('access_token');
    // }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()


        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    console.log("hi");    
    const topTracks = async (e) => { 
      const response = await fetch('https://api.spotify.com/v1/me/top/artists/?limit=50',{
        method: 'GET', headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
      console.log("hi");    
      const responseJson = await response.json();
      console.log(responseJson);
      
      for(var i = 0; i < 10; i++){   
        // const playlistTitleElement = document.getElementById('song-title');
        // playlistTitleElement.innerText += " "+ responseJson.items[i].name + " ";
        const genreElemenet = document.getElementById('genre');
        genreElemenet.innerText += "  " + responseJson.items[i].genres + "  ";  
            
   }

//    for(var j = 0; j < responseJson.items.length; j++){   
//     const playlistTitleElement2 = document.getElementById('song-container');
//     playlistTitleElement2.innerText += " "+ responseJson.items[j].name + " ";
//     // const genreElemenet = document.getElementById('genre');
//     // genreElemenet.innerText += "  " + responseJson.items[i].genres + "  ";  
        
// }
  
    
      const firstArtist = document.getElementById('first-artists');
      firstArtist.innerText += " "+ responseJson.items[0].name + " ";
     
    for(var k = 2; k < 25; k++ ){
      const first5Artist = document.getElementById('first-five-artists');
      first5Artist.innerText += " "+ responseJson.items[k].name + " ";
      
    }

    const secondArtist = document.getElementById('second-artists');
    secondArtist.innerText += " "+ responseJson.items[1].name + " ";

    for(var h = 25; h < 50; h++ ){
      const first5Artist = document.getElementById('next-25-artists');
      first5Artist.innerText += " "+ responseJson.items[h].name + " ";
     
    }

    }
    
    return (
        <div className="App">
            <header className="App-header">
            <div className="bg" style={{ backgroundImage:`url(${background})` }}>
            
    </div>
    < img src = {SpotifyLogo} alt="spotify-logo" className="spotify"/>
                <h1>Coachella</h1>
                <p className="desc">a coachella line up based on your Top 50 artists</p>
               
                {!token ?
                    <a href={authUrl}>Login
                        to Spotify</a>
                        
                   :  <button id="submitButton" onClick={topTracks}>get started</button>
                    
                    }

                {token ?	
                     <div>  
                       
                      <button onClick={logout}>Logout</button> 
                
                    <div id="song-container">
                    <p className='first-one' id="first-artists"></p>
                       <p className='first-five' id="first-five-artists"></p>
                       <br></br>
                       <p className='second-one' id="second-artists"></p>
                       <p className='last-few' id="next-25-artists"></p>
                       <br></br>
                       <p className='top-genres' onload={topTracks}>Your top genres</p>
                     </div>
                     
                     
                     <div>
                     
                     <p className="genres" id="genre"></p>
                     
                   </div>
 
                   </div>
                  
                     : <div></div>
                 }

            </header>
           
        </div>
    );
}

export default App;