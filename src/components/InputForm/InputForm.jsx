
export default function InputForm({label, ...otherProps}){
    return(
        <>
            {label && (
                <label htmlFor={otherProps.id} className={`
                    ${otherProps.value.length ? 'shrink':''} form-label
                `}>
                    {label}
                </label>
            )}
            <input className="form-control" {...otherProps}/>
        </>
    );
}