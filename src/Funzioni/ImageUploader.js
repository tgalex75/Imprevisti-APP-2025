import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../supabaseClient";

function ImageUploader() {
  const [fileError, setFileError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCompleteMessage, setUploadCompleteMessage] = useState("");

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
        .update("bg/logo.png", file, {
          cacheControl: '3600',
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
      className="bg-slate-100/10 min-h-24 p-5 flex items-center justify-center"
    >
      <input {...getInputProps()} />

      <p className="cursor-pointer py-4 px-16 hover:bg-black/30">Fai clic per selezionare un file esclusivamente in formato PNG (consigliato con sfondo trasparente ed inferiore ai 2 MB di dimesione)</p>

      {fileError && <div style={{ color: "red" }}>{fileError}</div>}
      {uploadCompleteMessage && (
        <p className="font-semibold text-green-500">{uploadCompleteMessage}</p>
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
