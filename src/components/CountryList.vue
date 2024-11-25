<template>
    <div>
        <!-- Region Select -->
        <label class="form-label mt-4" for="region">Select Region:</label>
        <select v-model="selectedRegion" id="region" class="form-select">
            <option value="">All Regions</option>
            <option value="South Asia">South Asia</option>
            <option value="Southeast Asia">Southeast Asia</option>
            <option value="East Asia">East Asia</option>
            <option value="Central Asia">Central Asia</option>
            <option value="Middle East">Middle East</option>
        </select>

        <!-- Country Select -->
        <label class="form-label mt-4" for="country">Select Country:</label>
        <select v-model="selectedCountry" id="country" class="form-select">
            <option v-for="country in filteredCountries" :key="country.name" :value="country.name">
                {{ country.name }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "CountryList",
    props: {
        value: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            selectedRegion: "",
            selectedCountry: this.modelValue,
            countries: [
                { name: "Afghanistan", region: "South Asia" },
                { name: "Bangladesh", region: "South Asia" },
                { name: "Bhutan", region: "South Asia" },
                { name: "India", region: "South Asia" },
                { name: "Maldives", region: "South Asia" },
                { name: "Nepal", region: "South Asia" },
                { name: "Pakistan", region: "South Asia" },
                { name: "Sri Lanka", region: "South Asia" },
                { name: "Brunei", region: "Southeast Asia" },
                { name: "Cambodia", region: "Southeast Asia" },
                { name: "Indonesia", region: "Southeast Asia" },
                { name: "Laos", region: "Southeast Asia" },
                { name: "Malaysia", region: "Southeast Asia" },
                { name: "Myanmar", region: "Southeast Asia" },
                { name: "Philippines", region: "Southeast Asia" },
                { name: "Singapore", region: "Southeast Asia" },
                { name: "Thailand", region: "Southeast Asia" },
                { name: "Vietnam", region: "Southeast Asia" },
                { name: "China", region: "East Asia" },
                { name: "Japan", region: "East Asia" },
                { name: "Mongolia", region: "East Asia" },
                { name: "North Korea", region: "East Asia" },
                { name: "South Korea", region: "East Asia" },
                { name: "Kazakhstan", region: "Central Asia" },
                { name: "Kyrgyzstan", region: "Central Asia" },
                { name: "Tajikistan", region: "Central Asia" },
                { name: "Turkmenistan", region: "Central Asia" },
                { name: "Uzbekistan", region: "Central Asia" },
                { name: "Bahrain", region: "Middle East" },
                { name: "Iran", region: "Middle East" },
                { name: "Iraq", region: "Middle East" },
                { name: "Israel", region: "Middle East" },
                { name: "Jordan", region: "Middle East" },
                { name: "Kuwait", region: "Middle East" },
                { name: "Lebanon", region: "Middle East" },
                { name: "Oman", region: "Middle East" },
                { name: "Palestine", region: "Middle East" },
                { name: "Qatar", region: "Middle East" },
                { name: "Saudi Arabia", region: "Middle East" },
                { name: "Syria", region: "Middle East" },
                { name: "Turkey", region: "Middle East" },
                { name: "United Arab Emirates", region: "Middle East" },
                { name: "Yemen", region: "Middle East" },
            ],
        };
    },
    computed: {
        filteredCountries() {
            if (this.selectedRegion) {
                return this.countries.filter((country) => country.region === this.selectedRegion);
            }
            return this.countries;
        },
    },
    watch: {
        selectedCountry(newVal) {
            this.$emit('update:modelValue', newVal);
        },
    },
};
</script>

<style scoped>
.form-control {
    width: 300px;
    margin: 10px 0;
}
</style>
