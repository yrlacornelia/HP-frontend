import { arapey } from "@/app/(home)/fonts";
const Heading = () => {
    return (
        <div className="  flex flex-col items-center text-center">
            <p className={`text-yellow ${arapey.className}`}>Our philosphy</p>
            <h2 className={arapey.className}>Our World</h2>
            <div className="flex mb-4 mt-1 items-center">
                <div className=" w-16 h-0.5 bg-gradient-to-l from-white via-white to-transparent "></div>
                <div className="w-2 h-2 bg-white transform rotate-45"></div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-white via-white to-transparent "></div>
            </div>
      
        </div>

    );
}

export default Heading;

