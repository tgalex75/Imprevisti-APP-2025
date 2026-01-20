const Istruzioni = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-around px-2 py-6">
      <h1>Istruzioni della Web App</h1>
      <a
        href="https://www.youtube.com/watch?v=j7ZKIkUak60"
        className="p-2 text-base font-bold text-[rgb(var(--clr-sec))] lg:p-4 lg:text-lg"
      >
        <p className="hover:underline">Video informativo su YouTube</p>
      </a>
      <p className="mt-2 flex flex-col items-center gap-4 lg:mt-8">
        <strong className="font-bold text-red-500">Attenzione:</strong>{" "}
        Salvataggio dati locali I tuoi dati vengono salvati nel browser tramite
        IndexedDB, una tecnologia di archiviazione locale. Per evitare la
        perdita di dati:
        <li className="text-center font-bold">
          Non cancellare la cronologia o i dati di navigazione del browser.
        </li>
        <li className="text-center font-bold">
          Non utilizzare modalità “navigazione in incognito” o “privata”.
        </li>
        <li className="text-center font-bold">
          Non disinstallare o reimpostare il browser senza prima esportare i
          dati (se disponibile).
        </li>
        <li className="text-center font-bold">
          Evita di usare strumenti di pulizia automatica che potrebbero
          rimuovere i dati locali.
        </li>
        <strong className="text-left font-bold">
          I dati non sono sincronizzati su cloud e sono accessibili solo dal
          dispositivo e browser in cui sono stati creati.
        </strong>
      </p>
      <p className="mt-8">
        La Web App precarica dei valori di default che potete cancellare,
        modificare e/o personalizzare dalla sezione EDITOR
      </p>
    </div>
  );
};

export default Istruzioni;
