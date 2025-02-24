import { memo } from "react";

function MySelect({title, onChange, defaultValue, options}) {
    return (
        <div>
            <h3>{title}</h3>
            <select onChange={(e) => onChange(e)} defaultValue={defaultValue}>
                {options.map((option) => {
                    return (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default memo(MySelect)
