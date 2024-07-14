import styled, { css } from "styled-components";

export const Form = styled.form`
    margin: 15px auto 0 auto;
    justify-content: center;
    display: flex;
    width: 70%;
    max-width: 600px;
`

/**
 * Base styles shared between AddButton and FormInput components.
 */
const baseItemStyle = css`
    font-size: 1.25rem;
    padding: 7px;
    flex-wrap: wrap
`

export const AddButton = styled.button`
    ${baseItemStyle};
    opacity: 1;
    flex-grow: 1;
`

export const FormInput = styled.input`
    ${baseItemStyle};
    border: none;
    flex-grow: 2;
`

