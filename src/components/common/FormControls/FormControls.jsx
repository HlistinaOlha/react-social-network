import React from "react";
import styles from './FormControls.module.css'
import {Field} from "redux-form";

const FormControl = ({meta: {touched, error}, children}) => {

    const hasError = touched && error;

    return (
        <div className={`${styles.formControl} ${hasError ? styles.error : ""}`}>
            {children}
            {
                hasError &&
                <div>
                    <span>{error}</span>
                </div>
            }
        </div>
    )
}

export const TextArea = (props) => {

    const {input, meta, children, ...restProps} = props;

    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}

export const Input = (props) => {
    const {input, meta, children, ...restProps} = props;

    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
}

export const Checkbox = (props) => {
    const {input, meta, children, ...restProps} = props;

    return <FormControl {...props}>
        <input type="checkbox" {...input} {...restProps}/>
    </FormControl>
}

export const createField = (component, name, placeholder, validators = [], props = {}, text = "") => (
    <div>
        <Field component={component}
               name={name}
               placeholder={placeholder}
               validate={validators}
               {...props}
        /> {text}
    </div>
)

