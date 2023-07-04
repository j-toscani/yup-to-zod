import { ChangeEvent } from "react";
import styles from "./ChangeSchemaProvider.module.css"

export function ChangeSchemaProvider(props: {
  provider: "zod" | "yup";
  onChange: (v: "zod" | "yup") => void;
}) {
  const handleSchemaTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "zod" | "yup";
    props.onChange(value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="yup">
        Yup
        <input
          type="radio"
          name="schema"
          id="yup"
          value="yup"
          checked={props.provider === "yup"}
          onChange={handleSchemaTypeChange}
        />
      </label>
      <label htmlFor="zod">
        Zod
        <input
          type="radio"
          name="schema"
          id="zod"
          value="zod"
          checked={props.provider === "zod"}
          onChange={handleSchemaTypeChange}
        />
      </label>
    </div>
  );
}
