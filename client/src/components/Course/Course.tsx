import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "../Button";
import Typography from "@mui/material/Typography";
export interface CourseProps {
    name: string;
    description: string;
    type: string;
    grade: string;
    urlLink: string;
    semester?: string;
}

const Course = ({ name, description, type, grade, urlLink }: CourseProps) => {
    return (
        <Card
            sx={{
                maxWidth: "560px",
                m: { xs: "auto", sm: "0.2em" },
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderLeft: "10px solid #326fa8",
                boxShadow: 3,
            }}
        >
            <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontStyle: "italic" }}>
                    {name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body1">
                    <strong>Grade:</strong> {grade}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "space-between", pt: 0 }}>
                <Button size="small" link={urlLink} text="Read more" />
                <abbr title={type === "O" ? "Obligatory course" : "Additional course"}>{type}</abbr>
            </CardActions>
        </Card>
    );
};

export default Course;
