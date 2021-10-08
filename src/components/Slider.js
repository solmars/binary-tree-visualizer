
import React, { useState } from 'react'

export default function Slider(props) {
    const values = props.props;
    const [value, setValue] = useState(values.min_value);
    const handleOnChange = (e) => {
        setValue(e.target.value);
        values.onChange(e.target.value);
    }
    return (
        <input type="range" min={values.min_value} max={values.max_value} step={values.step} value={value} onChange={handleOnChange}></input>
    )
}
