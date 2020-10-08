export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        // for Node.js Express back-end
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}

export const getUserName = () => {
    let user = localStorage.getItem("user");
    console.log(user);
    return user;
};

export const getCurrentUser = () => {
    // return JSON.parse(localStorage.getItem('user.username'));;
    let username = localStorage.getItem('user');
    return username;
};