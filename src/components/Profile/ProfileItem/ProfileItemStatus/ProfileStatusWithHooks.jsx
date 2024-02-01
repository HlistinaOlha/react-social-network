import React, {useEffect, useState} from "react";
import {Form, FormControl, FormGroup} from "react-bootstrap";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import styles from '../ProfileItem.module.scss'

const ProfileStatusWithHooks = ({userStatus, changeStatus}) => {

    //const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(userStatus);

    /*const toggleEditMode = () => {
        setEditMode(!editMode)
    }*/

    const updateStatus = (e) => {
        setStatus(e.currentTarget.value)
    }

    const updateGlobalStatus = (e) => {
        //toggleEditMode()
        e.preventDefault()
        changeStatus(status)
    }

    useEffect(() => {
        setStatus(userStatus);
    }, [userStatus])

    return (
        <>
            {
                /*!editMode ?
                    <div>
                        <span onDoubleClick={toggleEditMode}>{status || '---'}</span>
                    </div>
                    :*/
                <Form className={styles.statusForm}
                      onSubmit={updateGlobalStatus}>
                    <FormControl className={styles.status}
                                 value={status}
                                 autoFocus
                                 onChange={updateStatus}
                    />
                    <button type="submit"
                            className={styles.submitBtn}
                    >
                        <CheckOutlinedIcon/>
                    </button>
                </Form>


                /* !this.state.editMode ?
                     <div>
                         <span onDoubleClick={this.toggleEditMode}>{this.state.status || '---'}</span>
                     </div>
                     :
                     <div>
                         <input value={this.state.status}
                                onMouseLeave={this.updateGlobalStatus}
                                onChange={this.updateStatus}
                                autoFocus
                         />
                     </div>*/
            }
        </>
    );
}


export default ProfileStatusWithHooks;
