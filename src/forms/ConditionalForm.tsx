import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import {
  ZodConditionalFormValues,
  conditionalSchemaYup,
  conditionalSchemaZod,
} from "./conditionalSchema";
import { useEffect, useState } from "react";
import { ShowErrors } from "./ShowErrors";
import styles from "./ConditionalForm.module.css";
import { ChangeSchemaProvider } from "./ChangeSchemaProvider";
// import { yupResolver } from "@hookform/resolvers/yup";

export const ConditionalForm = () => {
  const [schemaProvider, setSchemaProvider] = useState<"yup" | "zod">("yup");
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState<FieldErrors<ZodConditionalFormValues>>();
  const { handleSubmit, register, watch, setValue } =
    useForm<ZodConditionalFormValues>({
      resolver:
        // schemaProvider === "zod"
        //   ?
        zodResolver(conditionalSchemaZod),
      // : yupResolver(conditionalSchemaYup),
    });
  const extra = watch("extra");

  useEffect(() => {
    if (!extra) {
      setValue("pet", undefined);
    }
  }, [setValue, extra]);
  return (
    <form
      onSubmit={handleSubmit(
        (v) => {
          setErrors({});
          setValues(v);
        },
        (err) => setErrors(err)
      )}
    >
      <ChangeSchemaProvider
        provider={schemaProvider}
        onChange={setSchemaProvider}
      />
      <fieldset>
        <input
          {...register("firstname")}
          type="text"
          name="firstname"
          placeholder="Vorname"
        />
        <input
          {...register("lastname")}
          type="text"
          name="lastname"
          placeholder="Nachname"
        />
      </fieldset>
      <div>
        <label htmlFor="extra">I möchte am Gewinnspiel teilnehmen!</label>
        <input {...register("extra")} type="checkbox" name="extra" id="extra" />
      </div>
      {extra && (
        <div className={styles.selectable}>
          <label htmlFor="pet">Welches Tier gefällt dir am besten?</label>
          <br />
          <select {...register("pet")} name="pet" id="pet">
            <option value="" selected>
              -- Bitte wählen --
            </option>
            <option value="dog"> Hund </option>
            <option value="cat"> Katze </option>
            <option value="hamster"> Hamster </option>
            <option value="gubby"> Gubby </option>
          </select>
        </div>
      )}
      <button type="submit">Absenden</button>
      {errors && <ShowErrors errors={errors} />}
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </form>
  );
};
