<template>
    <div class="popup-inner">
        <h3 class="mt-4">Edit Flight</h3>
        <p>Flight ID: {{ editingFlight.id }}</p>
        <form @submit.prevent="updateFlight">
            <div>
                <label class="form-label">Airline</label>
                <select name="airline" v-model="editingFlight.airline" id="airline" class="form-select">
                    <option value="Airasia">AirAsia</option>
                    <option value="Mas Airline">MAS Airline</option>
                    <option value="Firefly">Firefly</option>
                </select>
            </div>
            <div>
                <label class="col-form-label mt-2" for="inputDefault">Pax</label>
                <input type="number" v-model="editingFlight.pax" class="form-control" id="pax" name="pax"
                    placeholder="Pax" min="10" max="100" />
            </div>
            <input type="hidden" v-model="editingFlight.occupied" id="occupied" value="0" />
            <div>
                <CountryList @update:selected="setCountry" v-model="editingFlight.destination" />
            </div>

            <div class="mt-4">
                <span class="mr-2"><button type="submit" class="btn btn-success">Save</button></span>
                <span class="m-2"><button type="button" class="btn btn-danger" @click="cancelEdit">Cancel</button></span>
            </div>

        </form>
    </div>
</template>

<script>
import axios from "axios";
import CountryList from "./CountryList.vue";

export default {
    components: {
        CountryList,
    },
    data() {
        return {
            editingFlight: {
                airline: "",
                pax: "",
                occupied: "",
                destination: "",
            },
        };
    },
    name: "EditFlightModel",
    props: {
        flight: Object,
    },
    methods: {
        // Method to update flight
        async updateFlight() {
            console.log(this.editingFlight.id);
            const url = `http://localhost:8000/api/updateFlightAPI/${this.editingFlight.id}`;
            try {
                const response = await axios.put(url, this.editingFlight);
                if (response.status === 200) {
                    alert(response.data.message || "Flight updated successfully!");
                    this.$emit('refresh');
                    this.$emit('cancel');
                }
            } catch (error) {
                console.error("Error updating flight:", error);
                alert("Failed to update flight. Please try again.");
            }
        },
        setCountry(selectedCountry) {
            this.editingFlight.destination = selectedCountry;
        },
        cancelEdit() {
            this.$emit('cancel');
        }
    },
    watch: {
        flight(newFlight) {
            // When the 'flight' prop changes, update the 'editedFlight' with the new data
            this.editingFlight = { ...newFlight };
        }
    },
    created() {
        this.editingFlight = { ...this.flight };
    },
};
</script>
