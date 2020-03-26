import React from "react";

const Select = props => {
    const { onChangeCallback, selectValue, options, dictionary } = props;

    return (
        <select value={selectValue} onChange={onChangeCallback} className="input-style">
            {options && options.map(option => <option key={option.value} value={option.value}>{dictionary.resources[option.resourceKey]}</option>)}
        </select>
    )
};

export default React.memo(Select);