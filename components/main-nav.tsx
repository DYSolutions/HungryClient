'use client'

import { cn } from "@/lib/utils";
import  Link  from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = ({ className, ...props }: React.HtmlHTMLAttributes<HTMLElement>) => {

    const pathName = usePathname()
    const params = useParams()

    const routes = [
        {
            href: `/`,
            label: "Home",
            active: pathName === "/"
        },
        {
            href: `/menu`,
            label: "Menu",
            active: pathName === `/menu`
        },
        {
            href: `/orders`,
            label: "Orders",
            active: pathName === `/orders`
        },
        {
            href: `/about`,
            label: "About",
            active: pathName === `/about`
        },
        {
            href: `/contactUs`,
            label: "Contact Us",
            active: pathName === `/contactUs`
        },
    ]
    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6 pl-6")}>
            {routes.map((route) => (
                <Link key={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary",
                    route.active
                        ? "text-black dark:text-white"
                        : "text-muted-foreground"
                )} href={route.href}>{route.label}</Link>
            ))}
        </nav>
    );
}

export default MainNav;