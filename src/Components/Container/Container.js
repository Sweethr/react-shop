import React from 'react';

export default function Container({ children }) {
    return (
        <main className='flex flex-col mx-auto max-w-7xl w-full h-screen bg-primaryColor'>
            {children}
        </main>
    )
}
