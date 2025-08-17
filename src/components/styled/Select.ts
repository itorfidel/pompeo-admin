import { styled } from "styled-components";

const StyledSelect = styled.div`
  position: relative;
  width: 100%;
  border: 0.6px solid #343b4f;
  border-radius: 0.4em;
  background-color: #080f25;
  color: #c7d3ff;
  cursor: pointer;
  z-index: 1;

  .dropdown {
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: #263055;
    border-bottom-left-radius: 0.6em;
    border-bottom-right-radius: 0.6em;
    overflow: hidden;
    padding: 0.4em;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-6em);
    transition: 0.35s ease-in-out;
    z-index: -1;

    &.show {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }

  .arrowIcon {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2.5rem;
    transition: transform 0.3s;

    &.transform {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  span {
    display: block;
    padding: 1em 1.5em;
    font-size: 1.35rem;

    .default {
      z-index: 1;
      background-color: inherit;
      border-radius: 0.4em;
    }

    &:not(.default) {
      border-radius: 0.4em;
      transition: 0.3s;

      &:not(:last-child) {
        margin-bottom: 0.25em;
      }

      &:hover {
        background-color: #212a49;
        color: #ffffff;
      }
    }
  }
`;

export default StyledSelect;
