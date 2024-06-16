// create a map with link name and url
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { blueGrey } from "@mui/material/colors";
const links = [
    { name: "Github", url: "https://github.com/Mosazghi" },
    { name: "Linkedin", url: "https://www.linkedin.com/in/mosazghi-tesfazghi-8275a6275/" },
    { name: "Facebook", url: "https://www.facebook.com/mosazghi.yohannestesfazghi/" },
];

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                position: "fixed",
                bottom: "0px",
                left: "0px",
                width: "100%",
                backdropFilter: "blur(10px)",
            }}
        >
            <Box sx={{ mx: "auto", width: "min-content", textAlign: "center" }}>
                <List sx={{ display: "flex", justifyContent: "center" }}>
                    {links.map((link, i) => (
                        <ListItem key={i} sx={{ widht: "auto" }}>
                            <Link
                                sx={{ textDecoration: "none", color: blueGrey[50] }}
                                underline="hover"
                                target="_blank"
                                href={link.url}
                            >
                                {link.name}
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default Footer;
