import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";

import { useState } from "react";
import { ShowErrors } from "./ShowErrors";
import styles from "./ComplexConditionalForm.module.css";
import {
  ZodComplexConditionalFormValues,
  complexConditionalSchemaZod,
} from "./complexConditionalSchema";

const telephoneAvailable = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
].map((day) => ({
  enabled: false,
  day,
}));

export const ComplexConditionalForm = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] =
    useState<FieldErrors<ZodComplexConditionalFormValues>>();
  const { handleSubmit, register, watch, setValue, control } =
    useForm<ZodComplexConditionalFormValues>({
      resolver: zodResolver(complexConditionalSchemaZod),
      defaultValues: {
        owner: "",
        street: "",
        telephoneAvailable,
      },
    });
  const { fields } = useFieldArray({
    control,
    name: "telephoneAvailable",
  });
  const telephonesAvailable = watch("telephoneAvailable");

  return (
    <form
      onSubmit={handleSubmit(
        (v) => {
          setErrors({});
          setValues(v);
        },
        (err) => {
          setErrors(err);
        }
      )}
    >
      <fieldset>
        <input
          {...register("owner")}
          type="text"
          name="owner"
          placeholder="Eigentümer"
        />
        <input
          {...register("street")}
          type="text"
          name="street"
          placeholder="Straße + Hausnummer"
        />
        <input {...register("zip")} type="text" name="zip" placeholder="PLZ" />
      </fieldset>
      {fields.map(({ day }, index) => (
        <div className={styles.opening}>
          <h3 style={{ margin: 0 }}>{day}</h3>
          <fieldset className={styles.openingHours}>
            <div>
              <label htmlFor={`enabled-${index}`}>Aktiv</label>
              <input
                {...register(`telephoneAvailable.${index}.enabled`)}
                type="checkbox"
                id={`enabled-${index}`}
              />
            </div>
            <input
              type="time"
              {...register(`telephoneAvailable.${index}.start`)}
              disabled={!telephonesAvailable[index].enabled}
            />
            <input
              disabled={!telephonesAvailable[index].enabled}
              type="time"
              {...register(`telephoneAvailable.${index}.end`)}
            />
          </fieldset>
        </div>
      ))}
      <button type="submit">Absenden</button>
      {errors && <ShowErrors errors={errors} />}
      {errors && Array.isArray(errors.telephoneAvailable) && errors.telephoneAvailable.map(err => <ShowErrors errors={err} />)}
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </form>
  );
};
