import React from "react";
import loading from '../../assets/images/load.gif'
import styled from "styled-components";

const StyledPreloader = styled.div`
    width: 100%;
    .preloader_img{
        max-height: 100%;
        max-width: 100%;
        width: auto;
        height: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
`;
export const Preloader: React.FC = () => {
    return (
        <StyledPreloader>
            <img className="preloader_img" src={loading} alt="Loading..." />
        </StyledPreloader>
    );
}