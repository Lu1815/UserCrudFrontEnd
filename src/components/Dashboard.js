import { useState } from "react";
import { useAddUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../services/usersApi";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

import Form from './Form'

const initialState = {userName: '', userPwd: ''}
const url = 'http://localhost:5000/api/users/update/'

const Dashboard = () => {
    const [inputData, setInputData] = useState(initialState);
    const [isEmpty, setIsEmpty] = useState(false)
    const [modal, setModal] = useState(false)
    const [dataToSend, setDataToSend] = useState({userId: '', userName: '', userPwd: ''})
    const { data, isFetching, refetch } = useGetUsersQuery();
    const [ addUser ] = useAddUserMutation();
    const [ updateUser ] = useUpdateUserMutation();
    const [ deleteUser ] = useDeleteUserMutation();

    if( isFetching ) return 'Loading...'

    const toggle = () => {
        setModal(!modal);
    }

    // PARA EL FORM DE ADD
    const handleChangeAdd = async (e) => {
        e.persist();
        const {name, value} = e.target;
        setInputData( prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    
    // PARA EL FORM DE UPDATE
    const handleChange = async (e) => {
        e.persist();
        const {name, value} = e.target;
        setDataToSend( prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    //SELECTING THE DATA FROM THE CARD TO THE MODAL
    const selectUserData = (user) => {
        setDataToSend({
            userId: user.userId, 
            userName: user.userName, 
            userPwd: user.userPwd
        })
    }

    const addNewUser = async () => {
        if(inputData.userName.length > 0) {
            setIsEmpty(false);
            await addUser(inputData);
            setInputData(initialState);
            refetch(); 
        } else {
            setIsEmpty(true);
        }
    }

    const updateHandler = async (userId, data) => {
        // NOT REALLY SURE WHY THE UPDATEUSER FUNCTION DIDN'T WORK SO INSTEAD I USED AXIOS
        // await updateUser(userId, data);
        await axios.put(url + userId, data);
        refetch();
    }

    const removeUser = async (i) => {
        await deleteUser(i);
        refetch();
    }

    return (        
        <>
            <Form title='Add user' handleChange={handleChangeAdd} callback={addNewUser} btnMessage='Add'/>
            <div className="flex justify-center">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto w-max-sm md:w-max-2xl lg:w-max-5xl">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Options
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((user) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.userId}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {user.userId}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.userName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.userCreation}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline pr-2" onClick={() => {
                                            toggle();
                                            selectUserData(user);
                                        }}>
                                            Edit
                                        </button>
                                        <button href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => removeUser(user.userId)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={modal} toggle={toggle} className="fixed flex justify-center inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full">
                <div className="xl:w-full bg-gray-100 max-w-sm rounded overflow-hidden shadow-lg mt-20 md:mt-40 content-center">
                    <ModalHeader className='border-gray-200 border-b text-center font-bold text-xl py-1' toggle={toggle}>Edit user</ModalHeader>
                    <ModalBody className='text-gray-700 text-base text-center border-gray-200 border-b py-5 px-3'>
                        <div className="w-full max-w-sm md:mx-auto">
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                                        Username
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={dataToSend.userName} onChange={e => handleChange(e)} name="userName" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                    <div className="md:w-1/3">
                                        <label className="block text-gray-500 md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                                            Password
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={dataToSend.userPwd} onChange={e => handleChange(e)} name="userPwd" />
                                    </div>
                            </div>
                            <div className="md:flex md:items-center w-full flex justify-center border-t border-gray-200 pt-2">
                                <div className="">
                                    <input className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 text-center" type="button" onClick={() => {
                                        toggle();
                                        updateHandler(dataToSend.userId, dataToSend);
                                    }} value='Edit' />
                                    <input className="px-4 py-2 ml-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-300 text-center" type="button" onClick={toggle} value='Cancel' />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>
        </>
    )
}

export default Dashboard;