import { styled } from "styled-components";
// import { breakpoints } from "./breakpoints";

const StyledUsersByDevice = styled.div`
  height: 100%;

  .usersByDevice {
    height: 100%;

    img {
      width: 25em;
    }

    .usersType {
      align-self: start;
      width: 100%;
      font-size: 1.3rem;
    }

    .users {
      padding-block: 1em;

      &:not(:last-of-type) {
        border-bottom: 1.5px solid #343b4f;
      }

      .usersValue {
        font-weight: bolder;
        font-size: 1.7rem;
      }
    }
  }
`;

export default StyledUsersByDevice;
