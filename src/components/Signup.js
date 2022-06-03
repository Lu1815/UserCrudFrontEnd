import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddUserMutation, useGetUsersQuery } from '../services/usersApi';

import Form from './Form'

const Signup = () => {
    const [ notificationType, setNotificationType ] = useState({type: 'success', message: 'You have been registered!'});
    const [inputData, setInputData] = useState({userName: '', userPwd: ''});
    const [isEmpty, setIsEmpty] = useState(false)
    const { refetch } = useGetUsersQuery();
    const [ addUser ] = useAddUserMutation();
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const value = e.target.value;
        setInputData({
            ...inputData,
            [e.target.name]: value
        })
    }

    const addNewUser = async () => {
        if(inputData.userName.length > 0) {
            setIsEmpty(false);
            await addUser(inputData);
            setInputData({userName: '', userPwd: ''});
            refetch();
            navigate('/');
        } else {
            setIsEmpty(true);
        }
    }

  return (
      <Form title="Signup" handleChange={handleChange} callback={addNewUser} btnMessage="Register" />
  )
}

export default Signup