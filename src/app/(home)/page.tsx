import HouseButton from "@/components/buttons/houseButton";
import { arapey } from "./fonts";
import Heading from "@/components/heading/heading";
import Image from "next/image";
const Home = () => {
  return (
    <>
      <div className="flex gap-20 mt-20 justify-center items-center">
        <div className=" w-96 h-96 flex overflow-hidden items-center justify-center"><Image className="h-full w-full" width={200} height={200} src={'/images/homefeed/letter.jpg'} alt="letter" />
        </div>
        <Heading />

        <div className=" w-96 h-96 flex overflow-hidden items-center justify-center">
          <Image width={200} height={200} className="h-full w-full" src={'/images/homefeed/castle.jpg'} alt="letter" />
        </div>
        {/* <h1 className={arapey.className} >
  other text
</h1>
<h2 className={arapey.className} >
  other text
</h2>
<h3 className={arapey.className} >
  other text
</h3>
<p className={arapey.className} >
  other text
</p> */}

      </div>
      <div className="bg-quidditch h-52 w-full bg-cover bg-center mt-20 mb-20"></div>


    </>);
}

export default Home;