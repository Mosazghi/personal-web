import { CircularProgress, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
const LoadingStatus = ({ message }: { message: string }) => {
    return (
        <Stack sx={{ color: "grey.400" }} spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Typography variant="h6" color={"inherit"}>
                {message}
            </Typography>
            <CircularProgress size={18} color="inherit" />
        </Stack>
    );
};

export default LoadingStatus;
