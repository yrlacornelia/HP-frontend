import ChatSidebar from "@/components/navigation/chatSidebar";

const Chat = () => {



        return ( <div className="flex"><ChatSidebar/>

        <div className="flex flex-col ml-auto mr-auto  "> 
            <div className=" border border-lg boder-black">hello</div>
            <div>chat </div>
        </div>
        
        <div className=""> 
            right sidebar
        </div>
            </div> );
}
 
export default Chat;