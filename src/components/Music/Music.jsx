import React from "react";
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

    function duplicateCount(text) {
      return new Set(text.toLowerCase().split('').sort().filter((el, idx, arr) => {
          let eq = el === arr[idx + 1]
         return eq
      })).size
    }

    console.log(duplicateCount("Indivisibilities"))

    return (
        <div className={styles.main}>
            Music
        </div>
    )
}

export default Music
