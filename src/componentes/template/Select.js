import React from 'react';

const emptyF = () => {
};
const Select = ({
                    onSelect = emptyF, options = [], idKey = 'id', labelKey = 'nombre', selected = null, className = '',
                    emptyLabel = 'Elija una opcion'
                }) => {
    return (
        <select className={`form-select text-center ${className}`}
                onChange={(e) =>
                    onSelect(options[
                        options.map(option => !isNaN(option[idKey]) ? parseInt(option[idKey]) : option[idKey])
                            .indexOf(!isNaN(e.target.value) ? parseInt(e.target.value) : e.target.value)
                        ])
                }
                value={selected ? selected[idKey] : ''}>
            <option value="" key={'empty'}>{emptyLabel}</option>
            {(options || []).map((option, idx) =>
                <option key={idx} value={option[idKey]}>{option[labelKey]}</option>
            )}
        </select>
    );
};

export default Select;
