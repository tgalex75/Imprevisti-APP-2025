import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "../supabaseClient";

function ImageUploader(props) {
  const { id, nome, urlName } = props;
  const [fileError, setFileError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCompleteMessage, setUploadCompleteMessage] = useState("");
  const [eliminaImgDaListaDb, setEliminaImgDaListaDb] = useState("");

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
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setUploadProgress(percentCompleted);
          },
        });

      const { data: preferenze, error: prefError } = await supabase
        .from("preferenze-immagini")
        .upsert({ id: id, nome: nome, url: nomeUrl })
        .select();

      console.log(preferenze);
      prefError && console.log(prefError);

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

  const remUrlFromImgList = async () => {
    const { error } = await supabase
      .from("preferenze-immagini")
      .update({ url: null })
      .eq("id", id);
    setEliminaImgDaListaDb("Immagine eliminata con successo dal Database");
    error && console.log(error);
    error &&
      setEliminaImgDaListaDb("Errore durante l'eliminazione dal Database");
  };

  return (
    <>
      <div
        {...getRootProps()}
        className="xl:h-18 flex min-h-12 flex-col items-center justify-around bg-[rgb(var(--clr-bg))] p-2 text-sm odd:bg-opacity-30 even:bg-opacity-50 xl:text-lg"
      >
        <input {...getInputProps()} />

        <p className="flex h-full w-full cursor-pointer flex-col items-start rounded-lg p-4 text-center font-sans hover:bg-[rgb(var(--clr-btn)/.5)] xl:w-2/3 xl:items-center">
          Clicca QUI e carica una immagine
          <small className="block">( JPEG o PNG inferiore ai 4 MB ) </small>
          <small className="invisible last:visible">
            {" "}
            Attenzione! Le immagini caricate sovrascriveranno quelle
            eventualmente già presenti.
          </small>
          <small className="block">
            Se subito dopo il caricamento non vedi l'immagine aggiornata nella
            rispettiva posizione, ricarica la pagina premendo CTRL + F5
          </small>
          {fileError && (
            <small className="font-semibold text-red-500">{fileError}</small>
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
      <div className="flex h-auto w-full flex-col items-center justify-center">
        <button
          className="mt-4 flex h-12 w-full items-center justify-center rounded-lg border-2 border-red-700 py-1 text-center font-semibold hover:bg-red-700 xl:w-52"
          type="button"
          onClick={remUrlFromImgList}
        >
          Rimuovi Immagine
        </button>
        <span className="font-semibold text-green-500">
          {eliminaImgDaListaDb}
        </span>
      </div>
    </>
  );
}

export default ImageUploader;
