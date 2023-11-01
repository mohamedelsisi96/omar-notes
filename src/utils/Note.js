import Swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import { NoteContext } from "../Context/NoteContext.jsx";

export function writeNote({ mynotes, setMynotes }) {
  Swal.fire({
    title: "Write Your Note",
    html: `<div class="mb-3">
    <label for="title" class="form-label text-uppercase  me-auto">title</label>
    <input type="text" class="form-control" id="title" placeholder="Please write the title her">
  </div>
  <div class="mb-3">
    <label for="content" class="form-label text-uppercase">description</label>
    <textarea class="form-control" placeholder="Please write the description her" id="content" rows="3"></textarea>
  </div>`,
    showCancelButton: true,
    confirmButtonText: "Add Note",
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      let title = document.getElementById("title").value;
      let content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    console.log(result.value.title, result.value.content);
    sendNote({
      title: result.value.title,
      content: result.value.content,
      mynotes,
      setMynotes,
    });
  });
}

async function sendNote({ title, content, mynotes, setMynotes }) {
  let { data } = await axios.post(
    "https://note-sigma-black.vercel.app/api/v1/notes",
    { title, content },
    { headers: { token: window.localStorage.getItem("token") } }
  );
  if (data.msg === "done") {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "note added succesfuly",
      showConfirmButton: false,
      timer: 1500,
    });
    getNotes({ mynotes, setMynotes });
  }
}

//delete note
export function deleteNote({ noteId, setMynotes }) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      sendDeletedata({ noteId, setMynotes });
    }
  });
}

async function sendDeletedata({ noteId, setMynotes }) {
  const { data } = await axios.delete(
    `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
    { headers: { token: window.localStorage.getItem("token") } }
  );
  console.log(data);
  getNotes({ setMynotes });
  Swal.fire({
    position: "top-center",
    icon: "success",
    title: "note deleted succesfuly",
    showConfirmButton: false,
    timer: 1500,
  });
}
//get all note
export async function getNotes({ setMynotes }) {
  let { data } = await axios.get(
    "https://note-sigma-black.vercel.app/api/v1/notes",
    { headers: { token: window.localStorage.getItem("token") } }
  );
  setMynotes(data.notes);
}

//update note
export function updateNote({ prevtitle, prevcontent, upId, setMynotes }) {
  Swal.fire({
    title: "Update Your Note",
    html: `<div class="mb-3">
    <label for="title" class="form-label text-uppercase  me-auto">title</label>
    <input type="text" class="form-control" id="title" value=${prevtitle} placeholder="Please write the title her">
  </div>
  <div class="mb-3">
    <label for="content" class="form-label text-uppercase">description</label>
    <textarea class="form-control" placeholder="Please write the description her" id="content" rows="3">${prevcontent}</textarea>
  </div>`,
    showCancelButton: true,
    confirmButtonText: "Update Note",
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      let title = document.getElementById("title").value;
      let content = document.getElementById("content").value;
      return { title, content };
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    console.log(result.value.title, result.value.content);

    sendUpdateNote({
      title: result.value.title,
      content: result.value.content,
      upId,
      setMynotes,
    });
    console.log("hello");
  });
}

async function sendUpdateNote({ title, content, upId, setMynotes }) {
  let { data } = await axios.put(
    `https://note-sigma-black.vercel.app/api/v1/notes/${upId}`,
    { title, content },
    { headers: { token: window.localStorage.getItem("token") } }
  );
  if (data.msg === "done") {
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "note updated succesfuly",
      showConfirmButton: false,
      timer: 1500,
    });
    getNotes({ setMynotes });
  }
}
