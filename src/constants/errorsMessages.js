export const ERROR = {
  USER_REQUIRE: "El nombre de usuario es requerido",
  EMAIL_REQUIRE: "El correo electrónico es requerido",
  EMAIL_INVALID: "Por favor ingresa un correo electrónico válido",
  ADRESS_REQUIRE: "La dirección es requerida",
  PASSWORD_REQUIRE: "La contraseña es requerida",
  PASSWORD_SHORT: "La contraseña debe tener al menos 6 caracteres",
  PHONE_REQUIRE: "El número de teléfono es requerido",
  LOGIN_FAILED:
    "Los datos de inicio de sesión son incorrectos. Por favor, verifícalos. \n\nSi no tienes una cuenta, puedes crear una en el siguiente enlace.",
  REGISTER_FAILED:
    "Ya existe un usuario con el correo que intenta registrarse. \n\nSi quiere restablecer su contraseña hágalo en el siguiente enlace.",
  USER_NOT_FOUND:
    "El correo electrónico ingresado no tiene un usuario asociado.\n\nVerifica la dirección de correo electrónica ingresada e intenta nuevamente.",
  PASSWORD_RECOVERY_SUCCESSFUL:
    "Revisa la bandeja de entrada de tu correo. \n\nSigue las instrucciones para iniciar sesión",
};

export const POST = {
  NAME_PRODUCT: "El nombre del producto es requerido",
  IMAGE: "La imagen es requerida",
  QUANTITY: "Indica una cantidad",
  PUBLICATION_DESCRIPTION: "Es denecesario que describas tu producto",
  TRANSACTION_TYPE: "Es necesario que elijas el tipo",
  COST: "Establece un precio"
};

const FIELDS = {
  nameProduct: POST.NAME_PRODUCT,
  image: POST.IMAGE,
  quantity: POST.QUANTITY,
  publicationDescription: POST.PUBLICATION_DESCRIPTION,
  transactionType: POST.TRANSACTION_TYPE,
  cost: POST.COST,
};

export function validatePost(post) {
  for (const field in FIELDS) {
    if (!post[field]) {
      return FIELDS[field];
    }
  }
  return null;
}