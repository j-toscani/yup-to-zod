import * as y from 'yup';
import * as z from 'zod';

const messages = {
    required: 'Dieses Feld ist ein Pflichtfeld',
    email: 'Wert muss eine valide E-Mail sein.',
    pwMinLength: 'Das Passwort muss mindest 8 Zeichen lang sein.'
}

export const yupSchema = y.object({
    email: y.string().email(messages.email).required(messages.required),
    password: y.string().trim().min(8, messages.pwMinLength).required(messages.required),
})

export const zodSchema = z.object({
    email: z.string({
        required_error: messages.required
    }).email(messages.email),
    password: z.string({
        required_error: messages.required
    }).trim().min(8, messages.pwMinLength)
})

export type ZodLoginSchema = z.infer<typeof zodSchema>
export type YupLoginSchema = y.InferType<typeof yupSchema>