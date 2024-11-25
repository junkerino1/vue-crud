<template>
    <div class="container" id="new-entry">
        <h3 class="mt-4">Create Flight</h3>
        <form @submit.prevent="create">
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
                    min="10" max="100">
            </div>
            <div>
                <label class="col-form-label mt-4">Destination</label>
                <select name="destination" v-model="flight.destination" id="destination" class="form-select">
                    <option value="India">India</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                </select>
            </div>

            <div class="mt-5">
                <input type="submit" value="Save" class="btn btn-primary" />
            </div>

        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CreateFlight',
    data() {
        return {
            flight: {
                airline: "",
                pax: "",
                occupied: 0,
                destination: ""
            }
        }
    },
    methods: {
        async create() {
            console.log('Created flight: ', this.flight);

            const url = 'http://localhost:8000/api/createFlightAPI';

            try {
                const response = await axios.post(url, this.flight);
                console.log(response);
                if (response.status === 200) {
                    alert(response.data.message || 'Flight created successfully!');
                    this.$router.push("/");
                }
            } catch (error) {
                console.error('Error creating flight:', error);
                alert('Failed to create flight. Please try again.');
            }
        }
    },
    mounted() {
        document.title = `Flight ID: ${this.id}`
    }
}   
</script>
