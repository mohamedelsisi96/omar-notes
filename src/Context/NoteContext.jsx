import { createContext, useContext, useState } from "react";

export let NoteContext = createContext();

export default function NoteContextProvider({ children }) {
  let [mynotes, setMynotes] = useState(null);
  return (
    <NoteContext.Provider value={{ mynotes, setMynotes }}>
      {children}
    </NoteContext.Provider>
  );
}
