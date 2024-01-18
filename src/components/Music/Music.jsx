import React, {useMemo} from "react";
import styles from './News.module.css'

const Music = () => {

    /*function validBraces(braces) {
        //TODO
        if (braces.length % 2 !== 0) {
            return false;
        }

        const usedBracesIndexes = [];

         braces.forEach(brace => {

             if(brace === ')'){

                 brace.forEach(secondBrace => {

                     if(secondBrace === '('){

                     }
                 })
             }
         })

  /!*      switch (braces) {
            case '(': {

                if (braces.findIndex(')') === -1) {
                    return false
                }

                braces.forEach(brace => {
                   if(brace === ')')
                })

                return
            }
            case ')': {

                return
            }
            case '{': {

                return
            }
            case '}': {

                return
            }
            case '[': {

                return
            }
            case ']': {

                return
            }
            default: {
                return usedBracesIndexes
            }

        }*!/

        //return true

    }

    console.log(validBraces("())({}}{()][]["))*/

    function orderType(arr) {

        const isIncreasing = (prevElLength, nextElLength) => {
            return prevElLength <= nextElLength;
        }

        const isDecreasing = (prevElLength, nextElLength) => {
            return prevElLength >= nextElLength;
        }

        const isConstant = (prevElLength, nextElLength) => {
            return prevElLength === nextElLength;
        }

        const checkLength = (lengthCheckFunc) => {

            const compareLengthFn = (el, idx, arr) => {

                let prevEl = typeof el == 'number' ? (el).toString() : el;

                if (idx <= arr.length - 2) {
                    let nextEl = typeof arr[idx + 1] == 'number' ? (arr[idx + 1]).toString() : arr[idx + 1];

                    return lengthCheckFunc(prevEl.length, nextEl.length)
                }
                return true
            }

            return arr.every(compareLengthFn)
        }


        if (checkLength(isConstant)) {
            return "Constant"
        } else if (checkLength(isIncreasing)) {
            return "Increasing"
        } else if (checkLength(isDecreasing)) {
            return "Decreasing"
        } else {
            return "Unsorted"
        }
    }

    console.time('filter array');
    console.log(orderType([0.4691358024691358,
        0.3541666666666667,
        4620000,
        11700,
        1350,
        350,
        30,
        0]))
    console.timeEnd('filter array');
    return (
        <div className={styles.main}>
            Music
        </div>
    )
}

export default Music
