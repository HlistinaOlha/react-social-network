import {create, act} from 'react-test-renderer';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React from "react";
import {updateStatus} from "../../../../redux/profile-reducer";
import {useDispatch} from "react-redux";
//import {act} from "@testing-library/react";
import {fireEvent} from "@testing-library/dom";

//testing Function Component

describe('ProfileStatusWithHooks component', () => {
    test('status from props should be in the state', () => {
        const userStatus = 'my status';
        const component = create(<ProfileStatusWithHooks userStatus={userStatus}/>);

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        // Check if the initial status from props is in the rendered output
        expect(tree.children[0].children[0]).toBe(userStatus);
        /* const instance = component.root;

        expect(instance.baseState).toBe('my status')*/
    });

    test('after initialization span should be displayed', () => {
        const component = create(<ProfileStatusWithHooks/>)
        const instance = component.root;
        const span = instance.findByType('span');
        expect(span).not.toBeNull()
    });

    test('after initialization input should NOT be displayed', () => {
        const component = create(<ProfileStatusWithHooks/>)
        const instance = component.root;

        expect(() => {
            instance.findByType('input');
        }).toThrow()
    });

    test('after initialization span should have the correct status', () => {
        const userStatus = 'my status';

        const component = create(<ProfileStatusWithHooks userStatus={userStatus}/>)
        const instance = component.root;
        const span = instance.findByType('span');
        expect(span.children[0]).toBe('my status')
    });

    test('input should be displayed in edit mode', () => {
        const userStatus = 'my status';

        const component = create(<ProfileStatusWithHooks userStatus={userStatus}/>)
        const instance = component.root;
        const span = instance.findByType('span');

        span.props.onDoubleClick();

        expect(span.children[0]).toBe('my status')

        //const input = instance.findByType('input');

        //expect(input).not.toBeNull()
    });

    test('callback should be called', () => {
        const userStatus = 'my status';
        const dispatch = useDispatch()
        const isProfileCurrentUser = true;
        const changeStatus = (status) => {
            if (!isProfileCurrentUser) return
            dispatch(updateStatus(status))
        }
        const component = create(<ProfileStatusWithHooks userStatus={userStatus} changeStatus={changeStatus}/>)
        const instance = component.root;
        const span = instance.findByType('span');

        span.props.onDoubleClick();

        expect(span.children[0]).toBe('my status')

        //const input = instance.findByType('input');

        //expect(input).not.toBeNull()
    });
});
