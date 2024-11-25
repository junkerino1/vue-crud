<template>
    <div class="container" id="new-entry">
        <h3 class="mt-3">Add Passenger</h3>
        <p class="mt-2">Flight ID: {{ flight.id }}</p>
        <form @submit.prevent="createPassenger">
            <div>
                <label class="form-label mt-4">Name</label>
                <input type="text" class="form-control" name="name" id="name" v-model="passenger.name" />
            </div>
            <div>
                <label class="form-label mt-4">Airline</label>
                <input type="text" class="form-control" :value="flight.airline || 'Loading...'" readonly />
            </div>
            <CountryList @update:selected="setCountry" v-model="passenger.country" />
            <div class="mt-5">
                <input type="submit" value="Save" class="btn btn-primary" />
            </div>
        </form>
    </div>
</template>

<script>

import axios from 'axios';
import CountryList from './CountryList.vue';

export default {
    name: "CreatePassenger",
    components: {
        CountryList,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            flight: Array,
            passenger: {
                name: "",
                flight_id: this.id,
                country: "",
            },
        };
    },

    methods: {
        async createPassenger() {
            console.log("Passenger data to be sent:", this.passenger); // Add a log here to check the data
            let url1 = `http://localhost:8000/api/createPassengerAPI`;

            try {
                const response = await axios.post(url1, this.passenger);
                console.log(response);
                if (response.status === 200) {
                    alert("Passenger created successfully");
                    this.$router.push(`/view-passenger/${this.passenger.flight_id}`);
                }
            } catch (error) {
                console.error("Failed:", error);
                alert("Failed to create passenger. Please try again.");
            }
        },
        async getFlight() {
            let url2 = `http://localhost:8000/api/flightAPI/${this.id}`;

            try {
                const response = await axios.get(url2);
                this.flight = response.data.flight;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        setCountry(selectedCountry){
            this.country = selectedCountry;
        }
    },

    mounted() {
        this.getFlight();
    },
};
</script>
