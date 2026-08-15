
//判空
export const required = (value,message = "此项不能为空") => {
    if (!value || String(value).trim === ""){
        return message;
    }

    return "";
};

//长度
export const minLength = (value,length,message) => {
    if(String(value).length < length){
        return message;
    }

    return "";
};

//长度
export const maxLength = (value,length,message) => {
    if(String(value).length > length){
        return message;
    }
    return "";
};

//邮箱格式
export const isEmail = (value,message = "请输入正确的邮箱") => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
        return message;
    }

    return "";
};

//数字合法
export const isNumber = (value,message = "请输入数字") => {
    if (isNaN(value)) {
        return message;
    }

    return "";
};

//最小值
export const minNumber = (value, min, message) => {
    if (Number(value) < min) {
        return message;
    }

    return "";
};

export const maxNumber = (value, max, message) => {
    if (Number(value) > max) {
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