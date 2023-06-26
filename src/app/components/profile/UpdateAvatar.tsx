'use client'
import React from 'react';
import Image from 'next/image'
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";
import { toast } from 'react-hot-toast';



interface Props {
   imageurl : string
   email : string
 }

const UploadAvatar = () => {
  return (

         <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <UploadButton<OurFileRouter>
               endpoint="imageUploader"
               onClientUploadComplete={(res) => {
                  
                  toast.success("Avatar actualizado correctamente")
               }}
               onUploadError={(error: Error) => {
                  toast.error("Error al actualizar el avatar")
               }}
            />
         </main>

   //  <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
   //    {/* Photo File Input */}
   //    <input
   //      type="file"
   //      className="hidden"
   //      id="photo"
   //    />

   //    <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="photo">
   //      Profile Photo <span className="text-red-600"> </span>
   //    </label>

   //    <div className="text-center">
   //      {/* Current Profile Photo */}
   //      <div className="mt-2">
   //        <img
   //          src={imageurl}
   //          className="w-20 h-20 m-auto rounded-full shadow"
   //          alt="Current Profile"
   //        />
   //      </div>

   //      {/* New Profile Photo Preview */}
   //      <div className="mt-2" style={{ display: 'none' }}>
   //        <span
   //          className="block w-40 h-40 rounded-full m-auto shadow"
   //          style={{
   //            backgroundSize: 'cover',
   //            backgroundRepeat: 'no-repeat',
   //            backgroundPosition: 'center center',
   //            backgroundImage: 'none',
   //          }}
   //        ></span>
   //      </div>

   //      <button
   //        type="button"
   //        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
   //      >
   //        Select New Photo
   //      </button>
   //    </div>
   //  </div>
  );
};

export default UploadAvatar;
