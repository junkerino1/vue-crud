<template>
    <div class="popup-inner">
        <h4>Create Flight</h4>
        <form @submit.prevent="createFlight">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <AirlineList @update:selected="setAirline" v-model="flight.airline" />
                        <CountryList @update:selected="setCountry" v-model="flight.destination" />
                        <label class="col-form-label mt-2" for="pax">Pax</label>
                        <select name="pax" id="pax" v-model="flight.pax" class="form-select">
                            <option value="1">1-50</option>
                            <option value="2">51-100</option>
                        </select>
                    </div>

                    <div class="col">
                        <component :is="currentFormComponent" v-if="currentFormComponent"></component>
                    </div>
                </div>
                <div class="row justify-content-end">
                    <div class="col align-self-end">
                        <div class="mt-5">
                            <span class="mr-2"><button type="submit" class="btn btn-success">Save</button></span>
                            <span class="m-2"><button type="button" class="btn btn-danger"
                                    @click="closeForm">Cancel</button></span>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
import axios from 'axios';
import CountryList from './CountryList.vue';
import AirlineList from './AirlineList.vue';
import DummyForm1 from './DummyForm1.vue';
import DummyForm2 from './DummyForm2.vue';

export default {
    name: "FlightModel",
    components: {
        CountryList,
        AirlineList,
        DummyForm1,
        DummyForm2,
    },
    props: {

    },
    data() {
        return {
            flight: {
                airline: '',
                destination: '',
                pax: 0,
            },
            formComponents: {
                1: 'DummyForm1',
                2: 'DummyForm2',
            },
        }
    },
    methods: {
        async createFlight() {
            try {
                console.log(this.flight);
                const response = await axios.post('http://localhost:8000/api/createFlightAPI', this.flight);
                console.log(response.status);
                if (response.status === 200) {
                    alert('Flight created successfully!');
                    this.$emit('refresh');
                    this.$emit('cancel');
                } else {
                    alert('Failed to create flight.');
                }
            } catch (error) {
                console.error('Error creating flight:', error);
                alert('Error creating the flight.');
            }
        },
        setAirline(selectedAirline) {
            this.airline = selectedAirline;
        },
        setCountry(selectedCountry) {
            this.country = selectedCountry;
        },
        closeForm() {
            this.$emit('cancel');
        },
    },
    computed: {
        currentFormComponent() {
            return this.formComponents[this.flight.pax] || null;
        },
    },
    mounted() {
        document.title = 'Create Flight';
    }
}
</script>