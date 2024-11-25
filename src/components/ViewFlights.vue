<template>

    <div class="container mt-4" id="listing">
        <h3>Listing</h3>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Airline</th>
                    <th>Pax</th>
                    <th>Occupied</th>
                    <th>Destination</th>
                    <th colspan="2" class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="flight in flights" :key="flight.id">
                    <td>{{ flight.id }}</td>
                    <td>{{ flight.airline }}</td>
                    <td>{{ flight.pax }}</td>
                    <td>{{ flight.occupied }}</td>
                    <td>{{ flight.destination }}</td>

                    <!-- View Passenger Popup -->
                    <td><button class="btn btn-primary mx-0" @click="viewFlight(flight.id)">View</button></td>

                    <!-- Edit Flight Popup -->
                    <td><button class="btn btn-primary mx-0" @click="editFlight(flight)">Edit</button></td>

                    <td>
                        <form @submit.prevent="deleteFlight(flight.id)">
                            <input type='submit' value='Delete' class="btn btn-primary">
                        </form>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Popup Create -->
        <div v-if="showPopup" class="popup">
            <CreateFlightModel @cancel="closePopup" @refresh="getFlights" />
        </div>

        <!-- Popup View -->
        <div v-if="viewFlightPopup" class="popup">
            <ViewPassengerModel :id="selectedId" @cancel="closeViewPopup" @refresh="getFlights" />
        </div>

        <!-- Popup Edit -->
        <div v-if="editFlightPopup" class="popup">
            <EditFlightModel :flight="selectedFlight" @cancel="closeEditPopup" @refresh="getFlights" />
        </div>

        <!-- Trigger Popup -->
        <button class="btn btn-success my-3" @click="showPopup = true">Create</button>
    </div>
</template>

<script>
import axios from 'axios';
import CreateFlightModel from './CreateFlightModel.vue';
import ViewPassengerModel from './ViewPassengerModel.vue';
import EditFlightModel from './EditFlightModel.vue';

export default {
    components: {
        CreateFlightModel,
        ViewPassengerModel,
        EditFlightModel,
    },
    name: 'ViewFlights',
    data() {
        return {
            flights: [],
            showPopup: false,
            viewFlightPopup: false,
            editFlightPopup: false,
            flight: {},
        };
    },
    methods: {
        async getFlights() {
            try {
                const response = await axios.get('http://localhost:8000/api/flightAPI');
                this.flights = response.data.flights;
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        },
        async deleteFlight(id) {
            try {
                const response = await axios.delete(`http://localhost:8000/api/deleteFlightAPI/${id}`);
                if (response.data.code === 200) {
                    alert(response.data.message || 'Flight deleted successfully!');
                    this.getFlights();
                } else {
                    alert(response.data.message || 'Failed to delete the flight.');
                }
            } catch (error) {
                console.error('Error deleting flight:', error);
                alert('Error deleting the flight.');
            }
        },
        closePopup() {
            this.showPopup = false;
        },
        editFlight(flight) {
            console.log('flight:', flight);
            this.selectedFlight = flight;
            this.editFlightPopup = true;
        },
        closeEditPopup() {
            this.editFlightPopup = false;
        },
        viewFlight(id) {
            console.log('flight id:', id);
            this.selectedId = id;
            this.viewFlightPopup = true;
        },
        closeViewPopup() {
            this.viewFlightPopup = false;
        }
    },
    mounted() {
        this.getFlights();
        document.title = "Flight";
    },
    created() {
        this.getFlights();
    },
};
</script>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup .popup-inner {
    background: rgb(230, 230, 230);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 1000px;
}
</style>