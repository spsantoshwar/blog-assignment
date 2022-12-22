
import CreateBlogPage from '../modules/create/CreateBlogPage';
import HomePage from '../modules/home/HomePage';
import IndividualCategoryPage from '../modules/home/IndividualCategoryPage';
import BlogListPage from '../modules/list/BlogListPage';

export var homeRoute = [
    { path: '/create-blog', component: CreateBlogPage },
    { path: '/blog-list', component: BlogListPage },
    { path: '/category/:slug', component: IndividualCategoryPage },
    { path: '/home', component: HomePage },
    { path: '/', component: HomePage },
    { redirect: true, path: "/", pathTo: "/" }
]