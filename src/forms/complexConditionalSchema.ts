import * as z from 'zod';

const timeToNumber = (hours:string, minutes:string) => {
    const date = new Date(0,0,0, parseInt(hours), parseInt(minutes))
    return date.getTime()
} 

const startBeforeEnd = (start: string, end: string) => {
    const [startHour, startMinutes] = start.split(':');
    const [endHour, endMinutes] = end.split(':');
    
    return timeToNumber(startHour, startMinutes) < timeToNumber(endHour, endMinutes)
}

const telephoneAvailableSchema = z.object({
    enabled: z.boolean(),
    day: z.string(),
    start: z.string().optional(),
    end: z.string().optional()
}).superRefine((data, context) => {
    if (!data.enabled) return true

    if (!data.start) {
        context.addIssue({
            message: "Startzeit ist erforderlich",
            code: z.ZodIssueCode.custom,
            path: ["start"]
        })
    }

    if (!data.end) {
        context.addIssue({
            message: "Endzeit ist erforderlich",
            code: z.ZodIssueCode.custom,
            path: ["end"]
        })
    }

    if (data.start && data.end && !startBeforeEnd(data.start, data.end)) {
        context.addIssue({
            message: "Die Endzeit muss nach der Startzeit liegen.",
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