<template>
    <div class="loading-overlay" id="loadingOverlay">
        <div class="loading-message">
            <img
                src="data:image/png;base64,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">
            <br>
            <svg class="spinner">
                <circle>
                    <animateTransform attributeName="transform" type="rotate" values="-90;810" keyTimes="0;1" dur="2s"
                        repeatCount="indefinite"></animateTransform>
                    <animate attributeName="stroke-dashoffset" values="0%;0%;-157.080%" calcMode="spline"
                        keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0" keyTimes="0;0.5;1" dur="2s"
                        repeatCount="indefinite"></animate>
                    <animate attributeName="stroke-dasharray" values="0% 314.159%;157.080% 157.080%;0% 314.159%"
                        calcMode="spline" keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0" keyTimes="0;0.5;1" dur="2s"
                        repeatCount="indefinite"></animate>
                </circle>
            </svg>
        </div>
    </div>
</template>


<style>
.spinner {
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    padding: 3px;
    overflow: visible;
    margin-top: 2rem;
}

.spinner>circle {
    fill: none;
    stroke: currentColor;
    cx: 50%;
    cy: 50%;
    r: 50%;
    stroke-width: 4px;
    stroke-linecap: round;
    transform-origin: center;
}


/* Loading overlay styles */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-message {
    color: #fff;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>