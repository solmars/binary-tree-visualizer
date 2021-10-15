
import React, { useState } from 'react'

export default function Slider(props) {
    const values = props.props;
    const [value, setValue] = useState(values.min_value);
    const handleOnChange = (e) => {
        let sliderValue = e.target.value;
        // for example, if step is 20 starts at 10 and max is 1000, the max value for the slider would actually be only 990, so if it is 990, put it to max
        if (parseInt(sliderValue) + parseInt(values.step) > parseInt(values.max_value)) {
            sliderValue = values.max_value;
        }
        setValue(sliderValue);

        values.onChange(sliderValue);
    }
    return (
        <input type="range" min={values.min_value} max={values.max_value} step={values.step} value={value} onChange={handleOnChange}></input>
    )
}
