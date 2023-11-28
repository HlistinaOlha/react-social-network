import React, {Component} from "react";

class ProfileStatus extends Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    toggleEditMode = () => {
        if (!this.props.isProfileCurrentUser) return
        this.setState({
            editMode: !this.state.editMode
        })
    }

    updateStatus = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    updateGlobalStatus = () => {
        this.toggleEditMode()
        this.props.changeStatus(this.state.status)
    }

    componentDidMount() {
       // console.log('componentDidMount')
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
        let a = this.state
        let b = this.props
        //console.log('componentDidUpdate')
    }


    render() {
        return (
            <>
                {
                    !this.state.editMode ?
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
                        </div>
                }
            </>
        )
    }
}

export default ProfileStatus;
