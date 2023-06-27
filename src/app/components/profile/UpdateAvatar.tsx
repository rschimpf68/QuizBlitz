"use client";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../api/uploadthing/core";
import { toast } from "react-hot-toast";
import { UpdateAvatar } from "@/app/profile/action";
import "@uploadthing/react/styles.css";
import { useSession } from "next-auth/react";
interface Props {
  email: string;
  setUrl: Dispatch<SetStateAction<string>>;
}

const UploadAvatar: React.FC<Props> = ({ email, setUrl }) => {
  const { data: session, update } = useSession();

  return (
    <main className="flex flex-col">
      <label className="font-bold">Actualizar Avatar</label>
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          res &&
            update({
              ...session,
              user: {
                ...session?.user,
                image: res[0].fileUrl,
              },
            });
          res && setUrl(res[0].fileUrl);
          res && UpdateAvatar(res[0].fileUrl, email);

          toast.success("Avatar actualizado correctamente");
        }}
        onUploadError={(error: Error) => {
          toast.error("Error al actualizar el avatar");
        }}
      />
    </main>
  );
};

export default UploadAvatar;
