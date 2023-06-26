'use client'

import UpdateName from "./UpdateName"
import UploadAvatar from "./UpdateAvatar"
import Header from "./Header"
import { UpdateAvatar } from "@/app/profile/action"
import { useState } from "react"
interface Props {
   username : string
   email: string
   image : string
 }
 

const Main: React.FC<Props> = ({username, email, image}) => {

   const [user, setUser] = useState(username)
   const [url, setUrl] = useState(image)

   return (
      <section>
         <Header username={user} image={url}/>
         <UpdateName setUser={setUser}/>
         <UploadAvatar email={email} setUrl={setUrl} />
      </section>
   )

}

export default Main;