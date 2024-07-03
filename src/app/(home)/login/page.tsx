import DefaultBtn from "@/components/buttons/defaultBtn";
import Settingsform from "@/components/form/settingsform";
import Login from "@/components/security/login";
import Image from "next/image";

const LoginPage = () => {
    return (<div className="flex flex-col  items-center mt-20">
<h2>Edit Profile</h2>


        <Login />
    </div>);
}

export default LoginPage;