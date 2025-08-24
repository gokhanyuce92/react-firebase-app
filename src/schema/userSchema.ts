import * as Yup from "yup";

export type userSchemaValues = Yup.InferType<typeof userSchema>;

export const userSchema = Yup.object().shape({
    email: Yup.string().email("Geçerli bir email adresi giriniz.").required("Email zorunludur."),
    password: Yup.string()
        .min(6, "Şifre en az 6 karakter olmalı.")
        .max(20, "Şifre en fazla 20 karakter olmalı.")
        .required("Şifre zorunludur."),
});
