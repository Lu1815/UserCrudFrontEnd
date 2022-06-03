import { createContext, useState } from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import Login from './components/Login'
import Routes from './components/Routes'

export const UserContext = createContext();

const App = () => {
    const [user, setUser] = useState({ loggedIn: false });

    return (
        <UserContext.Provider value={{user, setUser}}>
            <div id="app" className="h-screen grid grid-cols-1 place-content-center bg-slate-300">
                <ReactNotifications />
                <Routes 
                    handleNotification={handleNotification}
                />
            </div>            
        </UserContext.Provider>
    );
}

export default App;

const handleNotification = ({ message, type }) => {
    Store.addNotification({
        title: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
    });
}