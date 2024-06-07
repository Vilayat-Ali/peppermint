// pages
import Account from "./Account.svelte";
import Shop from "./Shop.svelte";
import Home from "./Home.svelte";

type RoutablePage = {
    route: string;
    component: any;
};

const routablePages: RoutablePage[] = [
    {
        route: "/connect",
        component: Account,
    },
    {
        route: "/shop",
        component: Shop,
    },
    {
        route: "/",
        component: Home,
    }
];

export default routablePages;