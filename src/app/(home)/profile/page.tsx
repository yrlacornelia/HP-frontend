import DefaultBtn from "@/components/buttons/defaultBtn";
import Settingsform from "@/components/form/settingsform";
import Login from "@/components/security/login";
import Image from "next/image";

const Profile = () => {
    return (<div className="flex flex-col  items-center mt-20">
<h2>Edit Profile</h2>

<div className=" w-56 h-56 mt-4 flex border rounded-full overflow-hidden items-center justify-center">
          <Image className="h-full w-full" width={200} height={200} src={'/images/homefeed/letter.jpg'} alt="letter" />
        </div>
        <Settingsform/>
        <Login />

    </div>);
}

export default Profile;