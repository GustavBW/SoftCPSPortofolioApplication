export default function SVGStyles() {

    return(
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0,0,1,1">
            <defs>
                <linearGradient id={"metal-border"} x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--border-gradient-1)" />
                    <stop offset="40%" stopColor="var(--border-gradient-2)" />
                    <stop offset="90%" stopColor="var(--border-gradient-3)" />
                </linearGradient>
                <linearGradient id={"svg-test-gradient"} x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="blue" />
                    <stop offset="40%" stopColor="red" />
                </linearGradient>
            </defs>
        </svg>
    );

}