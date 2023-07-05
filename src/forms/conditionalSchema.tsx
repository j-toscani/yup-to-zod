import * as z from "zod";
import * as y from "yup";

const petOptions = Object.freeze([
  "dog",
  "cat",
  "hamster",
  "gubby",
  "",
] as const);

export const conditionalSchemaYup = y.object({
  firstname: y.string().trim().required(),
  lastname: y.string().trim().required(),
  extra: y.boolean().required(),
  pet: y
    .string()
    .oneOf(petOptions)
    .when("extra", { is: true, then: (schema) => schema.required() }),
});

export const conditionalSchemaZod = z
  .object({
    firstname: z.string().trim().nonempty(),
    lastname: z.string().trim().nonempty(),
    extra: z.boolean(),
    pet: z.enum(petOptions).optional(),
  })
  .refine(({ extra, pet }) => {
    if (!extra) return true;

    return !!pet;
  }, "Gib ein Haustier an, wenn du am Gewinnspiel teilnehmen möchtest.");

export type ZodConditionalFormValues = z.infer<typeof conditionalSchemaZod>;
export type YupConditionalFormValues = y.InferType<typeof conditionalSchemaYup>;
