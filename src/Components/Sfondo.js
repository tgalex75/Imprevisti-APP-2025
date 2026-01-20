import { useState, useEffect } from "react";
import { db } from "../Db/db";

const Sfondo = () => {
  const [logoURL, setLogoURL] = useState(null);

  const fetchLogoURL = async () => {
    const record = await db.preferenzeImmagini.get(9);
    if (record && record.url) {
      const imageUrl = URL.createObjectURL(record.url);
      setLogoURL(imageUrl);
      // Usa imageUrl nel tag <img src={imageUrl} />
    }
  };

  useEffect(() => {
    fetchLogoURL();
  }, []);

  return (
    <section className="absolute bottom-4 left-1/2 -z-50 h-1/3 w-1/3 -translate-x-1/2 overflow-hidden bg-transparent">
      <div
        className="h-full w-full opacity-[.2]"
        style={{
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${logoURL})`,
        }}
      ></div>
    </section>
  );
};

export default Sfondo;
