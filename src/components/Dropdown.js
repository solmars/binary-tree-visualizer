import React from 'react'

export default function Dropdown(info) {

    const props = info.props;
    const handleOnChange = (e) => {
        if (props.onChange) {
            props.onChange(e);
        }
    };
    return (
        <select className="dropdown" defaultValue={'DEFAULT'} onChange={handleOnChange}>
            <option value="DEFAULT" disabled>{props.defaultText}</option>
            {props.options.map(item => {
                return (
                    <option value={item.value} key={item.value} >{item.text}</option>
                )
            })}
        </select >
    )
}
