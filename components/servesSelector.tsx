
interface ServesSelectorProps {
    serves: number
    setServes: (serves: number) => void
}
const ServesSelector = ({ serves, setServes }: ServesSelectorProps) => {


    return (
        <div className="flex flex-row items-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                    key={num}
                    onClick={() => setServes(num)}
                    className={`h-8 w-8 rounded-full cursor-pointer border-2 ${serves === num ? "bg-green-400 text-white" : "bg-white text-black"} flex flex-row items-center justify-center border-green-500 font-semibold`}>
                    {num}
                </div>
            ))}

            <button
                onClick={() => setServes(serves - 1)}
                className="h-8 w-8 rounded-full border-2 ml-10 border-green-500 flex flex-row items-center justify-center bg-white font-bold text-black cursor-pointer"
                disabled={serves === 1}
            >
                -
            </button>
            <label className="text-white  bg-green-500 rounded-lg flex flex-row items-center justify-center font-semibold h-8 w-8" >{serves}</label>
            <button
                onClick={() => setServes(serves + 1)}
                className="h-8 w-8 rounded-full border-2 border-green-500 flex flex-row items-center justify-center bg-white font-bold text-black cursor-pointer">
                +
            </button>
        </div>
    )
}

export default ServesSelector