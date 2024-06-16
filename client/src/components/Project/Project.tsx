import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export interface ProjectProps {
    name: string;
    description: string;
    showcaseLink: string;
    repositoryLink: string;
    language: string[];
}

const Project = ({ name, description, showcaseLink, language, repositoryLink }: ProjectProps) => {
    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardMedia component="img" alt="green iguana" height="200" image={showcaseLink} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                language:{" "}
                {language.map((lang, i) => (
                    <span key={i}>{lang}</span>
                ))}
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" href={repositoryLink} target="_blank">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default Project;
