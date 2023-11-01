import { NoteContext } from "../../Context/NoteContext";
import styles from "./Home.module.css";
import { useContext, useEffect } from "react";
import Loading from "./../Loading/Loading";
import Note from "../Note/Note.jsx";
import { getNotes } from "../../utils/Note";

export default function Home() {
  let { mynotes, setMynotes } = useContext(NoteContext);
  useEffect(() => {
    getNotes({ mynotes, setMynotes });
  }, []);
  console.log(mynotes);
  return (
    <>
      <div className="home">
        <h2 className="font-Montserrat h4 heading">
          <i className="bi bi-folder me-2"></i>My Notes
        </h2>

        {mynotes == null ? (
          <Loading />
        ) : mynotes.length == 0 ? (
          <h2>no notes found</h2>
        ) : (
          <div className={styles.notes}>
            {mynotes.map((note) => {
              return <Note mynote={note} key={note._id} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
