import React from 'react';
import styled from 'styled-components';

const Up = ({ onClick }) => {
    return (
        <StyledWrapper>
            <button className="button" onClick={onClick}>
                <svg className="svgIcon" viewBox="0 0 384 512">
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
            </button>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(to right, #BE8A7C, #1E3A8A);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px 4px rgba(180, 160, 255, 0.253);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    position: fixed;
    bottom: 4rem;
    right: 4rem;
    z-index: 1000;
  }

  .svgIcon {
    width: 12px;
    transition-duration: 0.3s;
  }

  .svgIcon path {
    fill: #1b365d;
  }

  .button:hover {
    width: 140px;
    border-radius: 50px;
    background: linear-gradient(to right, #BE8A7C, #1E3A8A); /* Smooth gradient transition */
    transform: translateY(-2px);
  }

  .button:hover .svgIcon {
    transform: translateY(-200%);
  }

  .button::before {
    position: absolute;
    bottom: -20px;
    content: "Back to Top";
    color: #1b365d;
    font-size: 0px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  .button:hover::before {
    font-size: 13px;
    opacity: 1;
    bottom: unset;
  }
`;


export default Up;
