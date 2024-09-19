import React, { useState } from 'react'
import Navbar from '../Includes/Navbar'

function Dashborad({property}) {

  const [content, setcontent] = useState()
  const [imageUrl, setimageUrl] = useState()

  return (
    <>
      {/* <Navbar /> */}
      <div className="col-lg-4">
      <div class="card mt-4 ms-4 " >
        <img src={property.imageUrl} class="card-img-top" alt="..." />
        <div class="card-body">
          <p class="card-text">{property.content}</p>
        </div>
      </div>
      </div>
    </>
  )
}

export default Dashborad
