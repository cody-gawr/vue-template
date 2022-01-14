export function _atob(string: string): string {
    if (typeof atob === "function")
        return atob(string);
    else
        return Buffer.from(string, 'base64').toString('binary');
}

export function parseJwt(token: string) {
    if (token !== undefined && token !== null && token !== "") {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            _atob(base64)
                .split("")
                .map(c => ("%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } else {
        return {};
    }
};