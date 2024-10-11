import './App.css';
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import {HeartButton,FavList } from './hooksExercise';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext, themes } from "./ThemeContext";
import { Label, Note } from './types';


function App() {
  //fav list
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
  //toggle theme
  const theme = useContext(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    console.log("tapped")
    console.log(theme)
};


  //note creation
  const[notes, setNotes] = useState(dummyNotesList);
  const initialNote ={
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  }
  const [createNote, setCreateNote] = useState(initialNote);
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title:", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length +1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  }


  //update notes
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
  const updateNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Changing title:", selectedNote.title);
    console.log("Changing content:", selectedNote.content);
    setSelectedNote(initialNote);
  }
 
  
 return (
  <ThemeContext.Provider value={currentTheme}>
    <div className='app-container' style={{
            background: currentTheme.background,
            color: currentTheme.foreground,
          }} >
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })}
            required>
          </input>
        </div>

        <div>
          <textarea
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })}
            required>
          </textarea>
    	  </div>

        
        <div>
          <select
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
            required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
   	    </div>
        <div><button type="submit">Create Note</button></div>
        
        <div><button type='button' onClick={toggleTheme}>Toggle Theme</button></div>
        
        <div>
          <FavList favTitles={favTitles}></FavList>
        </div>
      </form>
      
      
      <div className="notes-grid">
        {notes.map((note) => (
          <div style={{
          background: currentTheme.note,
          color: currentTheme.foreground,
          }}
          onChange={updateNoteHandler}
          key={note.id}
          className="note-item">
          
          <div className="notes-header">
            <HeartButton likedCb={()=>addFav(favTitles, note.title)} ></HeartButton>
            <button>x</button>
          </div>

          <h2 contentEditable='true'> {note.title} </h2>
          <p contentEditable='true'> {note.content} </p>
          <p contentEditable='true'> {note.label} </p>
        </div>
       ))}
      </div>
    </div>
  </ThemeContext.Provider>

   

 );
}
export default App;

