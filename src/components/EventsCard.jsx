import React from 'react' 

function EventsCard({title='',description='',img=''}) {
  return (
    <div className='text-[#151515] leading-8 my-16 text-center'>
        <div className='w-'>
             <img className="rounded-2xl w-full" src={img}/> <p class="font-bold text-2xl p-5">{title}</p><p className='text-[#515151]'>{description}</p>
            




        </div>

    </div>
  )
}

export default EventsCard