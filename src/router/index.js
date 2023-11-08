import { createRouter, createWebHistory } from "vue-router";

import HomePage from '../views/HomePage'
import LoginPage from '../views/LoginPage'
import SignUpPage from '../views/SignUp'
import LibraryPage from '../views/LibraryPage'
import TutorProfile from '../views/tutorsProfile'
import MyUploads from '../views/myUploads'
import ParentProfile from '../views/parentsProfile'
import LandingPage from '../views/landingPage'
import TutorHome from '../views/tutorHome'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: LandingPage,
            name: "landingPage"
        },
        
        {
            path: '/login',
            component: LoginPage,
            name: "loginPage"
        },
        {
            path: '/signup',
            component: SignUpPage,
            name: "signupPage"
        },

        
        {
            path: '/library',
            component: LibraryPage,
            name: "library"
        },
        {
            path: '/home',
            component: HomePage,
            name: "home"
        },
        
        {
            path: '/tutorprofile',
            component: TutorProfile,
            name: "tutorProfile"
        },
        {
            path: '/myUploads',
            component: MyUploads,
            name: "myUploads"
        },
        {
            path: '/parentProfile',
            component: ParentProfile,
            name: "parentProfile"
        },
        {
            path: '/TutorHomePage',
            component: TutorHome,
            name: "tutorHome"
        },




        




    ]
})

export default router