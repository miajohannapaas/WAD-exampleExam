<template>
  <div>
  <h1>Routes Management Pannel</h1>
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
            <td><input name="fromcity" type="text" id="fromcity" required v-model="route.fromcity"></td>
            <td><input name="tocity" type="text" id="tocity" required v-model="route.tocity"></td>
            <td><input name="cost" type="text" id="cost" required v-model="route.cost"></td>
            <td><input name="time" type="text" id="time" required v-model="route.departuretime"></td>
            <td><input name="date" type="text" id="date" required v-model="route.departuredate"></td>
            <td><button class="update"  @click="updateRoute(route.id, route)">update</button> </td> 
            <td><button class="delete"  @click="deleteRoute(route.id)">delete</button> </td> 
          </tr>
          </tbody>
          </table>
    </div>
    
    <h3>Add a Route</h3> 
    <div class="container">
    <table>
      <tbody>
        <tr> 
            <td><input name="fromcity" type="text" id="fromcityAdd" placeholder="From" required v-model="ARoute.fromcity"></td>
            <td><input name="tocity" type="text" id="tocityAdd" placeholder="To" required v-model="ARoute.tocity"></td>
            <td><input name="cost" type="number" id="costAdd" placeholder="Cost" required v-model="ARoute.cost"></td>
            <td><input name="time" type="text" id="timeAdd" placeholder="Departure time" required v-model="ARoute.departuretime"></td>
            <td><input name="date" type="text" id="dateAdd"   required v-model="ARoute.departuredate"></td>
        </tr>
      </tbody>
    </table>
    </div>
    <button class="add"  @click="addRoute(ARoute)"> Add  </button>
  </div>
</template>


<script>
export default {
  name: "RoutesManagement",
  data() {
    return {
      ARoute: {
        fromcity: "",
        tocity: "",
        cost: "",
        departuretime: "",
        departuredate: "",
      },
      routes: [],
    };
  },
  methods: {
    fetchRouts() {
      fetch(`http://localhost:3000/api/routes/`)
        .then((response) => response.json())
        .then((data) => (this.routes = data))
        .catch((err) => console.log(err.message));
  },
    addRoute(route) {
      fetch(`http://localhost:3000/api/routes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
        })
        .then((response) => {
          console.log("response.data" + response.data);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateRoute(id, route) {
      fetch(`http://localhost:3000/api/routes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {"id": id, "fromcity": route.fromcity, "tocity": route.tocity, "cost": route.cost, "departuretime": route.departuretime, "departuredate": route.departuredate}),
            })
        .then((response) => {
          console.log("response.data" + response.data);
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteRoute(id) {
      fetch(`http://localhost:3000/api/routes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          console.log(response.data);
          this.$router.push("/routemanagement");
        })
        .catch((e) => {
          console.log(e);
        });
    }, 
  },
  mounted() {
    this.fetchRouts();
    console.log("mounted");
  } 
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 80%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  
}
input{
  width: 100px;
  text-align: center
}
.delete{
    background: red;
}
.update{
    background: blue;
}
.add{
  background: rgb(8, 110, 110);
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
  align-items: center;
  text-align: center;
}
</style>