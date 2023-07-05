import { FieldErrors, FieldValues } from "react-hook-form";


export function ShowErrors<T extends FieldValues>(props: { errors: FieldErrors<T>}) {
    const mappedErrors = Object.values(props.errors).map(error => ({...error, message: error?.message ?? '', id: crypto.randomUUID()}))
    return <ul>
        { mappedErrors.map( error => (error.message && <li key={error.id}> { `${error.message}` } </li>))}
    </ul>
}