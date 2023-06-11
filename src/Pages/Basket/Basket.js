import React, { useEffect, useState } from 'react';
import Container from '../../Components/Container/Container';
import Navbar from '../../Components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getStore } from '../../Util/storeData';
import { removeItem } from '../../Util/globalFunctions'
import { deleteItem } from '../../Redux/Store/inventorySlice'
import { db } from '../../Firebase/Firebase'

export default function Basket() {
    const auth = JSON.parse(localStorage.getItem("userData"))
    const [data, setData] = useState([])
    const selector = useSelector(state => state.inventory.value)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            setData(await getStore())
        })()
    }, [])

    const itemsDelets = async (items) => {
        removeItem(items.id)
        dispatch(deleteItem(items.id))
        let dbData = db.collection("users").doc(auth.email)
        let data = await dbData.get()
        if (data.exists) {
            let { inventory } = data.data()
            if (inventory.some(item => items.id === item)) inventory = inventory.filter(item => item !== items.id)
            await dbData.update({ inventory })
        } else {
            alert("Bir sorun oluştu. Lütfen tekar giriş yapın.")
        }
    }

    return (
        <Container>
            <Navbar />
            <div className='w-full max-w-4xl py-4 m-5 mx-auto bg-white overflow-auto'>
                <h1 className='text-2xl font-semibold text-center'>Sepetin ({selector.length} ürün)</h1>
                <div className='flex flex-col items-center py-4 gap-y-2'>
                    {selector.length > 0 ? data.filter(x => selector.includes(x.id)).map((items) => {
                        return <div className='flex flex-row items-center justify-between w-full pl-5'>
                            <div className='flex flex-row items-center'>
                                <img className='w-11 h-11 object-cover' src={items.image} alt={items.title} />
                                <span className='ml-2 w-44 overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-sm'>{items.title}</span>
                            </div>
                            <div className='flex flex-row items-center gap-x-2 mr-4'>
                                <span className='text-start text-xs font-semibold'>${items.price}</span>
                                <button className='text-sm font-semibold bg-black text-white rounded-xl p-1' onClick={() => itemsDelets(items)}>Sepetten Kaldır</button>
                            </div>
                        </div>
                    }) : <span className='text-xl font-semibold text-center'>Sepetinde hiçbir ürün bulunmuyor.</span>}
                </div>
            </div>
        </Container>
    )
}
