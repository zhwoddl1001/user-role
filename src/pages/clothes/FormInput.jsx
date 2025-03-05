const FormInput = ({id, label, placeholder,value,onChange}) => {
    return (
        <div className="form-floating mb-3">
            <input className="form-control"
                   id={id}
                   name={id}
                   type="text"
                   placeholder={placeholder}
                   value={value}
                   onChange={onChange}
                   required
                   data-sb-validations="required" />
            <label htmlFor={id}>
                {label} :
            </label>
            <div className="invalid-feedback">
                {label}은(는) 필수로 입력해야합니다.
            </div>
        </div>
    )
};
export default FormInput;