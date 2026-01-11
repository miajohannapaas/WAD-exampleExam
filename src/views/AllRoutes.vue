<template>
  <div>
<h3> All Route  </h3>

<!-- Task 1 -->
    <div class="container">
          <table>
          <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Cost</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr class="item" v-for="route in routes" :key="route.id">
            <td>{{ route.fromcity }} </td>
            <td>{{ route.tocity}} </td>
            <!-- <td> {{ route.cost}}</td> -->

            <td class='red' v-if="route.cost > 12"> {{ route.cost}}</td>
            <td class='blue' v-else>{{ route.cost}}</td>

            <td>{{ route.departuretime }} </td>
            <td>{{ route.departuredate }} </td> 
          </tr>
          </tbody>
          </table>
    </div>
    <div class ='counters'  >
            <p> We have  {{ routes.length }} trips today! </p>
    </div>
  </div>
</template>


<script>
export default {
  name: "AllRoutes",
  data() {
    return {
      toTallinn: 0,
      routes: [],

    };
  },
  methods: {
    fetchRouts() {//getting the data, calling backend GET /api/routes
      fetch(`http://localhost:3000/api/routes/`)
        .then((response) => response.json())
        .then((data) => (this.routes = data))
        .catch((err) => console.log(err.message));
  },
  },
  mounted() {//loading the data
    this.fetchRouts();
    console.log("mounted");
  } 
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
th {
  background: rgb(100, 151, 122);
}
td {
  background: rgb(186, 228, 204);
}
th, td {
  font-size: 15px;
  margin-bottom: 5px;
  padding: 8px 10px;
}
.red{
  background: rgb(225, 33, 19); 
}
.blue{
  background: rgb(19, 67, 163); 
}
.counters{
    background: rgb(157, 160, 165); 
    padding: 10px 20px;
    display: block;
    width: 40%;
    margin: auto;
    font-size: 18px;
}
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 40%;
  display: flex;
  justify-content: center;
}
</style>