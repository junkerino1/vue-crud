<template>
    <div class="container" id="listing">
        <table class="mt-3">
            <tbody>
                <tr>
                    <td>
                        <h3>Flight: </h3>
                    </td>
                    <td>
                        <h3>{{ flight.airline }}</h3>
                    </td>
                </tr>
                <tr>
                    <td>Pax: </td>
                    <td>{{ flight.pax }}</td>
                </tr>
                <tr>
                    <td>Occupied: </td>
                    <td>{{ flight.occupied }}</td>
                </tr>

                <tr>
                    <td>Destination: </td>
                    <td>{{ flight.destination }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Country</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="passenger in passengers" :key="passenger.id">
                    <td>{{ passenger.name }}</td>
                    <td>{{ passenger.country }}</td>
                    <td><button @click="deletePassenger(passenger.id)" class="btn btn-danger">Delete</button></td>
                </tr>
            </tbody>
        </table>
        <div v-if="flight.pax > flight.occupied">
            <RouterLink :to="{ name: 'CreatePassenger', params: { id: flight.id } }" class="btn btn-primary">Add Passenger</RouterLink>
        </div>
        <p v-if="flight.pax < flight.occupied" class="text-danger">Pax is full</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        id: String
    },
    name: 'ViewFlights',
    data() {
        return {
            passengers: Array,
            flight: Object
        };
    },
    created() {
        this.getPassengers();
    },
    methods: {
        async getPassengers() {
            const url = `http://localhost:8000/api/passengerAPI/${this.id}`;
            await axios.get(url).then(response => {
                this.passengers = response.data.passengers;
                this.flight = response.data.flight;
                console.log(this.passengers);
                console.log(this.flight);
            }).catch(error => {
                console.log(error);
            });
        },
        async deletePassenger(id) {
            let url = `http://localhost:8000/api/deletePassengerAPI/${id}`;
            await axios.delete(url).then(response => {
                console.log('response: ', response);
                if (response.code == 200) {
                    alert("Passenger deleted successfully. ");
                    this.passengers = this.passengers.filter(p => p.id !== id);
                    console.log(response.message);
                } else {
                    alert("Failed to delete passenger.");
                }
            }).catch(error => {
                console.log(error);
            });
        }
    },
    mounted() {
        console.log('Passenger list mounted');
        document.title = `Flight ID: ${this.id}`;
    }

}
</script>