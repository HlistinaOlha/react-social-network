import React from "react";

const CardTitle = ({title, children}) => {
    return (
        <div className="uiBlockTitle">
            <h6 className="title">{title}</h6>
            {children}
        </div>
    )
}
export default CardTitle;
