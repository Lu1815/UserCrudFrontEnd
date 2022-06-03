import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useGetUsersQuery } from '../services/usersApi'
import { UserContext } from '../app'
import Form from './Form'

const initialState = {type: 'danger', message: 'Authentication error'}

const Login = ({ handleNotification }) => {
    const { user, setUser } = useContext(UserContext);
    const [inputData, setInputData] = useState({userName: '', userPwd: ''});
    const [notificationType, setNotificationType] = useState(initialState);
    const {data, isFetching} = useGetUsersQuery();
    const navigate = useNavigate();

    if( isFetching ) return 'Loading...';

    const handleChange = async (e) => {
        const value = e.target.value;
        setInputData({
            ...inputData,
            [e.target.name]: value
        })
    }

    const cleanState = () => {
        setNotificationType(initialState);
    }

    // IF THE USERS IS FOUND THEN VERIFY THAT THE USER PWD AND USER NAME BELONGS TO A OBJECTS INSIDE THE LIST TO LOG IN
    const findUser = () => {
        const user = data.find(user => user.userName == inputData.userName && user.userPwd == inputData.userPwd)
        if(typeof(user) != 'undefined') {
            if((user.userName == inputData.userName) && (user.userPwd == inputData.userPwd)){
                console.log(true)
                console.log(notificationType)
                setNotificationType({type: 'success', message: `User ${user.userName} authenticated successfully`})
                setUser({ loggedIn: true })
                navigate('/dashboard', {replace: true})
            }
        }
        console.log(user)
        console.log(inputData)
        console.log(notificationType)
        console.log(data)
        handleNotification(notificationType);
    }

    return (
        <>
            <Form title="EpicTech Interview Test Login" handleChange={handleChange} callback={findUser} btnMessage='Sign in'/>
            <div className='flex justify-center'>
                <Link to='/signup' class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    New user? Sign up
                </Link>
            </div>
        </>
    )
}

export default Login