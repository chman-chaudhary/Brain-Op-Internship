import React from 'react'

function Card({ product }) {
    return (
        <div
            className="transform transition duration-300 hover:scale-110 rounded-lg shadow-lg h-fit w-56 hover:shadow-xl bg-white"
        >
            <div className="bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 m-2 h-3/6 rounded-lg" >
                <img src={product.url ?? "https://th.bing.com/th/id/OIP.p5JeMPd6jv8ZJLap53uTogHaFj?w=1024&h=768&rs=1&pid=ImgDetMain"} alt="Food Image" className='w-full h-full rounded-lg bg-cover' />
            </div>

            <div className="px-5 pt-2 flex flex-col pb-3">
                <h2 className="font-semibold">{product.title}</h2>
                <p className='text-md'>{product.description}</p>
            </div>
        </div>

    )
}

export default Card
