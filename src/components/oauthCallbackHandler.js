import React from 'react';

const OAuthCallbackHandler = () => {

    const string = location.search;
    console.debug('Query string: ', string);
    return (
        <div>
            Callback
        </div>
    );
};

export default OAuthCallbackHandler;
