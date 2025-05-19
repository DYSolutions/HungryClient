

const Processing = () => {
    return (
        <div className="fixed top-0 left-0 z-40 w-full flex items-center justify-center h-full bg-[#0000007c]">
            <div className=" relative flex flex-col items-center justify-center">
                <video
                    src="/hungeryLoader.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-[200px] h-[200px] rounded-full"
                />
            </div>
        </div>
    );
};

export default Processing;