import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import { checkLogin } from '../../service/userService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { editImage, updateEmail, editUsername } from '../../store/features/user';

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        let loginApi = await checkLogin(email, password)
        let response = loginApi.data
        if (response && response.EC === 0) {
            toast.success(response.EM)
            dispatch(updateEmail(email))
            dispatch(editImage(response.DT.image))
            dispatch(editUsername(response.DT.username))

            history.push('/')
        } else {
            toast.warning(response.EM)
        }
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            handleLogin()
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-white max-w-screen-md  z-10 text-black flex flex-col gap-5 p-5 rounded-xl">
                <div className="flex md:hidden justify-between items-center">
                    <IoIosArrowBack size={20} />
                    <div className="">Need help?</div>
                </div>
                <div className="">
                    <h1 className='text-3xl font-semibold text-center my-3'>Welcome Back</h1>
                    <p className='text-gray-500'>Log in to access your personalized real estate experience.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Enter your email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder='Email' className='p-3 rounded-lg border-2' />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Enter your password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => handleEnter(e)} type="password" placeholder='Password' className='p-3 rounded-lg border-2' />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className='flex items-center gap-2'>
                        <input type="checkbox" />
                        <p>Remember me</p>
                    </div>
                    <div className='text-lg underline text-primary-purple-500 hover:duration-200 hover:text-primary-purple-200 cursor-pointer'>Forget password</div>
                </div>
                <div className="w-full mx-auto">
                    <button onClick={handleLogin} className='rounded-2xl w-full hover:duration-200 hover:bg-primary-purple-200 bg-primary-purple-500 p-3 text-white'>Log in</button>
                </div>
                <hr />
                <div className="flex gap-3 justify-center items-center">
                </div>
                <div className="flex justify-center items-center">
                    <p>Don't have an account? <Link to='/signup' className='text-primary-purple-500 font-semibold cursor-pointer hover:duration-200 hover:text-primary-purple-200'>Signup</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login
