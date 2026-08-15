
export type ValidationRule = (
    value:string,
    values?: Record<string,string>
) => string;


//判空
export const required = (
    value:string,
    message = "此项不能为空"
) :string => {
    if (!value || String(value).trim() === ""){
        return message;
    }

    return "";
};

//长度
export const minLength = (
    value:string,
    length:number,
    message:string
):string => {
    if(String(value).length < length){
        return message;
    }

    return "";
};

//长度
export const maxLength = (
    value:string,
    length:number,
    message:string
):string => {
    if(String(value).length > length){
        return message;
    }
    return "";
};

//邮箱格式
export const isEmail = (
    value:string,
    message = "请输入正确的邮箱"
):string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
        return message;
    }

    return "";
};

//数字合法
export const isNumber = (
    value:string,
    message = "请输入数字"
):string => {
    if (isNaN(Number(value))) {
        return message;
    }

    return "";
};

//最小值
export const minNumber = (
    value:string,
    min:number, 
    message:string
):string => {
    if (Number(value) < min) {
        return message;
    }

    return "";
};

export const maxNumber = (
    value:string,
    max:number, 
    message:string
):string => {
    if (Number(value) > max) {
        return message;
    }

    return "";
};


export const validate = (
    values: Record<string, string>,
    rules: Record<string, ValidationRule[]>
): Record<string, string> => {

    const errors: Record<string, string> = {};

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