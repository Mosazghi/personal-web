type HeadingTextProps = {
    text: string;
};

const HeadingText = ({ text }: HeadingTextProps) => {
    return (
        <h1 className="underline decoration-slate-200 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-transparent bg-clip-text text-2xl md:text-5xl my-5 text-center font-bold py-2">
            {text}
        </h1>
    );
};
export default HeadingText;
