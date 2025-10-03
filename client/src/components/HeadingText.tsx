interface HeadingTextProps {
    text: string;
}

const HeadingText = ({ text }: HeadingTextProps) => {
    return (
        <h2 className="text-white underline decoration-[lightsteelblue] text-[1.65rem] md:text-[2.5rem] font-bold italic mt-8 mb-4 md:text-center">
            {text}
        </h2>
    );
};
export default HeadingText;
