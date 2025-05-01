import z from "zod"

export const isEmailValid  = (email) =>{
    const schema = z.string().email();
    const result = schema.safeParse(email);
    return result.success;
}