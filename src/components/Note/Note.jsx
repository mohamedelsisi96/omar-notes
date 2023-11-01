import style from "./Note.module.css";
import { deleteNote, updateNote } from "../../utils/Note";
import { useContext } from "react";
import { NoteContext } from "../../Context/NoteContext";

export default function Note({ mynote }) {
  let { mynotes, setMynotes } = useContext(NoteContext);
  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">
            {mynote.title}
          </h2>
          <p className={`mb-0 mt-2`}>{mynote.content}</p>
        </div>

        <div className="note-footer">
          <i
            onClick={() =>
              updateNote({
                prevtitle: mynote.title,
                prevcontent: mynote.content,
                upId: mynote._id,
                setMynotes,
              })
            }
            className="fa-solid fa-pen-to-square pointer me-2"
          ></i>

          <i
            onClick={() => deleteNote({ noteId: mynote._id, setMynotes })}
            className="bi bi-archive-fill pointer"
          ></i>
        </div>
      </div>
    </>
  );
}
