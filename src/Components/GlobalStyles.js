import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:malgun gothic;
        font-size:12px;
        background:#333;
        color:#fff;
        padding-top:50px;
    }
`;

export default globalStyles;
