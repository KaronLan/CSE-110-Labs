import './App.css';
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import {HeartButton,FavList } from './hooksExercise';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext, themes } from "./ThemeContext";


function App() {
  const [favTitles, setFavTitles]: [String[], any] = useState([]);
  function addFav(favTitles:String[],item:string){
    if(favTitles.find((i)=> i === item)){
      setFavTitles(favTitles.filter(i => i !== item))
    }
    else{
      setFavTitles([...favTitles, item]);
    }
    console.log(favTitles);
  }

  const theme = useContext(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    console.log("tapped")
    console.log(theme)
};

 
  
 return (
  <ThemeContext.Provider value={currentTheme}>
    <div className='app-container' style={{
            background: currentTheme.background,
            color: currentTheme.foreground,
          }} >
      <form className="note-form">
        <div><input placeholder="Note Title"></input></div>

        <div><textarea><input placeholder="Note Content"></input></textarea></div>
        
        <div>
          <select>
            <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="other">Other</option>
          </select>
        </div>
        <div><button type="submit">Create Note</button></div>
        <div><button type='button' onClick={toggleTheme}>Toggle Theme</button></div>
        <div>
          <FavList favTitles={favTitles}></FavList>
        </div>
      </form>
      <div className="notes-grid">
       {dummyNotesList.map((note) => (
         <div style={{
          background: currentTheme.note,
          color: currentTheme.foreground,
        }}
           key={note.id}
           className="note-item">
           <div className="notes-header">
              <HeartButton likedCb={()=>addFav(favTitles, note.title)} ></HeartButton>
              <button>x</button>
            
           </div>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
         </div>
       ))}
      </div>
    </div>
  </ThemeContext.Provider>

   

 );
}
export default App;

