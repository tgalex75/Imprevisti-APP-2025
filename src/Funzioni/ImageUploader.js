import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { db } from "../Db/db"; // Importa l'istanza di Dexie

function ImageUploader(props) {
  const { id, nome } = props; // urlName non è più strettamente necessario per il path storage
  const [fileError, setFileError] = useState(null);
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

    // Verifica dimensione (opzionale, es. 4MB come nel tuo testo)
    if (file.size > 4 * 1024 * 1024) {
      setFileError("Il file è troppo grande. Massimo 4MB.");
      return;
    }

    try {
      // Usiamo .put() che agisce come un "upsert" (aggiorna se l'id esiste, altrimenti crea)
      // Salviamo direttamente l'oggetto file nel campo 'url' (Dexie supporta i Blob)
      await db.preferenzeImmagini.put({
        id: id,
        nome: nome,
        url: file, // Salviamo il file binario direttamente
      });

      console.log("Immagine salvata localmente con successo");
      setFileError(null);
      setUploadCompleteMessage("File salvato nel database locale!");

      // Reset dei messaggi di errore precedenti
      setEliminaImgDaListaDb("");
    } catch (error) {
      console.error("Errore durante il salvataggio in Dexie:", error);
      setFileError("Errore nel salvataggio locale.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const remUrlFromImgList = async () => {
    try {
      // Aggiorniamo il record settando il campo url a null
      await db.preferenzeImmagini.update(id, { url: null });
      setEliminaImgDaListaDb("Immagine rimossa con successo");
      setUploadCompleteMessage("");
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
      setEliminaImgDaListaDb("Errore durante l'eliminazione locale");
    }
  };

  return (
    <>
      <div
        {...getRootProps()}
        className="xl:h-18 flex min-h-12 flex-col items-center justify-around bg-[rgb(var(--clr-bg))] p-2 text-sm odd:bg-opacity-30 even:bg-opacity-50 xl:text-lg"
      >
        <input {...getInputProps()} />

        <div className="flex h-full w-full cursor-pointer flex-col items-start rounded-lg p-4 text-center font-sans hover:bg-[rgb(var(--clr-btn)/.5)] xl:w-2/3 xl:items-center">
          <p>Clicca QUI e carica una immagine</p>
          <small className="block">( JPEG o PNG inferiore ai 4 MB ) </small>
          <small className="block font-bold">
            Nota: I dati verranno salvati localmente in questo browser.
          </small>

          {fileError && (
            <small className="font-semibold text-red-500">{fileError}</small>
          )}
          {uploadCompleteMessage && (
            <small className="font-semibold text-green-500">
              {uploadCompleteMessage}
            </small>
          )}
        </div>
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
