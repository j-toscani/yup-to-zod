import { FieldErrors, useForm } from "react-hook-form"
import { ZodLoginType, zodSchema } from "./loginSchemas"
import { useState } from "react";
import { ShowErrors } from "./ShowErrors";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
    const [values, setValues] = useState({});
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(zodSchema)
    })
    const [errors, setErrors] = useState<FieldErrors<ZodLoginType>>()
    return (
    <form noValidate onSubmit={handleSubmit((v) => setValues(v), setErrors)} >
        <h1>
            Login
        </h1>
        <fieldset>
            <input {...register("email")} name="email" type="email" placeholder='E-Mail' />
            <input {...register("password")} name="password" type="password" placeholder='Passwort' />
        </fieldset>

        <button type="submit"> Submit </button>
        { errors && <ShowErrors errors={errors} />}
        <pre>
            { JSON.stringify(values, null, 2) }
        </pre>
    </form>
    )
}