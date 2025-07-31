import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CameraAltOutlined, Done } from "@mui/icons-material";
import StyledCircularProgress from "./styled/CircularProgress";

function Progress(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{ color: "#ffffff" }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          fontSize="1.15rem"
        >{`${props.value}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function CircularProgressWithLabel(props: { value: number }) {
  return (
    <StyledCircularProgress>
      {props.value && props.value < 100 ? (
        <Progress value={props.value} />
      ) : props.value && props.value === 100 ? (
        <Done />
      ) : (
        <CameraAltOutlined />
      )}
    </StyledCircularProgress>
  );
}
