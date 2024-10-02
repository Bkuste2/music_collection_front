import dayjs from "dayjs";
import { statesOfBrazil } from "@/consts/states.ts";
import { Rule } from "./types.ts";

export const required = (
	{
		type = "string",
	}: {
		type?: "string" | "array" | "file" | "number" | "boolean" | "date";
	} = { type: "string" },
): Rule => {
	if (type === "file" || type === "date") {
		return {
			required: true,
			validator: (_, value) => {
				return new Promise<void>((resolve, reject) => {
					if (!value || (!dayjs(value) && !value.length)) {
						reject(new Error("Este campo é obrigatório"));
					}
					resolve();
				});
			},
		};
	}
	if (type === "boolean") {
		return {
			required: true,
			validator: (_, value) => {
				return new Promise<void>((resolve, reject) => {
					if (value) {
						resolve();
					}
					reject(new Error("Este campo é obrigatório"));
				});
			},
		};
	}
	return {
		required: true,
		type,
		message: "Este campo é obrigatório",
	};
};

export const isCNPJ = (): Rule => {
	return {
		required: true,
		validator: (_, value) => {
			if (!value) {
				return Promise.reject(new Error("CNPJ inválido"));
			}
			const cnpj = value.replace(/[^\d]+/g, "");

			const value1 = cnpj.substring(0, 2);
			const value2 = cnpj.substring(2, 5);
			const value3 = cnpj.substring(5, 8);
			const value4 = cnpj.substring(8, 12);
			const value5 = cnpj.substring(12, 14);
			let i;
			let result = true;

			const s = value1 + value2 + value3 + value4 + value5;

			const c = s.substr(0, 12);
			const dv = s.substr(12, 2);
			let d1 = 0;

			for (i = 0; i < 12; i += 1) d1 += c.charAt(11 - i) * (2 + (i % 8));

			if (d1 === 0) result = false;

			d1 = 11 - (d1 % 11);

			if (d1 > 9) d1 = 0;

			if (dv.charAt(0) !== d1.toString()) result = false;

			d1 *= 2;
			for (i = 0; i < 12; i += 1) {
				d1 += c.charAt(11 - i) * (2 + ((i + 1) % 8));
			}

			d1 = 11 - (d1 % 11);
			if (d1 > 9) d1 = 0;

			if (dv.charAt(1) !== d1.toString()) result = false;

			if (result) {
				return Promise.resolve();
			}
			return Promise.reject(new Error("CNPJ inválido"));
		},
	};
};

export const isCPF = (): Rule => {
	return {
		required: true,
		validator: (_, value) => {
			if (!value) {
				return Promise.reject(new Error("Este campo é obrigatório"));
			}
			const cpf = value.replace(/[^\d]+/g, "");
			if (!cpf) return Promise.reject(new Error("CPF inválido"));
			// Elimina CPFs invalidos conhecidos
			if (
				cpf.length !== 11 ||
				cpf === "00000000000" ||
				cpf === "11111111111" ||
				cpf === "22222222222" ||
				cpf === "33333333333" ||
				cpf === "44444444444" ||
				cpf === "55555555555" ||
				cpf === "66666666666" ||
				cpf === "77777777777" ||
				cpf === "88888888888" ||
				cpf === "99999999999"
			) {
				return Promise.reject(new Error("CPF inválido"));
			}
			// Valida 1o digito
			let add = 0;
			let i;
			let rev;
			for (i = 0; i < 9; i += 1) add += parseInt(cpf.charAt(i), 10) * (10 - i);
			rev = 11 - (add % 11);
			if (rev === 10 || rev === 11) rev = 0;
			if (rev !== parseInt(cpf.charAt(9), 10)) {
				return Promise.reject(new Error("CPF inválido"));
			}
			// Valida 2o digito
			add = 0;
			for (i = 0; i < 10; i += 1) add += parseInt(cpf.charAt(i), 10) * (11 - i);
			rev = 11 - (add % 11);
			if (rev === 10 || rev === 11) rev = 0;
			if (rev !== parseInt(cpf.charAt(10), 10)) {
				return Promise.reject(new Error("CPF inválido"));
			}
			return Promise.resolve();
		},
	};
};

export const isCRM = (): Rule => {
	return {
		required: true,
		validator: (_, value) => {
			if (!value) {
				return Promise.reject(new Error("O campo é obrigatório"));
			}
			const crm = value.replace(/[^\d\w]+/g, "").toUpperCase();

			if (crm.length < 4) {
				return Promise.reject(new Error("CRM inválido"));
			}

			const state = crm.slice(-2);

			if (!statesOfBrazil.includes(state)) {
				return Promise.reject(new Error("CRM inválido"));
			}

			const numberPart = crm.slice(0, -2);

			if (!/^\d+$/.test(numberPart)) {
				return Promise.reject(new Error("CRM inválido"));
			}

			if (numberPart.length < 1 || numberPart.length > 6) {
				return Promise.reject(new Error("CRM inválido"));
			}

			return Promise.resolve();
		},
	};
};

export const minLength = ({
	type,
	length,
}: {
	type: "string" | "array";
	length: number;
}): Rule => {
	return {
		validator(_, value) {
			if (value && value.length < length) {
				return Promise.reject(
					new Error(
						type === "string"
							? `At least ${length} characters are required`
							: `At least ${length} options are required`,
					),
				);
			}
			return Promise.resolve();
		},
	};
};

export const isCNES = (): Rule => {
	return {
		required: true,
		validator: (_, value) => {
			if (!value) {
				return Promise.reject(new Error("Este campo é obrigatório"));
			}
			if (!/^\d{7}$/.test(value)) {
				return Promise.reject(new Error("CNES inválido"));
			}
			return Promise.resolve();
		},
	};
};

export const isEmail: Rule = {
	type: "email",
	message: "Email Inválido",
};
