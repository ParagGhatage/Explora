"use client"
import React from 'react';

const PlaceMap = ({map_type = "",map_params=""}) => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    return (
        <div className=''>
            <iframe
                className=' h-80 w-80'
                
                style={{ marginRight: '1em' }}
                loading="lazy"
                src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=tourist locations,${map_params}`}>
            </iframe>
        </div>
    );
}

export default PlaceMap;
