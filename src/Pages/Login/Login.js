import React, { useReducer, useState } from 'react'
import Container from '../../Components/Container/Container'
import { CgMail, CgPassword } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { db } from '../../Firebase/Firebase'

function reducer(state, action) {
    return {
        ...state,
        [action.type]: action.value
    }
}

export default function Register() {
    const [show, setShow] = useState(false)
    const [state, dispatch] = useReducer(reducer, {
        email: "",
        password: ""
    })

    const onChange = (e) => {
        dispatch({
            type: e.target.name,
            value: e.target.value
        })
    }

    const buttonHandle = () => {
        if (!state.email) return alert("E-Posta boş bırakılamaz.")
        if (!state.password) return alert("Parola boş bırakılamaz.")
        db.collection("users").doc(`${state.email}`).get().then((data) => {
            if (!data.exists) {
                return alert("Bu e-posta kayıtlı değil.")
            } else {
                let { password, email, inventory } = data.data()
                if (password !== state.password) return alert("Parola yanlış.")
                localStorage.setItem("userData", JSON.stringify({ email: email }))
                localStorage.setItem("userInventory", JSON.stringify({ inventory: inventory }))
                return window.location.href = "/"
            }
        })
    }

    return (
        <Container>
            <div className='flex items-center justify-center w-full h-full'>
                <div className='flex flex-col px-4 w-64 h-64 rounded-xl bg-white bg-opacity-40'>
                    <div className='flex flex-col items-start my-5'>
                        <h1 className='text-xl font-semibold'>Login</h1>
                        <span className='text-sm font-semibold'>Devam etmek için giriş yapın.</span>
                    </div>
                    <form className='flex flex-col gap-y-4'>
                        <div className='flex items-center relative'>
                            <CgMail className='absolute ml-2' />
                            <input name='email' type="email" className='outline-none shadow-2xl bg-gray-400 rounded-xl p-1 pl-8' onChange={onChange} />
                        </div>
                        <div className='flex items-center justify-between relative'>
                            <CgPassword className='absolute ml-2' />
                            <input name='password' type={`${show ? "text" : "password"}`} className='outline-none shadow-2xl bg-gray-400 rounded-xl p-1 pl-8' onChange={onChange} />
                            {state.password.length > 0 && <div onClick={() => setShow(!show)} className='flex flex-row text-xs bg-black p-1 rounded-xl cursor-pointer text-white font-semibold absolute right-3'>
                                <span>{show ? "Gizle" : "Göster"}</span>
                            </div>}
                        </div>
                    </form>
                    <div className='flex flex-col items-center justify-center my-auto w-full'>
                        <button onClick={buttonHandle} className='bg-black text-white font-semibold p-1 rounded-xl'>Gönder</button>
                        <span className='text-sm font-semibold mt-2'>Hesabın yok mu? <Link to="/register" className='text-blue-700'>Kayıt Ol</Link></span>
                    </div>
                </div>
            </div >
        </Container >
    )
}
