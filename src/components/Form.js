import React from 'react'

const Form = ({ title, handleChange, callback, btnMessage }) => {
    return (
        <>
            <div className="flex justify-center">
                <h1 className="pb-4 text-4xl text-center text-slate-800 w-full max-w-sm word-wrap">{title}</h1>                
            </div>
            <div className="flex justify-center">
                <div className="w-full max-w-xs px-2 md:max-w-sm">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name='userName' type="text" placeholder="Username" onChange={handleChange}/>
                        </div>
                        <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name='userPwd' type="password" placeholder="******" onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-1" type="button" onClick={() => callback()}>
                                {btnMessage}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Form