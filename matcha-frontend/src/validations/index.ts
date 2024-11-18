import * as Yup from "yup";

// login
export const SignInShema = () =>
    Yup.object().shape({
      email: Yup.string()
        .email(("Invalid Email"))
        .required(("Field is mandatory")),
      password: Yup.string()
        .min(8, ("Invalid Password"))
        .required(("Field is mandatory")),
    });
// register
export const SignUpSchema = () => 
    Yup.object().shape({
        firstname: Yup.string()
            .max(20, ("Firstname must be less than 20 characters"))
            .required(("Field is mandatory")),
        lastname: Yup.string()
            .max(20, ("Lastname must be less than 20 characters"))
            .required(("Field is mandatory")),
        username: Yup.string()
            .max(10, ("Username must be less than 20 characters"))
            .required(("Field is mandatory")),
        email: Yup.string()
            .email(("Invalid Email"))
            .required(("Field is mandatory")),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])/, "Password must be alphanumeric and contain at least one special character")
            .required("Field is mandatory"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match")
            .required("Field is mandatory")
    });

    export const ForgetPasswordSchema = () =>
        Yup.object().shape({
          email: Yup.string()
            .email(("Invalid Email"))
            .required(("Field is mandatory")),
          code: Yup.number()
          .required()
          .min(100000, 'Must be exactly 6 characters')
          .max(999999, 'Must be exactly 6 characters')
          .label("Zip Code"),
        });
    
    export const sendVerificationCodeSchema = () =>
        Yup.object().shape({
          email: Yup.string()
            .email(("Invalid Email"))
            .required(("Field is mandatory")),
        });

    export const ResetPasswordSchema = () =>
        Yup.object().shape({
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])/, "Password must be alphanumeric and contain at least one special character")
                .required("Field is mandatory"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], "Passwords must match")
                .required("Field is mandatory")
        });