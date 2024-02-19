export type Nullable<T> = null | T

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>> //нужно указать
// ограничение\constraint для передаваемого T, указав, что это ОБЯЗАТЕЛЬНО должен быть объект,
// у которого в качестве значения св-ва обязательно функция, принимающая что-нибудь и возвращаемая что-нибудь

export type PhotosType = {
    large: Nullable<string>,
    small: Nullable<string>
}

export type HeaderImageType = {
    id: number,
    image: string,
}

type ContactsType = {
    github: Nullable<string>,
    vk: Nullable<string>,
    facebook: Nullable<string>,
    instagram: Nullable<string>,
    twitter: Nullable<string>,
    website: Nullable<string>,
    youtube: Nullable<string>,
    mainLink: Nullable<string>
}

//export type UserIdType = Nullable<number>; // I do not like this comparison!!! where does undef come from?

export type ProfileType = {
    userId: Nullable<number>,
    lookingForAJob: boolean,
    lookingForAJobDescription: Nullable<string>,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}
