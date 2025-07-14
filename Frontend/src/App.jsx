
import './App.css'
import Login from './User_Authentication/Login'
import SignUp from './User_Authentication/SignUp'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import AddContacts from './Components/AddContacts'
import ViewContacts from './Components/ViewContacts'
import EditContact from './Components/EditContact'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Login />
    },
    {
      path:"/SignUp",
      element:<SignUp />
    },
    {
      path:"/home",
      element:
      <>
      <Header />
      <Home />
      </>
    },
    {
      path:"/addContact",
      element:
      <>
      <Header />
      <AddContacts />
      </>
    },
    {
      path:"/viewContact",
      element:
      <>
      <Header />
      <ViewContacts />
      </>
    },
       {
      path:"/editContact/:id",
      element:
      <>
      <EditContact />
      </>
    }
  ])



  return (
    <>
     <RouterProvider router = {router} />
    </>
  )
}

export default App
