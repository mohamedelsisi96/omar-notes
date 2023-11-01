import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NoteContextProvider from "./Context/NoteContext";
function App() {
  const routes = createHashRouter([
    {
      path: "",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/home", element: <Home /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Register /> },
  ]);
  return (
    <>
      <NoteContextProvider>
        <UserContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </UserContextProvider>
      </NoteContextProvider>
    </>
  );
}

export default App;
