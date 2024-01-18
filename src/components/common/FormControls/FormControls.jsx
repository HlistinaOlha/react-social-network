import React, {useRef} from "react";
import styles from './FormControls.module.scss'
import {Field} from "redux-form";
import Form from 'react-bootstrap/Form';
import {FloatingLabel} from "react-bootstrap";

const FormControl = ({meta: {touched, error, form}, children}) => {

    const hasError = form === "uploadImage" ? error : (touched && error);


    return (
        <Form.Group className={`${styles.formControl} ${hasError ? styles.error : ""}`}>
            {children}
            {
                hasError && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            }
        </Form.Group>
    )
}

export const TextArea = (props) => {

    const {input, meta, children, ...restProps} = props;

    return <FormControl {...props}>
        <Form.Control className={styles.textarea}
                      as="textarea"
                      rows={3}
                      {...input}
                      {...restProps}/>
    </FormControl>
}

export const Input = (props) => {
    const {input, meta, children, ...restProps} = props;

    return <FormControl {...props}>
        <FloatingLabel label={props.placeholder}
                       className={`${styles.formFloating}`}>
            <Form.Control {...input}
                          {...restProps}
                          className={props.name}
            />
        </FloatingLabel>
    </FormControl>
}

export const InputSearch = (props) => {
    const {input, meta, children, value, searchUser, ...restProps} = props;

    return <FormControl {...props} >
        <Form.Control {...input}
                      {...restProps}
                      type="search"
                      value={value}
                      onChange={searchUser}/>
    </FormControl>
}

export const InputFile = (props) => {
    const {input, meta, children, updateImage, hiddenFileInput, ...restProps} = props;

    return <FormControl {...props} >
        <Form.Control {...input}
                      {...restProps}
                      type="file"
                      className="d-none"
                      onChange={updateImage}
                      ref={hiddenFileInput}/>
    </FormControl>
}

export const Checkbox = (props) => {
    const {input, meta, children, label, ...restProps} = props;

    return <FormControl {...props}>
        <Form.Label className={styles.formCheckLabel}>
            <Form.Check className={styles.formCheck} {...input} {...restProps} />
            {label}
        </Form.Label>
    </FormControl>
}

export const Radio = (props) => {
    const {input, meta, children, handleOptionChange, ...restProps} = props;

    return <FormControl {...props}>
        <Form.Check inline
                    type="radio"
                    onClick={handleOptionChange} //wrong event
                    className={styles.formRadio}
                    {...input}
                    {...restProps} />
    </FormControl>
    /*return <FormControl {...props}>
        {
            radioOptions.map(option => (
                <Form.Check key={option.value}
                            inline
                            value={option.value}
                            label={option.label}
                            checked={lookingForAJobSelectedOption === option.value}
                            type="radio"
                            onChange={handleOptionChange}
                            className={styles.formRadio}
                            {...input}
                            {...restProps} />
            ))
        }
    </FormControl>*/
}

export const createField = (component, name, placeholder, validators = [], props = {}, text = "") => (
    <Field component={component}
           name={name}
           placeholder={placeholder}
           validate={validators}
           {...props}
           label={text}
    />
)

