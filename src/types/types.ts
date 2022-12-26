export type PostsType = {
   id: string
   name: { first: string, last: string, title: string }
   picture: { large: string, medium: string, thumbnail: string }
   postText: string
}
export type ContactsType = {
   facebook: string
   website: string,
   vk: string,
   twitter: string,
   instagram: string,
   github: string,
   mainLink: string,
   youtube: string,
}
export type PhotosType = {
   small: string | null,
   large: string | null
}
export type ProfileType = {
   aboutMe: string,
   contacts: ContactsType,
   fullName: string,
   lookingForAJob: boolean,
   lookingForAJobDescription: string,
   photos: PhotosType,
   userId: number
}
export type UsersType = {
   name: string,
   id: number,
   photos: PhotosType,
   status: string,
   followed: boolean
}