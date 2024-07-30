'use client'
import { createEvent, fetchCsrfToken } from "@/app/utils/api";
import AdminSidebar from "@/components/navigation/adminSidebar";
import { useEffect, useState } from "react";

const Eventpage = () => {


    const [csrfToken, setCsrfToken] = useState('');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const getCsrfToken = async () => {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
        };
        getCsrfToken();
    }, []);

    const handleCreateEvent = async (event: any) => {
        event.preventDefault();
        try {
            const data = await createEvent(csrfToken, title, content, time);
            console.log(' upload successful:', data);
        } catch (error) {
            console.error(' upload failed:', error);
        }
    };
    return (<div className="relative">
        <AdminSidebar />
        <div className="flex gap-10 flex justify-center items-center flex-col">
            <form onSubmit={handleCreateEvent} className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Doe" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Doe" />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                            Time
                        </label>
                        <input type="datetime-local" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder="Doe" />
                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                House
                            </label>
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option>all</option>
                                    <option>Slytherin</option>
                                    <option>Hufflepuff</option>
                                    <option>Gryffindor</option>
                                    <option>Rawenclaw</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <button className='m-auto mt-5 border bg-white text-black w-full py-3' type="submit">create person</button>
            </form>
        </div> </div>);
}

export default Eventpage;