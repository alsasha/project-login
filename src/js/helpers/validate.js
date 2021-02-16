const regExpDic = {
    email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
    password: /^[0-9a-zA-Z]{4,}$/,
    country: /^[a-zA-Z]{1,30}$/,
    nickname: /^[a-zA-Z0-9_-]{3,16}$/,
    name: /^[a-zA-Z]{1,30}$/,
    phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
};

export function validate(el) {
    const regExpType = el.dataset.required;
    if (!regExpDic[regExpType]) return true;
    return regExpDic[regExpType].test(el.value);
}
