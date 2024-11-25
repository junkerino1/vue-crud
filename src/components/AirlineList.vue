<template>
    <label class="form-label mt-4" for="airline">Select Airline:</label>
    <select v-model="selectedAirline" class="form-select" id="airline" name="airline">
        <option v-for="airline in airlines" :key="airline.text" :value="airline.value">{{ airline.text }}</option>
    </select>
</template>

<script>
export default {
    name: "AirlineList",
    props: {
        value:{
            type:String,
            default:"",
        }
    },
    data() {
        return {
            selectedAirline: this.modelValue,
            airlines: [
                { value: "Singapore Airlines", text: "Singapore Airlines" },
                { value: "Cathay Pacific", text: "Cathay Pacific" },
                { value: "All Nippon Airways (ANA)", text: "All Nippon Airways (ANA)" },
                { value: "Japan Airlines (JAL)", text: "Japan Airlines (JAL)" },
                { value: "Korean Air", text: "Korean Air" },
                { value: "Air Asia", text: "Air Asia" },
                { value: "China Southern Airlines", text: "China Southern Airlines" },
                { value: "China Eastern Airlines", text: "China Eastern Airlines" },
                { value: "Thai Airways", text: "Thai Airways" },
                { value: "Malaysia Airlines", text: "Malaysia Airlines" }
            ]
        }
    },
    watch:{
        selectedAirline(newVal){
            this.$emit('update:modelValue', newVal);
        }
    }
}
</script>

<style>

</style>