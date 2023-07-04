import { FieldErrors, useForm } from "react-hook-form";
import {
  YupLoginSchema,
  ZodLoginSchema,
  yupSchema,
  zodSchema,
} from "./loginSchemas";
import { useState } from "react";
import { ShowErrors } from "./ShowErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeSchemaProvider } from "./ChangeSchemaProvider";

export const LoginForm = () => {
  const [schemaProvider, setSchemaProvider] = useState<"yup" | "zod">("yup");
  const [values, setValues] = useState({});
  const { register, handleSubmit } = useForm<ZodLoginSchema | YupLoginSchema>({
    resolver:
      schemaProvider === "zod"
        ? zodResolver(zodSchema)
        : yupResolver(yupSchema),
  });
  const [errors, setErrors] = useState<FieldErrors<ZodLoginSchema>>();

  return (
    <form noValidate onSubmit={handleSubmit((v) => {setValues(v); setErrors({})}, setErrors)}>
      <ChangeSchemaProvider
        provider={schemaProvider}
        onChange={setSchemaProvider}
      />
      <fieldset>
        <input
          {...register("email")}
          name="email"
          type="email"
          placeholder="E-Mail"
        />
        <input
          {...register("password")}
          name="password"
          type="password"
          placeholder="Passwort"
        />
      </fieldset>

      <button type="submit"> Submit </button>
      {errors && <ShowErrors errors={errors} />}
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </form>
  );
};
