import { css } from "styled-components"

export const mobile = (props) => {
    return css`
        @media only screen and (max-width:380px) {
            ${props}
        }
    `;
}

export const tab = (props) => {
    return css`
        @media only screen and (max-width: 850px) {
                ${props}
            }
        `;
}

export const t600 = (props) => {
    return css`
        @media only screen and (max-width: 600px) {
                ${props}
            }
        `;
}