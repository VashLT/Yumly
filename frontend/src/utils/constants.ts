import { AvatarGenerator } from "random-avatar-generator";
import { cookieStorage } from "./storage";

export const APP_VERSION = "0.0.1";

export const API_URL = "http://localhost:8000"

export const DEFAULT_AVATAR_URL = 'https://i.imgur.com/nRIHLu0.png'
export const YUMLY_AVATAR_URL = 'https://i.imgur.com/2ZmlkDP.png';

export const avatarGen = new AvatarGenerator();

export const COLORS = {
    yellow: "#F6BD60",
    skin: "#F7EDE2",
    pink: "#F5CAC3",
    cyan: "#84A59D",
    light_red: "#F28482",
}

export const getHeaders = () => ({
    headers: {
        'X-CSRFToken': cookieStorage.getItem('csrftoken') || ""
    }
})