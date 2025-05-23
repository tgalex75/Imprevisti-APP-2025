import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../supabaseClient";

function ImageUploader(props) {
  const {id, nome, urlName } = props;
  const [fileError, setFileError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCompleteMessage, setUploadCompleteMessage] = useState("");

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    // Verifica che il file sia un'immagine
    if (!file.type.startsWith("image/")) {
      setFileError("Solo le immagini in formato PNG o JPG sono consentite.");
      return;
    }

    const fileType = file.type === "image/jpeg" ? ".jpg" : ".png";

    const nomeUrl = `bg/${urlName}${fileType}`;

    try {
      const { data, error } = await supabase.storage
        .from("immagini")
        .update(nomeUrl, file, {
          cacheControl: "3600",
          upsert: true,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        });

        const { data: preferenze, error: prefError } = await supabase
        .from("preferenze-immagini")
        .upsert({ id: id, nome: nome, url: nomeUrl })
        .select();

        console.log(preferenze)
        prefError && console.log(prefError)

      if (error) throw error;

      console.log("Immagine caricata con successo:", data.path);
      setFileError(null);
      setUploadCompleteMessage("File caricato con successo!");
    } catch (error) {
      console.error(
        "Errore durante il caricamento dell'immagine:",
        error.message
      );
      setFileError(error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex min-h-12 xl:h-18 items-center justify-around bg-black text-sm xl:text-base odd:bg-opacity-30 even:bg-opacity-50 p-2"
    >
      <h6 className="w-2/5 xl:w-1/3">{nome}</h6>
      <input {...getInputProps()} />

      <p className="cursor-pointer flex items-start xl:items-center flex-col h-full w-3/5 xl:w-2/3 p-4 font-sans hover:text-[--clr-ter]">
        Clicca QUI e carica una immagine
        <small className="block">( JPEG o PNG inferiore ai 4 MB ) </small>
        {fileError && (
          <small className="font-semibold text-red-500">
            {fileError}
          </small>
        )}
        {uploadCompleteMessage && (
          <small className="font-semibold text-green-500">
            {uploadCompleteMessage}
          </small>
        )}
        {uploadProgress > 0 && (
          <progress value={uploadProgress} max="100">
            {uploadProgress}%
          </progress>
        )}
      </p>
    </div>
  );
}

export default ImageUploader;
