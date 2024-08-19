import { fetchCsrfToken } from "@/app/utils/api";
import { useEffect, useState } from "react";
import IconBtn from "../buttons/iconBtn";


type EventCardProps = { 
    attending : boolean
    id:number
    title: string;
    content: string;
    time: string;
    attendees: { username: string }[];
};
const EventCard : React.FC<EventCardProps> = ({attending, id, title, content, time, attendees }) => {
    useEffect(() => {
        const getCsrfToken = async () => {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
        };
        getCsrfToken();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };



    const [csrfToken, setCsrfToken] = useState('');
    const setAttend = async () => {
        const formData = new URLSearchParams();
        
        formData.append('id', JSON.stringify(id));
        
        const url = attending 
            ? 'http://localhost:8080/users/removeEvent'
            : 'http://localhost:8080/users/setEvent';
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                credentials: 'include', 
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            location.reload()
            const data = await response.json();
            // Handle the response data if needed
            console.log(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    function formatDate(createdAt: Date) {
        const months = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
        
        const month = months[createdAt.getMonth()];
        const day = createdAt.getDate();
        const hour = createdAt.getHours().toString().padStart(2, '0');
        const minute = createdAt.getMinutes().toString().padStart(2, '0');
        
        return `${month} ${day}, ${hour}:${minute}`;
    }
    
    const createdAt = new Date(time);
    const formattedDate = formatDate(createdAt);

    return (         <div className="w-80 m-5  rounded bg-black h-max p-5  flex flex-col gap-5 ">


        <h3 className="text-center">{title} </h3>
      
        <div className=" w-full h-0.5 bg-white blur-sm"></div>
        <div className="flex items-center gap-5">
            <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.875 30.875H8.125V13H30.875M26 1.625V4.875H13V1.625H9.75V4.875H8.125C6.32125 4.875 4.875 6.32125 4.875 8.125V30.875C4.875 31.737 5.21741 32.5636 5.8269 33.1731C6.4364 33.7826 7.26305 34.125 8.125 34.125H30.875C31.737 34.125 32.5636 33.7826 33.1731 33.1731C33.7826 32.5636 34.125 31.737 34.125 30.875V8.125C34.125 7.26305 33.7826 6.4364 33.1731 5.8269C32.5636 5.21741 31.737 4.875 30.875 4.875H29.25V1.625M27.625 19.5H19.5V27.625H27.625V19.5Z" fill="white" />
        </svg>
            <p className="opacity-55">{formattedDate}</p></div>
        <div className=" w-full h-0.5 bg-white blur-sm"></div>
        <div className="flex  items-center gap-5">
            <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 19.5C17.7125 19.5 16.25 18.0375 16.25 16.25C16.25 14.4625 17.7125 13 19.5 13C21.2875 13 22.75 14.4625 22.75 16.25C22.75 18.0375 21.2875 19.5 19.5 19.5ZM29.25 16.575C29.25 10.6762 24.9437 6.5 19.5 6.5C14.0563 6.5 9.75 10.6762 9.75 16.575C9.75 20.3775 12.9187 25.415 19.5 31.4275C26.0813 25.415 29.25 20.3775 29.25 16.575ZM19.5 3.25C26.325 3.25 32.5 8.4825 32.5 16.575C32.5 21.97 28.1612 28.3562 19.5 35.75C10.8388 28.3562 6.5 21.97 6.5 16.575C6.5 8.4825 12.675 3.25 19.5 3.25Z" fill="white" />
        </svg>
            <p className="opacity-55">{content}</p></div>
        <div className=" w-full h-0.5 bg-white blur-sm"></div>
        <div className="flex items-center gap-5"> 
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.1874 23C28.3402 23 26.5541 22.1752 25.1561 20.6784C23.7968 19.2185 22.9667 17.2716 22.8202 15.198C22.6639 12.986 23.3386 10.952 24.7195 9.46953C26.1004 7.98711 28.0311 7.1875 30.1874 7.1875C32.3284 7.1875 34.2645 8.00148 35.6409 9.48031C37.0308 10.9735 37.7073 13.004 37.551 15.1971C37.401 17.2734 36.5717 19.2194 35.2151 20.6775C33.8207 22.1752 32.0355 23 30.1874 23ZM42.0315 38.8125H18.3442C17.9634 38.8145 17.5871 38.7292 17.2445 38.563C16.9018 38.3968 16.6018 38.1542 16.3676 37.8539C16.1192 37.5283 15.9477 37.1507 15.8658 36.7495C15.784 36.3482 15.794 35.9337 15.8951 35.5368C16.6515 32.4992 18.5257 29.98 21.3144 28.2523C23.7896 26.7195 26.9404 25.875 30.1874 25.875C33.4981 25.875 36.5663 26.6836 39.0559 28.2154C41.8509 29.9341 43.7277 32.4677 44.4806 35.5422C44.5805 35.9393 44.5894 36.3539 44.5066 36.7549C44.4238 37.156 44.2516 37.5332 44.0027 37.8584C43.7687 38.1573 43.4694 38.3987 43.1278 38.5641C42.7861 38.7295 42.4111 38.8144 42.0315 38.8125ZM13.2069 23.3594C10.0453 23.3594 7.26556 20.4197 7.00771 16.8071C6.88013 14.9563 7.45693 13.2448 8.6249 11.9896C9.78029 10.7471 11.4101 10.0625 13.2069 10.0625C15.0038 10.0625 16.621 10.7507 17.7827 12.0004C18.9596 13.2654 19.5346 14.9734 19.3999 16.8089C19.142 20.4206 16.3631 23.3594 13.2069 23.3594ZM19.1061 26.185C17.5257 25.4123 15.4746 25.026 13.2078 25.026C10.561 25.026 7.9906 25.716 5.96912 26.9684C3.6772 28.3906 2.13548 30.4615 1.51287 32.9619C1.42175 33.3215 1.41313 33.6971 1.48766 34.0605C1.56218 34.424 1.71792 34.7659 1.94322 35.0606C2.157 35.3351 2.43088 35.5568 2.74379 35.7088C3.0567 35.8609 3.4003 35.9391 3.74818 35.9375H13.7208C13.8892 35.9375 14.0521 35.8784 14.1813 35.7705C14.3106 35.6626 14.3978 35.5128 14.4279 35.3472C14.4378 35.2906 14.4504 35.234 14.4647 35.1783C15.2266 32.1182 17.0118 29.5325 19.6496 27.6476C19.7466 27.5777 19.8247 27.4846 19.8767 27.3769C19.9286 27.2692 19.9529 27.1502 19.9473 27.0308C19.9417 26.9113 19.9063 26.7951 19.8445 26.6928C19.7826 26.5904 19.6962 26.5051 19.593 26.4446C19.452 26.362 19.2902 26.2748 19.1061 26.185Z" fill="white" />
        </svg>
            <a onClick={toggleModal} className="underline cursor-pointer opacity-55">{attendees.length} attendees</a>
            </div>
            <div className="flex items-center gap-5"> 
          <IconBtn svg={<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.24301 6.34188L0.86301 7.26688L0.75001 7.28988C0.578949 7.33529 0.423005 7.42528 0.298102 7.55068C0.1732 7.67607 0.0838135 7.83236 0.0390722 8.0036C-0.00566913 8.17484 -0.00416268 8.35488 0.0434376 8.52535C0.091038 8.69581 0.183027 8.85059 0.31001 8.97388L4.93201 13.4729L3.84201 19.8279L3.82901 19.9379C3.81854 20.1148 3.85528 20.2913 3.93546 20.4494C4.01564 20.6074 4.13639 20.7413 4.28535 20.8374C4.4343 20.9334 4.6061 20.9882 4.78316 20.996C4.96022 21.0038 5.13617 20.9644 5.29301 20.8819L10.999 17.8819L16.692 20.8819L16.792 20.9279C16.9571 20.9929 17.1365 21.0128 17.3118 20.9856C17.4871 20.9584 17.652 20.8851 17.7896 20.7731C17.9272 20.6612 18.0326 20.5146 18.0948 20.3485C18.1571 20.1824 18.1741 20.0027 18.144 19.8279L17.053 13.4729L21.677 8.97288L21.755 8.88788C21.8664 8.75064 21.9395 8.58633 21.9667 8.41167C21.994 8.23701 21.9744 8.05825 21.9101 7.89361C21.8458 7.72896 21.7389 7.58431 21.6005 7.47439C21.4621 7.36447 21.297 7.29321 21.122 7.26788L14.742 6.34188L11.89 0.561876C11.8075 0.39441 11.6797 0.253391 11.5212 0.15478C11.3627 0.0561696 11.1797 0.00390625 10.993 0.00390625C10.8063 0.00390625 10.6233 0.0561696 10.4648 0.15478C10.3063 0.253391 10.1785 0.39441 10.096 0.561876L7.24301 6.34188Z" fill={attending ?  "#8B923A" : "#545454" }/>
</svg>


} title={"attend"} onClick={setAttend} />
        </div>

        <div     className={`py-2 space-y-2 ${isModalOpen ? '' : 'hidden'}`}  aria-labelledby="modal-title" role="dialog" aria-modal="true">

  <div className="fixed text-black inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
         
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title"> Attendees:</h3>
              <div>
            {attendees.map((user) => (
                <p className="text-black">{user.username}</p>
            ))}
            </div>
            </div>
          

          </div>
        </div>
        
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
           <button onClick={toggleModal} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div>

    </div> );
}
const modal = () => {

    return(
        <div>
            hello 
        </div>
    )
}
export default EventCard;