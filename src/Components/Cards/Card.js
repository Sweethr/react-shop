import { useDispatch, useSelector } from 'react-redux'
import { set } from '../../Redux/Store/PopupSlice'
import { addItem, removeItem } from '../../Util/globalFunctions'
import { createItem, deleteItem } from '../../Redux/Store/inventorySlice'
import { db } from '../../Firebase/Firebase'

export default function Card({ items, index }) {
    const auth = JSON.parse(localStorage.getItem("userData"))
    const popupSelect = useSelector(state => state.popup.value)
    const inventoryControl = useSelector(state => state.inventory.value)
    const dispatch = useDispatch()

    const buttonHandle = () => {
        popupSelect !== index ? dispatch(set(index)) : dispatch(set(null))
    }

    const itemsCreates = async () => {
        addItem(items.id)
        dispatch(createItem(items.id))
        let dbData = db.collection("users").doc(auth.email)
        let data = await dbData.get()
        if (data.exists) {
            let { inventory } = data.data()
            if (!inventory.some(item => items.id === item)) inventory.push(items.id)
            await dbData.update({ inventory })
        } else {
            alert("Bir sorun oluştu. Lütfen tekar giriş yapın.")
        }
    }

    const itemsDelets = async () => {
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
        <div className='flex flex-col items-center justify-center m-2 w-40 h-40 bg-white hover:bg-gray-300 transition-colors relative' key={index}>
            {index === popupSelect && <div className='rounded-xl z-10 absolute bottom-24 -left-8 bg-black border-2 border-gray-500 w-56 overflow-auto'>
                {!auth &&
                    <div className='flex flex-col items-center justify-center h-full w-full my-10 px-2 gap-y-5'>
                        <div className='flex flex-col items-center'>
                            <h1 className='text-xl text-center'>Giriş Yapmalısın</h1>
                            <span className='font-semibold text-sm text-center'>Bu ürünü sepete eklemek için giriş yapmalısınız.</span>
                        </div>
                        <button className='text-sm font-semibold bg-white text-black rounded-xl p-1' onClick={() => window.location.href = "/login"}>Giriş Yap</button>
                    </div>}
            </div>}
            <div className='flex flex-col items-center'>
                <img src={items.image} alt={items.title} className='w-11 h-11 rounded object-cover' />
                <span className='font-semibold text-sm text-black'>{items.category}</span>
            </div>
            <div className='flex flex-row items-center justify-evenly text-black w-full mt-5'>
                <span className='font-semibold'>${items.price}</span>
                <button className='text-sm font-semibold bg-black text-white rounded-xl p-1' onClick={() => auth ? (!inventoryControl.some(item => item === items.id) ? itemsCreates() : itemsDelets()) : buttonHandle()}>{inventoryControl.some(item => item === items.id) ? "Sepette" : "Sepete Ekle"}</button>
            </div>
        </div>
    )
}
