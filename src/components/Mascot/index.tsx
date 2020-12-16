import * as React from 'react';
import Lottie from 'react-lottie';
import image from '@assets/images/mascot.json';

const MASCOT_ICON_HEIGHT = 560;
const MASCOT_ICON_WIDTH = 520;

export default React.memo(() => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: image,
        rendererSettings: {
            preserveAspectRatio: 'xMaxYMax slice',
        },
    };

    return (
        <Lottie options={defaultOptions} height={MASCOT_ICON_HEIGHT} width={MASCOT_ICON_WIDTH} style={{ margin: 0 }} />
    );
});
