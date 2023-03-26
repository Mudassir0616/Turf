import React from 'react'

const SiteMap = () => {
  return (
    <div className='background'>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem 0'}}>
        <iframe width="95%" height="510" id="gmap_canvas" src="https://maps.google.com/maps?q=St.andrews turf&t=&z=16&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        
      </div>
    </div>
  )
}

export default SiteMap