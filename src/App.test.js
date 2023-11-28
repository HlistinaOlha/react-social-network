import {render, screen} from '@testing-library/react';
import ReactDOM from 'react-dom/client'
import SamuraiJsApp from './App';
import React from "react";

test('renders learn react link', () => {
    render(<SamuraiJsApp/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders without crashing', () => {
    render(<SamuraiJsApp/>)
});
