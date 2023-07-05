import * as z from 'zod';

const telephoneAvailableSchema = z.object({
    enabled: z.boolean(),
    day: z.string(),
    start: z.string().optional(),
    end: z.string().optional()
}).superRefine((data, context) => {
    if (!data.enabled) return true

    if (!data.start) {
        context.addIssue({
            message: "Startdatum ist erforderlich",
            code: z.ZodIssueCode.custom,
            path: ["start"]
        })
    }

    if (!data.end) {
        context.addIssue({
            message: "Enddatum ist erforderlich",
            code: z.ZodIssueCode.custom,
            path: ["end"]
        })
    }
})

export const complexConditionalSchemaZod = z.object({
    street: z.string().trim().nonempty(),
    zip: z.string().length(5).regex(/^\d+$/).transform(Number),
    owner: z.string().trim().nonempty(),
    telephoneAvailable: z.array(telephoneAvailableSchema).length(7)
})

export type ZodComplexConditionalFormValues = z.infer<typeof complexConditionalSchemaZod>