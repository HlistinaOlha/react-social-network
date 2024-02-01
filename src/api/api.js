import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': 'f3593e3f-115f-40ab-98dc-fff34e049bd0'
    }
})

export const usersAPI = {
    getUsers(isFriend, nameString = '', page, pageSize) {
        return instance.get(`users?page=${page}&count=${pageSize}&friend=${isFriend}&term=${nameString}`)
            .then(response => response.data)
    },
    followUser(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
    unfollowUser(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    }
}

export const profileAPI = {
    getUserProfile(id) {
        return instance.get(`profile/${id}`)
            .then(response => response.data)
    },
    editProfile(profile) {
        return instance.put(`/profile`, profile)
            .then(response => response.data)
    },
    getStatus(id) {
        return instance.get(`profile/status/${id}`)
            .then(response => response.data)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status})
            .then(response => response.data)
    },
    uploadImage(image) {
        const formData = new FormData();
        formData.append("image", image)

        return instance.put(`profile/photo`, formData, {
            headers: {
                Accept: "application/json",
                "Content-type": "multipart/form-data",
            }
        })
            .then(response => response.data)
    },
}

export const authAPI = {
    getAuthUserData() {
        return instance.get(`auth/me`)
    },
    login(formData) {
        return instance.post('auth/login', formData)
    },
    logout() {
        return instance.delete('auth/login')
    },
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    }
}
