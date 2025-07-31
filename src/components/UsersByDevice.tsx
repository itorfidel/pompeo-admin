import Legend from "../routes/global/Legend";
import DashboardCard from "./styled/DashboardCard";
import Flex from "./styled/Flex";
import StyledUsersByDevice from "./styled/UsersByDevice";

const UsersByDevice = () => {
  return (
    <DashboardCard style={{ padding: "4em" }}>
      <StyledUsersByDevice>
        <Flex
          $direction="column"
          $justify="space-between"
          className="usersByDevice"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/portfolio-1fc3c.appspot.com/o/Assets%2Fusers-by-device.svg?alt=media&token=0144fffd-0c86-4c94-9f2c-15e00094d36c"
            alt="Users By Device"
          />
          <div className="usersType">
            <Flex $justify="space-between" className="users">
              <Legend
                style={{ fontSize: "1.4rem" }}
                color="#6c72ff"
                title="Desktop users"
              />
              <span className="usersValue">12576</span>
            </Flex>
            <Flex $justify="space-between" className="users">
              <Legend
                style={{ fontSize: "1.4rem" }}
                color="#9a91fb"
                title="Mobile users"
              />
              <span className="usersValue">6283</span>
            </Flex>
            <Flex $justify="space-between" className="users">
              <Legend
                style={{ fontSize: "1.4rem" }}
                color="#469be0"
                title="Laptop users"
              />
              <span className="usersValue">2915</span>
            </Flex>
          </div>
        </Flex>
      </StyledUsersByDevice>
    </DashboardCard>
  );
};

export default UsersByDevice;
