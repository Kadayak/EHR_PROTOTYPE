import React from "react";

const Loading = () => {
    return (<div className="flex flex-col gap-3 items-center m-20">
<svg className="animate-spin" fill="none" height="48" viewBox="0 0 48 48" width="48"><path d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" stroke="grey" stroke-width="3"/></svg>
<p className="text-lg italic">...loading</p>
    </div>)
}

export default Loading;
