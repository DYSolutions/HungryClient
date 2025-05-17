import { SignIn } from "@clerk/nextjs"

const Page = () => {
    return (
        <div className="w-full p-10 flex flex-col items-center justify-center">
            <SignIn afterSignInUrl="/" />
        </div>
    )
}

export default Page