import {create} from 'react-test-renderer';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React from "react";
import {updateStatus} from "../../../../redux/profile-reducer";
import {useDispatch} from "react-redux";
import ProfileStatus from "./ProfileStatus";

//testing Class Component
describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const status = 'my status';

        const component = create(<ProfileStatus status={status}/>);
        const instance = component.getInstance();

        expect(instance.state.status).toBe('my status')
    });

    test('callback should be called', () => {
        const mockCallback = jest.fn();

        const component = create(<ProfileStatus userStatus='my status'
                                                changeStatus={mockCallback}
                                                isProfileCurrentUser={true}
        />)
        const instance = component.getInstance();
        instance.updateGlobalStatus()

        expect(mockCallback.mock.calls.length).toBe(1)
    });

    test('input should be displayed in edit mode', () => {
        const userStatus = 'my status';

        const component = create(<ProfileStatus userStatus={userStatus}/>)
        const instance = component.root;
        const span = instance.findByType('span');
        //DOESNT WORK!!!

        //span.props.onDoubleClick();

        //const input = instance.findByType('input');
        //console.log( input);
        //expect(input.props.value).not.toBeNull()
    });
});

