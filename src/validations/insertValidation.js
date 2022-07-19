const yup = require('yup')

let insertProfileSchema = yup.object().shape({
    NAME: yup
        .string()
        .required("O nome é obrigatório")
        .min(5, "O nome deve ter no mínimo 5 caracteres")
});

let insertUsersSchema = yup.object().shape({
    NAME: yup
        .string()
        .required("O nome é obrigatório")
        .min(5, "O nome deve ter no mínimo 2 caracteres"),
    CPF: yup
        .string()
        .required("O CPF é obrigatório")
        .min(11, "O CPF deve ter 11 caracteres")
        .max(11, "O CPF de ter 11 caracteres"),
    PASSWORD: yup
        .string()
        .required("A senha é obrigatória")
        .min(8, "A senha deve ter no mínimo 8 caracteres"),
    PROFILE_ID: yup
        .number()
        .required("O id profile é obrigatório")
        .positive("O id profile deve ser positivo")
        .integer("O id profile deve ser um número inteiro")
});

let insertProductsSchema = yup.object().shape({
    DESCRIPTION: yup
        .string()
        .required("A descrição é obrigatória")
        .min(5, "A descrição deve ter pelo menos 5 caracteres"),
    BRAND: yup
        .string()
        .required("A marca é obrigatória"),
    CATEGORY: yup
        .string()
        .required("A categoria é obrigatória"),
    PRICE: yup
        .number()
        .required("O preço é obrigatório")
        .positive("O preço deve ser positivo"),
    QUANTITY: yup
        .number()
        .required("A quantidade é obrigatória")
        .positive("A quantidade deve ser positiva")
        .integer("A quantidade deve ser um número inteiro")
});

let insertPaymentMethodSchema = yup.object().shape({
    PAYMENT_TYPE: yup
        .string()
        .required("O tipo do pagamento é obrigatório")
});

let insertCheckoutStatusSchema = yup.object().shape({
    SITUATION: yup
        .string()
        .required("A situação do checkout é obrigatória")
});

let insertCheckoutSchema = yup.object().shape({
    TOTAL: yup
        .number()
        .required("O valor total é obrigatório")
        .positive("O valor total deve ser positivo"),
    PAYMENT_METHOD_ID: yup
        .number()
        .required("O id do metodo de pagamento é obrigatório")
        .positive("O id do metodo de pagamento deve ser positivo")
        .integer("O id do metodo de pagamento deve ser um número inteiro"),
    CHECKOUT_STATUS_ID: yup
        .number()
        .required("O id do status do checkout é obrigatório")
        .positive("O id do status do checkout deve ser positivo")
        .integer("O id do status do checkout deve ser um número inteiro")
});

let insertCheckoutProductSchema = yup.object().shape({
    PRODUCT_ID: yup
        .number()
        .required("O id do metodo de pagamento é obrigatório")
        .positive("O id do metodo de pagamento deve ser positivo")
        .integer("O id do metodo de pagamento deve ser um número inteiro"),
    CHECKOUT_ID: yup
        .number()
        .required("O id do status do checkout é obrigatório")
        .positive("O id do status do checkout deve ser positivo")
        .integer("O id do status do checkout deve ser um número inteiro"),
    QUANTITY: yup
        .number()
        .required("A quantidade é obrigatória")
        .positive("A quantidade deve ser positiva")
        .integer("A quantidade deve ser um número inteiro"),
    PRICE: yup
        .number()
        .required("O preço é obrigatório")
        .positive("O preço deve ser positivo"),
});

module.exports = {insertProfileSchema, insertUsersSchema, insertProductsSchema}