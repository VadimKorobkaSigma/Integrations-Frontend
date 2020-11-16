import * as React from "react";

export default (props: { items: string[] }) =>
    <nav>
        {props.items.join(' / ')}
    </nav>