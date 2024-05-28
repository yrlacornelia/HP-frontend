import { arapey } from "@/app/(home)/fonts";
const Heading = () => {
    return (
        <div className=" w-1/4  flex flex-col items-center text-center">
            <p className={`text-yellow ${arapey.className}`}>Our philosphy</p>
            <h2 className={arapey.className}>Our World</h2>
            <div className="flex mb-4 mt-1 items-center">
                <div className=" w-16 h-0.5 bg-gradient-to-l from-white via-white to-transparent "></div>
                <div className="w-2 h-2 bg-white transform rotate-45"></div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-white via-white to-transparent "></div>
            </div>
            <p className="opacity-70">Lorem ipsum dolor sit amet consectetur. Integer est vitae amet </p>
            <p className="opacity-55">Lorem ipsum dolor sit amet consectetur. Integer est vitae amet aenean quis in eget. Eu consequat tristique lacus massa volutpat. Massa tellus aenean sit imperdiet. Gravida quisque massa mi i</p>

        </div>

    );
}

export default Heading;

