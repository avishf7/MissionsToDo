import styled from "styled-components";

type ButtonProps = {
    $updateLoading: boolean
}

type DescProps = {
    $updateLoading: boolean
    $isCompleted: boolean
}

export const Item = styled.div`
    padding: .75em;
    border-radius: 20px;
    background-color: rgb(181, 212, 93) ;
    font-size: 1.5rem;
    gap: 15px;
    display: flex;
    align-items: center; 

    &:nth-child(odd) {
        background-color: rgb(200, 219, 146);
    }
` 

export const Desc = styled.div<DescProps>`
    cursor: ${ ( {$updateLoading} ) => $updateLoading ? "progress" : "pointer"};
    text-decoration: ${ ( {$isCompleted} ) => $isCompleted ? "line-through" : "none" };
`

export const Button = styled.button<ButtonProps>`
    cursor: ${ ( {$updateLoading} ) => $updateLoading ? "progress" : "pointer"};
    background: none;
    border-radius: 10px;
    opacity: 1;

    &:active {
        background-color: brown;
    }
`

