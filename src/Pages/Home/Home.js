import React, { useEffect, useState } from 'react'
import Container from '../../Components/Container/Container'
import { getStore } from '../../Util/storeData'
import Navbar from '../../Components/Navbar/Navbar'
import Card from '../../Components/Cards/Card'

export default function Home() {
    let [data, setData] = useState(false)

    useEffect(() => {
        (async () => {
            setData(await getStore())
        })()
    }, [])

    return (
        <Container >
            <Navbar />
            <div className='text-white px-10 overflow-auto'>
                <div className='flex flex-row items-center justify-center gap-x-5 mt-10'>
                    {data && data.slice(0, 5).map((items, index) => {
                        return <div className='flex items-center justify-center w-32 h-32 bg-white hover:bg-gray-300 transition-colors' key={index}>
                            <div className='flex flex-col items-center'>
                                <img src={items.image} alt={items.title} className='w-11 h-11 rounded object-cover' />
                                <span className='font-semibold text-sm text-black'>{items.category}</span>
                            </div>
                        </div>
                    })}
                </div>
                <hr className='my-5' />
                <div className='flex flex-wrap flex-row items-center w-full relative'>
                    {data && data.slice(5).map((items, index) => <Card items={items} index={index} />)}
                </div>
            </div>
        </Container>
    )
}
