import React from "react";
import constatns from "../../constants/constants";

const Select = props => {
    const { changeLanguage, locale } = props;

    return (
        <select value={locale}
                onChange={changeLanguage}
                className="input-style"
                id="selectLanguage"
        >
            <option value={constatns.en}>English</option>
            <option value={constatns.ru}>Русский</option>
            <option value={constatns.ar}>Arabskiy</option>
        </select>
    )
}

export default React.memo(Select);