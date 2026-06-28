import styled from 'styled-components';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
}

const ButtonNav = ({ label = "Agendar sessão", onClick }: ButtonProps) => {
  return (
    <StyledWrapper>
      <button className="cta" onClick={onClick}>
        <span className="hover-underline-animation">{label}</span>
        <svg
          id="arrow-horizontal"
          xmlns="http://www.w3.org/2000/svg"
          width={30}
          height={10}
          viewBox="0 0 40 20"
        >
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cta {
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .cta span {
    padding-bottom: 7px;
    letter-spacing: 4px;
    font-size: 11px;
    text-transform: uppercase;
    opacity: 0.8;
  }

  .cta svg {
    fill: #e0e0e0;
    transform: translateX(-8px);
    transition: all 0.3s ease;
  }

  .cta:hover svg {
    transform: translateX(0);
    fill: #e0e0e0;
  }

  .cta:active svg {
    transform: scale(0.9);
  }

  .hover-underline-animation {
    position: relative;
    color: #e0e0e0;
    padding-bottom: 20px;
    transition: color 0.25s ease;
  }

  .cta:hover .hover-underline-animation {
    color: #e0e0e0;
    opacity: 1;
  }

  .hover-underline-animation:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #e0e0e0;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  .cta:hover .hover-underline-animation:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

export default ButtonNav;