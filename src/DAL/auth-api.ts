import { instance, ResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum } from "./api";

type AuthMeResponseType = {
    id: number,
    email: string,
    login: string
}
type LoginResponseType = {
    userId: number
}

export const authAPI = {
    authMe() {
        return instance.get<ResponseType<AuthMeResponseType>>('auth/me').then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResponseType<LoginResponseType, ResultCodesEnum | ResultCodeForCaptchaEnum>>('auth/login', { email, password, rememberMe, captcha })
            .then(response => response.data)
    },
    logout() {
        return instance.delete('auth/login').then(response => response.data)
    },
}

