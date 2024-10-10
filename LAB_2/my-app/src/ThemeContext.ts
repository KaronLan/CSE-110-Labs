import React from 'react';

export const themes = {
 light: {
   foreground: '#000000',
   background: '#eeeeee',
   note: '#ffffff'
 },
 dark: {
   foreground: '#ffffff',
   background: '#222222',
   note: '#000000'
 },
};

export const ThemeContext = React.createContext(themes.light);
