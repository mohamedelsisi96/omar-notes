
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  return  <>
    
    {window.localStorage.getItem('token')?children:
    <Navigate to={"/login"}/>}
</>
}

