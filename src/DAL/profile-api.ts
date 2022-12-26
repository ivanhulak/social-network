import { PhotosType, ProfileType } from "../types/types"
import { instance, ResponseType } from "./api"

type UploadPhotoDataType = {
    photos: PhotosType
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>('profile/status', { status: status })
            .then(response => response.data);
    },
    uploadPhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<ResponseType<UploadPhotoDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    upgradeProfile(profileData: ProfileType) {
        return instance.put<ResponseType>('profile', profileData).then(response => response.data)
    },
}