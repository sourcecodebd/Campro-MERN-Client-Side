const pressOnBar = () => {
    const menubar = document.getElementById('menubar');
    const mobileNav = document.querySelector('.mobile-nav');
    mobileNav.classList.toggle('show');
    menubar.classList.toggle('fa-times');
}

export { pressOnBar };