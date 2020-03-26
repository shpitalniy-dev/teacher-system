import en from "./en";
import ru from "./ru";
import ar from  "./en";

const translates = {en, ru, ar};

export const getTranslatesByLocale = locale => {
    return translates[locale];
}