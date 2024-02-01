import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from "react";

const ModalWindowContainer = ({text, dependency, onSubmit, formId = '', submitBtnText = '', children}) => {
    const [modalShow, setModalShow] = useState(false);
    //const [userPhoto, setUserPhoto] = useState(dependency?.photos);

    const showModal = (e) => {
        e.preventDefault()
        setModalShow(true)
    }

    const hideModal = () => {
        setModalShow(false)
    }

    const handleSubmit = (e, id, text) => {
        onSubmit(e, id, text)
        hideModal()
    }

    useEffect(() => {
        if (dependency) {
            console.log('hideModal')
            hideModal()
        }
    }, [dependency])

    return (
        <>
            <a href="#" onClick={(e) => showModal(e)}>{text} </a>
            <ModalWindow
                text={text}
                show={modalShow}
                handleSubmit={handleSubmit}
                formId={formId}
                submitBtnText={submitBtnText}
                onHide={hideModal}>{children}</ModalWindow>
        </>
    );
}

const ModalWindow = ({text, onHide, handleSubmit, formId, submitBtnText, children, ...restProps}) => {

    return (
        <Modal
            {...restProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {text}
                </Modal.Title>
                <button type="button"
                        onClick={onHide}
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"/>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {submitBtnText &&
                <Button type="submit"
                        form={formId}
                >{submitBtnText}</Button>
                }
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWindowContainer;
