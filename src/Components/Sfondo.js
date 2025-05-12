import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Sfondo = () => {
  const [logoURL, setLogoURL] = useState(null);

  const fetchLogoURL = async () => {
    const { data } = supabase.storage
      .from("immagini")
      .getPublicUrl("bg/logo.png");
      setLogoURL(data.publicUrl)
  };

  useEffect(() => {
    fetchLogoURL()
  },[])
  return (
    <section className="absolute bottom-4 left-1/2 -z-50 h-1/3 w-1/3 -translate-x-1/2 overflow-hidden bg-transparent">
      <div
        className="h-full w-full opacity-[.1]"
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
