export const getRandomAvatar = () => {
    const avatars = [
        "/profile1.jpg",
        "/profile2.jpg",
        "/profile3.png",
        "/profile4.jpg",
        "/profile5.png",
        "/profile6.jpg",
    ];
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
};
