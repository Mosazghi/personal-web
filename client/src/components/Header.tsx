import TypoGraphy from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import { blueGrey } from "@mui/material/colors";

const Header = () => {
    return (
        <Stack
            component="header"
            sx={{ py: 1.5 }}
            textAlign="center"
            alignItems="center"
            justifyContent={"center"}
            gap={2}
            mb={4}
        >
            <TypoGraphy variant="h1" color={"white"} fontSize={{ xs: "2rem", md: "3.75rem" }}>
                <Link href="admin/login" color={"inherit"}>
                    Mosazghi
                </Link>{" "}
                Y. Tesfazghi
            </TypoGraphy>
            <TypoGraphy variant="h5" color={blueGrey[100]} fontSize={{ xs: "1.2rem", md: "1.7rem" }}>
                Electrical and Electronics Engineering, NTNU
            </TypoGraphy>
        </Stack>
    );
};

export default Header;
