<template>
    <div class="container" id="new-entry">
        <h3 class="mt-4">Edit Flight</h3>
        <form @submit.prevent="updateFlight">
            <div>
                <label class="form-label">Airline</label>
                <select name="airline" v-model="flight.airline" id="airline" class="form-select">
                    <option value="Airasia">AirAsia</option>
                    <option value="Mas Airline">MAS Airline</option>
                    <option value="Firefly">Firefly</option>
                </select>
            </div>
            <div>
                <label class="col-form-label mt-4" for="inputDefault">Pax</label>
                <input type="number" v-model="flight.pax" class="form-control" id="pax" name="pax" placeholder="Pax"
                    min="10" max="100" />
            </div>
            <input type="hidden" v-model="flight.occupied" id="occupied" value="0" />
            <div>
                <CountryList @update:selected="setCountry" v-model="flight.destination" />
            </div>
            <div class="mt-5">
                <input type="submit" value="Save" class="btn btn-primary" />
            </div>
        </form>
        <div class="mt-2">
            <a href="#" class="btn btn-primary">Flight</a>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import CountryList from "./CountryList.vue";
export default {
    components:{
        CountryList,
    },
    name: "Edit Flight",
    data() {
        return {
            flight: {
                airline: "",
                pax: "",
                occupied: "",
                destination: "",
            },
        };
    },
    props: {
        id: String,
    },
    methods: {
        async getFlight() {
            let url = `http://localhost:8000/api/flightAPI/${this.id}`;
            try {
                const response = await axios.get(url);
                this.flight = response.data.flight;
                console.log("Flight fetched:", this.flight);
            } catch (error) {
                console.error("Error fetching flight:", error);
                alert("Failed to fetch flight data. Please try again.");
            }
        },
        async updateFlight() {
            const url = `http://localhost:8000/api/updateFlightAPI/${this.id}`;
            try {
                const response = await axios.put(url, this.flight);
                if (response.status === 200) {
                    alert(response.data.message || "Flight updated successfully!");
                    this.$router.push("/");
                }
            } catch (error) {
                console.error("Error updating flight:", error);
                alert("Failed to update flight. Please try again.");
            }
        },
        setCountry(selectedCountry) {
            this.country = selectedCountry;
        },
    },
    created() {
        this.getFlight();
    },
    mounted() {
        console.log("Flight data mounted");
    },
};
</script>
