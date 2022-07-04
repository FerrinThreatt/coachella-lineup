import {useEffect, useState} from "react";
import './App.css';
import React from 'react'
import background from "./images/background.jpeg";

function App() {
    const CLIENT_ID = "191d6ec4327045139479d0bec839da14"
    // const REDIRECT_URI = "https://coachella-lineup.web.app/"
    const REDIRECT_URI = "http://localhost:5005/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

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

   
    const topTracks = async (e) => { 
      const response = await fetch('https://api.spotify.com/v1/me/top/artists/?limit=50',{
        method: 'GET', headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });

      const responseJson = await response.json();
      console.log(responseJson);
      // for(var j = 0; j < 10; j++ ){
      //   // const first10Artist = document.getElementById('song-title');
      //   // first10Artist.innerText += " "+ responseJson.items[j].name + " ";
      //   // console.log(" "+ responseJson.items[j].name + " ");
      //   console.log("hi");
      // }

      for(var i = 0; i < responseJson.items.length; i++){   
        const playlistTitleElement = document.getElementById('song-title');
        playlistTitleElement.innerText += " "+ responseJson.items[i].name + " ";
        const genreElemenet = document.getElementById('genre');
        genreElemenet.innerText += "  " + responseJson.items[i].genres + "  ";      
   }
  
      
  

    }

    return (
        <div className="App">
            <header className="App-header">
            <div className="bg" style={{ backgroundImage:`url(${background})` }}>
            
    </div>
                <h1>Coachella LineUp</h1>
               
                {!token ?
                    <a href={authUrl}>Login!!
                        to Spotify</a>
                   :  <button id="submitButton" onClick={topTracks}>get started</button>
                  
                    }

                {token ?
                   	
                     <div>  
                      <button onClick={logout}>Logout</button> 
                
                    <div id="song-container">
                    
                       <p className='title' id="song-title"></p>
                       
                      
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