const TOKEN_KEY = 'Admin-Token';
const LANG_KEY = 'lang'
const STAY_KEY = 'stayin';

export function setStaySingIn(val: boolean): void {
    if (process.browser)
        localStorage.setItem(STAY_KEY, val.toString());
}

export function getStaySingIn(val: boolean): boolean {
    if (process.browser)
        return localStorage.getItem(STAY_KEY) === "true";
    return false;
}

export function saveLanguage(lang: any): void {
    if (process.browser)
        localStorage.setItem(LANG_KEY, JSON.stringify(lang));
}

export function loadLanguage(): { name: string, icon: string, locale: string } {
    let _l = localStorage.getItem(LANG_KEY);
    try {
        if (_l === null) {
            return {
                name: "English",
                icon: "en",
                locale: "en"
            }
        } else {
            return JSON.parse(_l);
        }
    } catch {
        return {
            name: "English",
            icon: "en",
            locale: "en"
        }
    }
}
