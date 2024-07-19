"use client"
import React from 'react';

const App = () => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    return (
        <div className='mt-44 justify-center items-center ml-56'>
            <iframe
                className='items-center'
                width="200"
                height="200"
                style={{ marginRight: '1em' }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=Pune`}>
            </iframe>
        </div>
    );
}

export default App;
