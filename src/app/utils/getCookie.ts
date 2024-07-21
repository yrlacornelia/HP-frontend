
import { cookies } from "next/headers";

export const setSessionCookie = (sessionId:any) => {
    cookies().set('user', sessionId, { expires: 1 }); // expires in 1 day
};

export const getSessionCookie = () => {
    return cookies().get('user');
};

export const removeSessionCookie = () => {
    cookies().delete('user');
};
