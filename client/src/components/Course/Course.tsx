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
        <article className="gap-2 text-start bg-slate-100 rounded-lg px-[1em] py-[0.7em] pb-[0.5em] m-[1em] transition-all duration-300 ease-out items-stretch flex flex-col justify-stretch border-l-[10px] border-solid border-secondary shadow-lg min-w-[302px]">
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="flex flex-1 text-lg">{description}</p>
            <h4>
                <strong>Grade: </strong>
                {grade}
            </h4>
            <div className="flex flex-row flex-nowrap justify-between ">
                <a href={urlLink} target="_blank" className="underline decoration-gray-500">
                    Read more
                </a>
                <abbr title={type === "O" ? "Obligatory course" : "Additional course"}>{type}</abbr>
            </div>
        </article>
    );
};

export default Course;
