<template>
    <div class="popup-inner">
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
        </table>
        <div class="table table-responsive mb-0" style="height:300px;overflow-y:auto">
            <table class="table table-striped">
                <tbody>
                    <tr v-for="passenger in passengers" :key="passenger.id">
                        <td>{{ passenger.name }}</td>
                        <td>{{ passenger.country }}</td>
                        <td><button @click="deletePassenger(passenger.id)" class="btn btn-danger my-0">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div>
            <span v-if="flight.pax > flight.occupied">
                <RouterLink :to="{ name: 'CreatePassenger', params: { id: flight.id } }" class="btn btn-primary">Add
                    Passenger</RouterLink>
            </span>
            <span class="m-2"><button type="button" class="btn btn-danger" @click="closeForm">Cancel</button></span>
        </div>
        <p v-if="flight.pax < flight.occupied" class="text-danger">Pax is full</p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    name: 'ViewFlightModel',
    data() {
        return {
            passengers: Array,
            flight: Object,
            flightId: null
        };
    },
    methods: {
        async getPassengers(id) {
            console.log('in method:', id);
            const url = `http://localhost:8000/api/passengerAPI/${id}`;
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
            console.log('dlt id', id);
            let url = `http://localhost:8000/api/deletePassengerAPI/${id}`;
            await axios.delete(url).then(response => {
                if (response.status == 200) {
                    alert("Passenger deleted successfully. ");
                    this.passengers = this.passengers.filter(p => p.id !== id);
                    console.log(response.message);
                } else {
                    alert("Failed to delete passenger.");
                }
            }).catch(error => {
                console.log(error);
            });
        },
        closeForm() {
            this.$emit('cancel');
        }
    },
    watch: {
        id: {
            immediate: true,
            handler(newId) {
                this.getPassengers(newId);
            }
        }
    },
    mounted() {
        console.log('Passenger list mounted');
        document.title = `Flight ID: ${this.flightId}`;
    }

}
</script>