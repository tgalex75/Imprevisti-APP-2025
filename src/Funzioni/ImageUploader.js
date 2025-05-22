import  { useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../supabaseClient";

function ImageUploader(props) {
  const {nome, urlName} = props
  const [fileError, setFileError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCompleteMessage, setUploadCompleteMessage] = useState("");

  const nomeUrl = `bg/${urlName}.png`

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    // Verifica che il file sia un'immagine
    if (!file.type.startsWith("image/")) {
      setFileError("Solo le immagini in formato PNG sono consentite.");
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from("immagini")
        .update(nomeUrl, file, {
          cacheControl: "3600",
          upsert: true,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setUploadProgress(percentCompleted);
          },
        });

      if (error) throw error;

      console.log("Immagine caricata con successo:", data.path);
      setFileError(null);
      setUploadCompleteMessage("File caricato con successo!");
    } catch (error) {
      console.error(
        "Errore durante il caricamento dell'immagine:",
        error.message,
      );
      setFileError(error.message);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="flex min-h-12 xl:h-18 items-center justify-around bg-black text-sm xl:text-base odd:bg-opacity-30 even:bg-opacity-50 p-2 relative"
    >
      <h6 className="w-1/4 xl:w-1/3">Immagine Home - {nome}</h6>
      <input {...getInputProps()} />

      <p className="cursor-pointer flex items-center flex-col h-full w-3/4 xl:w-2/3 p-4 font-sans hover:text-[--clr-ter]">
        Fai clic per selezionare un file esclusivamente in formato PNG
        <small className="block">
          ( consigliato con sfondo trasparente ed inferiore ai 4 MB di dimensione
          )
        </small>
      </p>

      {fileError && <div className="absolute right-0 pe-2 font-semibold text-red-500">{fileError}</div>}
      {uploadCompleteMessage && (
        <small className="absolute right-0 pe-2 font-semibold text-green-500">{uploadCompleteMessage}</small>
      )}
      {uploadProgress > 0 && (
        <progress value={uploadProgress} max="100">
          {uploadProgress}%
        </progress>
      )}
    </div>
  );
}

export default ImageUploader;
