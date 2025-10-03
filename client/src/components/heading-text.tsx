interface HeadingTextProps {
    text: string;
}

const HeadingText = ({ text }: HeadingTextProps) => {
    return (
        <h2 className="text-black underline decoration-[#558ed9] text-[1.65rem] md:text-[2.5rem] font-bold italic mt-8 mb-4 md:text-center">
            {text}
        </h2>
    );
};
export default HeadingText;
