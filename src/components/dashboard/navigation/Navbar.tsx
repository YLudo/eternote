import NavbarMenu from "./NavbarMenu";
import NavbarMyAccount from "./NavbarMyAccount";
import NavbarSearch from "./NavbarSearch";
import NavbarSheet from "./NavbarSheet";

export default function Navbar() {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 borer-b bg-background px-4 md:px-6">
            <NavbarMenu />
            <NavbarSheet />
            <div className="flex w-full md:w-fit items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <NavbarSearch />
                <NavbarMyAccount />
            </div>
        </header>
    );
}