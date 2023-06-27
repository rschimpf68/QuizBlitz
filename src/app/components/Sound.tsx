'use client'

import ReactHowler from 'react-howler'

interface Props {
   src: string
   playing : boolean
   loop : boolean
   volume : number
}

const Sound: React.FC<Props> = ({src, playing, loop, volume}) => {

   return (
      <ReactHowler
         src={src}
         playing={playing}
         loop={loop}
         volume={volume}
  />
   )
}

export default Sound;