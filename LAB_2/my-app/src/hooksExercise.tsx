import {useState, useContext, useEffect} from "react";
import { ThemeContext, themes } from "./ThemeContext";
import { FaHeart } from "react-icons/fa";


function ClickCounter() {
    const [count, setCount] = useState(0);
    console.log(count);
   
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    }, [count]);
   
   
    const theme = useContext(ThemeContext);
    return (
        <div
          style={{
            background: theme.background,
            color: theme.foreground,
            padding: "20px",
          }}
        >
          <p>You clicked {count} times </p>
          <button 
            type="button"
            onClick={() => setCount(count + 1)}
            style={{ background: theme.foreground, color: theme.background }}
          >
            Click me
          </button>
        </div>
      );
}

export function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };

    return (
        <ThemeContext.Provider value={currentTheme}>
        <button type="button" onClick={toggleTheme} > Toggle Theme </button>
        <ClickCounter />
        </ThemeContext.Provider>
    );
}

    

export function HeartButton( {likedCb}:{likedCb: any}, ){
    const [liked, setLiked] = useState(false);
      
    return(
      <div>
        <button 
        onClick={() => { 
          setLiked(!liked);
          likedCb();

        }}>
            <FaHeart color={liked ? 'red' : 'gray'} />
        </button>
      </div>
    )       
   
}

export function FavList({favTitles}:{favTitles:String[]}){

    return (
      <div>
        <h2>List of favorites</h2>
        <ul id="fa">
          {favTitles.map((note, index)=>(
            <li key={index}>{note}</li>
          ))}
        </ul>
      </div>

    )
}

   