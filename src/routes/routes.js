import CreateFlight from "@/components/CreateFlight.vue";
import CreatePassenger from "@/components/CreatePassenger.vue";
// import CreatePassenger from "@/components/CreatePassenger.vue";
import EditFlight from "@/components/EditFlight.vue";
import ViewFlights from "@/components/ViewFlights.vue";
import ViewPassenger from "@/components/ViewPassenger.vue";
import FormCountry from "@/components/CountryList.vue";
// import { compile } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes =[ 
{
    name: 'ViewFlights',
    path: '/',
    component: ViewFlights
},
{
    name: 'CreateFlight',
    path: '/create-flight',
    component: CreateFlight
},
{
    name: 'EditFlight',
    path: '/edit-flight/:id',
    component: EditFlight,
    props: true
},
{
    name: 'ViewPassenger',
    path: '/view-passenger/:id',
    component: ViewPassenger,
    props: true
},
{
    name: 'CreatePassenger',
    path: '/create-passenger/:id',
    component: CreatePassenger,
    props: true
},
{
    name: 'FormCountry',
    path: '/form-country',
    component: FormCountry,
    props: true
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
