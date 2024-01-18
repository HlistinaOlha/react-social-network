import {SubmissionError} from "redux-form";

export const required = value => {
    if (value) {
        return undefined
    }

    return 'Field is required'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (!value) {
        return 'Your post is empty'
    }

    if (value.length &&  value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    }

    return undefined
}


