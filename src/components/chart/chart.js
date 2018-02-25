import {
  Bar
} from "vue-chartjs";

import axios from "axios";

export default {
  extends: Bar,
  data: () => {
    return {
      dataset: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      },
      response: false,
      responseMessage: ""
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.renderChart({
      "labels": [
        "matematica",
        "inglese",
        "informatica"
      ],
      "datasets": [{
        "label": "Subjects",
        "backgroundColor": "#f87979",
        "data": [
          1,
          1,
          1
        ]
      }]
    }, this.options);
  },
  methods: {
    getData() {
      axios.get("/api/trends/")
        .then((response) => {
          this.dataset = response.data;
          console.log(this.dataset);
        })
        .catch((e) => {
          this.response = false;
          this.responseMessage = e.response.data;
        })
    }
  }
}