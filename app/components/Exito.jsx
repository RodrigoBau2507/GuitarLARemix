import React from 'react'
import styles from '~/styles/guitarras.css'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

function Exito({mensaje}) {
  return (
    <div><p className='mensaje'>{mensaje}</p></div>
  )
}

export default Exito