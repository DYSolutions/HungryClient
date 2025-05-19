

const Loader = () => {
    return (
        <div className="flex items-start justify-center h-screen">
            <div className="mt-[200px] relative flex flex-col items-center justify-center">
                <video
                    src="/hungeryLoader.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-[200px] h-[200px]"
                />
            </div>
        </div>
    );
};

export default Loader;