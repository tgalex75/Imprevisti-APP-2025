import { supabase } from "../supabaseClient";
import { useForm } from "react-hook-form";

const ImgSfondo = () => {

  const uploadUrl = async (objForm) => {
    const { urlImg } = objForm;
    const { error } = await supabase
      .from("logo-sfondo")
      .upsert([
        {
          id: 1,
          url: urlImg,
        },
      ])
      .select();
    console.log(error && console.log(error));
  };

  const handleNewUrl = (objForm) => {
    uploadUrl(objForm);
  };

  /* FORM INSERIMENTO IMPREVISTI */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    handleNewUrl(data);
    //console.log(data);
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-full w-full flex-col items-center justify-around gap-2 bg-slate-100/10 p-4 xl:flex-row"
    >
      <div className="h-auto w-full border p-2 text-center">
        <label className="mx-auto w-full gap-4 p-4 font-semibold">
          Inserisci il link al'immagine che vuoi come sfondo comprensivo del{" "}
          <strong>HTTP:// o HTTPS://</strong> iniziale.
          {errors.urlImg && (
            <span className="font-normal italic text-[--clr-ter]">
              Il campo "Url" è obbligatorio
            </span>
          )}
          <input
            name="urlImg"
            {...register("urlImg", { required: true })}
            className="mt-4 h-8 w-5/6 rounded border px-2 font-semibold uppercase text-black placeholder:normal-case placeholder:italic"
            placeholder="Url"
          />
        </label>
        <button
          type="submit"
          className="mt-4 h-10 w-1/3 rounded bg-[--clr-sec] hover:bg-[--clr-prim]"
        >
          Salva ed Invia
        </button>
      </div>
    </form>
  );
};

export default ImgSfondo;
