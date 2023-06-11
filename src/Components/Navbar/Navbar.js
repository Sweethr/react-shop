import React from 'react';
import { CgProfile, CgShoppingBag } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../Util/globalFunctions';
import { useSelector } from 'react-redux';
export default function Navbar() {
    const auth = JSON.parse(localStorage.getItem("userData"))
    const navigate = useNavigate()
    const selector = useSelector(state => state.inventory.value)

    return (
        <nav className='flex items-center h-24 bg-navbarColor'>
            <ul className='flex flex-row items-center justify-between w-full px-10'>
                <Link to="/" className='transition-colors cursor-pointer hover:text-gray-800 hover:text-opacity-60 text-lg font-semibold'>Ana Sayfa</Link>
                <li className='flex flex-row gap-x-4'>
                    <Link to="/basket" className='relative'>
                        <CgShoppingBag className='cursor-pointer transition-colors rounded-full hover:bg-black hover:bg-opacity-10 p-1' size={40} />
                        {selector.length > 0 &&
                            <div className='flex items-center justify-center absolute bg-red-600 w-5 h-5 rounded-xl -top-1'>
                                <span className='font-semibold text-sm'>{selector.length}</span>
                            </div>
                        }
                    </Link>
                    <CgProfile onClick={() => (auth ? logout() : navigate("/login"))} className='cursor-pointer transition-colors rounded-full hover:bg-black hover:bg-opacity-10 p-1' size={40} />
                </li>
            </ul>
        </nav>
    )
}
