import styled from "styled-components";

export const Form = styled.form`
    padding-top: 1em;
    box-shadow: 0 0 30px white;
    border-radius: 20px;
    display: grid;
    width: 70%;
    margin: 40px auto;
    justify-items: center;
    overflow: hidden;
    max-width: 180px;
    background-color: rgb(54, 52, 52);
`

export const FormInput = styled.input`
    font-weight: bold;
    padding: .5em;
    width: 80%;
    border-radius: 20px;
    text-align: center;
`

export const FormButton = styled.button`
    opacity: 50%;
    margin-top: 20px;
    width: 100%;
    padding: .5em;
`