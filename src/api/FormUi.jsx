import React from 'react'
import { useSearchParams } from "react-router";


 

function FormUi() {
    const [searchParams,] = useSearchParams()
  return (
    <div>
        
        <p>{searchParams.get('name')}</p>
         <p>{searchParams.get('lastname')}</p>
          <p>{searchParams.get('phone')}</p>
           <p>{searchParams.get('addr')}</p>
    </div>
  )
}

export default FormUi