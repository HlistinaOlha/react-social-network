import React, {useEffect, useState} from "react";

const ProfileStatusWithHooks = ({userStatus, isProfileCurrentUser, changeStatus}) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(userStatus);

    const toggleEditMode = () => {
        if (!isProfileCurrentUser) return
        setEditMode(!editMode)
    }

    const updateStatus = (e) => {
        setStatus(e.currentTarget.value)
    }

    const updateGlobalStatus = () => {
        toggleEditMode()
        changeStatus(status)
    }

    useEffect(() => {
        setStatus(userStatus);
    }, [userStatus])

    return (
        <>
            {
                !editMode ?
                    <div>
                        <span onDoubleClick={toggleEditMode}>{status || '---'}</span>
                    </div>
                    :
                    <div>
                        <input value={status}
                               onMouseLeave={updateGlobalStatus}
                               onChange={updateStatus}
                               autoFocus
                        />
                    </div>
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
