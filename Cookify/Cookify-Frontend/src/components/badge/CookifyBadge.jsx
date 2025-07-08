import "./CookifyBadge.scss";
import { MDBBadge } from "mdb-react-ui-kit";   // varsa, ya da sadə <span>

const CheckCircleIcon = ({ size = 16, strokeWidth = 3, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
    </svg>
);

const CookifyBadge = ({ text = "Cookify Verified" }) => (
    <MDBBadge
        color="success"
        pill
        className="cookify-badge d-inline-flex align-items-center gap-1"
        aria-label={`${text} badge`}
    >
        <CheckCircleIcon />
        {text}
    </MDBBadge>
);

export default CookifyBadge;
