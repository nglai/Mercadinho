const yup = require('yup')

let updateProfileSchema = yup.object().shape({
    NAME: yup
        .string()
        .min(5, "O nome deve ter no mínimo 5 caracteres")
});

let updateUsersSchema = yup.object().shape({
    NAME: yup
        .string()
        .min(5, "O nome deve ter no mínimo 2 caracteres"),
    CPF: yup
        .string()
        .min(11, "O CPF deve ter 11 caracteres")
        .max(11, "O CPF de ter 11 caracteres"),
    PASSWORD: yup
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres"),
    PROFILE_ID: yup
        .number()
        .positive("O id profile deve ser positivo")
        .integer("O id profile deve ser um número inteiro")
});

let updateProductsSchema = yup.object().shape({
    DESCRIPTION: yup
        .string()
        .min(5, "A descrição deve ter pelo menos 5 caracteres"),
    BRAND: yup
        .string(),
    CATEGORY: yup
        .string(),
    PRICE: yup
        .number()
        .positive("O preço deve ser positivo"),
    QUANTITY: yup
        .number()
        .positive("A quantidade deve ser positiva")
        .integer("A quantidade deve ser um número inteiro")
});

module.exports = {updateProfileSchema, updateUsersSchema, updateProductsSchema}
