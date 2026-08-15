export const required = (value,message = "此项不能为空") => {
    if (!value || String(value).trim === ""){
        return message;
    }

    return "";
};

export const minLength = (value,length,message) => {
    if(String(value).length < length){
        return message;
    }

    return "";
};

export const maxLength = (value,length,message) => {
    if(String(value).length > length){
        return message;
    }
    return "";
};

export const isEmail = (value,message = "请输入正确的邮箱") => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
        return message;
    }

    return "";
};

export const isNumber = (value,message = "请输入数字") => {
    if (isNaN(value)) {
        return message;
    }

    return "";
};

export const minNumber = (value, min, message) => {
    if (Number(value) < min) {
        return message;
    }

    return "";
};

export const validate = (values, rules) => {
    const errors = {};

    Object.keys(rules).forEach((field) => {
        const fieldRules = rules[field];

        for (const rule of fieldRules) {
            const error = rule(values[field], values);

            if (error) {
                errors[field] = error;
                break;
            }
        }
    });

    return errors;
};