// import React, { useState } from 'react'
// import { FaStar } from 'react-icons/fa'
// function StarRate() {
//     const [rating, setRating] = useState(null)
//     const [hover, setHover] = useState(null)
//     return (
//         <div style={{ display: 'flex' }}>
//             {[...Array(5)].map((star, index) => {
//                 const currentRating = index + 1
//                 return (
//                     <label>
//                         <input
//                             type='radio'
//                             name='rating'
//                             className='star_input'
//                             value={currentRating}
//                             onClick={() => setRating(currentRating)}
//                         />
//                         < FaStar
//                             color={currentRating <= (hover || rating) ? '#ffc107' : 'grey'}
//                             className='star'
//                             onMouseEnter={() => setHover(currentRating)}
//                             onMouseLeave={() => setHover(null)}
//                             key={index} size={50} />
//                     </label>
//                 )
//             })}
//             {console.log('ratings ', rating)}
//         </div >

//     )
// }

// export default StarRate