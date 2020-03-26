export const setLSData = (key, value) => {
    if (localStorage) {
        localStorage.setItem(key, value);
    } else {
        return new Error("LOCAL STORAGE IS NOT HERE...")
    }
}

export const changeDirection = locale => {
    if (document && document.body && document.body.style) {
        document.body.style.direction = locale !== "ar" ? "ltr" : "rtl";
    } else {
        return new Error("SOMETHING WENT WRONG...");
    }
}