import DefaultBtn from "@/components/buttons/defaultBtn";
import Image from "next/image";

const Profile = () => {
    return (<>
<h2>Edit Profile</h2>
<div className=" w-56 h-56 flex border rounded-full overflow-hidden items-center justify-center">
          <Image className="h-full w-full" width={200} height={200} src={'/images/homefeed/letter.jpg'} alt="letter" />
        </div>
<DefaultBtn />

    </>);
}

export default Profile;