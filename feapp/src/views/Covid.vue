<template>
  <div class="main-container">
    <h1 class="headding">Covid</h1>
    <div class="wrapper-list">
      <div class="flex-sb">
        <h2>Covid Search</h2>
        <div class="search">
          <v-text-field
            v-model="dataInput"
            label="Search..."
            v-on:keyup.enter="searchCovidByCountry()"
          ></v-text-field>
          <v-btn
            depressed
            small
            color="primary"
            @click="searchCovidByCountry()"
          >
            Search
          </v-btn>
        </div>
      </div>
      <div class="scrollBar">
        <table>
          <thead>
            <tr>
              <th class="cell-center">#</th>
              <th>CountryName</th>
              <th class="cell-center">Confirmed</th>
              <th class="cell-center">Deaths</th>
              <th class="cell-center">Recovered</th>
              <th class="cell-center">Active</th>
              <th class="cell-center">Date</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(caseCovid, i) in caseCovidByCountry">
              <tr :key="i">
                <td class="cell-center">
                  <div>{{ i + 1 }}</div>
                </td>
                <td>
                  <div>{{ caseCovid.Country }}</div>
                </td>
                <td class="cell-center">
                  <div>{{ caseCovid.Confirmed }}</div>
                </td>
                <td class="cell-center">
                  <div>{{ caseCovid.Deaths }}</div>
                </td>
                <td class="cell-center">
                  <div>{{ caseCovid.Recovered }}</div>
                </td>
                <td class="cell-center">
                  <div>{{ caseCovid.Active }}</div>
                </td>
                <td class="cell-center">
                  <div>
                    {{
                      formatDate(
                        caseCovid.Date,
                        "YYYYMMDDTHH:mm:ssZ",
                        "DD/MM/YYYY"
                      )
                    }}
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="wrapper-list">
      <h2>Covid Summary</h2>
      <div class="scrollBar">
        <table>
          <thead>
            <tr>
              <th class="cell-center">#</th>
              <th>
                CountryName 
                <button @click="sortData('CountryName')">
                  <v-icon v-if="sortDesc.CountryName">mdi-arrow-down</v-icon>
                  <v-icon v-if="!sortDesc.CountryName">mdi-arrow-up</v-icon>
                </button>
              </th>
              <th>
                NewConfirmed
                <button @click="sortData('NewConfirmed')">
                  <v-icon v-if="sortDesc.NewConfirmed">mdi-arrow-down</v-icon>
                  <v-icon v-if="!sortDesc.NewConfirmed">mdi-arrow-up</v-icon>
                </button>
              </th>
              <th class="cell-center">
                TotalConfirmed
                <button @click="sortData('TotalConfirmed')">
                  <v-icon v-if="sortDesc.TotalConfirmed">mdi-arrow-down</v-icon>
                  <v-icon v-if="!sortDesc.TotalConfirmed">mdi-arrow-up</v-icon>
                </button>
              </th>
              <th class="cell-center">
                NewDeaths
                <button @click="sortData('NewDeaths')">
                  <v-icon v-if="sortDesc.NewDeaths">mdi-arrow-down</v-icon>
                  <v-icon v-if="!sortDesc.NewDeaths">mdi-arrow-up</v-icon>
                </button>
              </th>
              <th class="cell-center">
                TotalDeaths
                <button @click="sortData('TotalDeaths')">
                  <v-icon v-if="sortDesc.TotalDeaths">mdi-arrow-down</v-icon>
                  <v-icon v-if="!sortDesc.TotalDeaths">mdi-arrow-up</v-icon>
                </button>
              </th>
              <th class="cell-center">
                NewRecovered
                <button @click="sortData('NewRecovered')">
                  <v-icon v-if="sortDesc.NewRecovered">mdi-arrow-down</v-icon>
                  <v-icon v-if="!sortDesc.NewRecovered">mdi-arrow-up</v-icon>
                </button>
              </th>
              <th class="cell-center">
                TotalRecovered
                <button @click="sortData('TotalRecovered')">
                  <v-icon v-if="sortDesc.TotalRecovered">mdi-arrow-down</v-icon>
                  <v-icon v-if="!sortDesc.TotalRecovered">mdi-arrow-up</v-icon>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(CovidSummary, i) in CovidSummarys">
              <tr :key="i">
                <td class="cell-center">
                  <div>{{ i + 1 }}</div>
                </td>
                <td>
                  <div>{{ CovidSummary.Country }}</div>
                </td>
                <td class="cell-center">
                  <div>{{ CovidSummary.NewConfirmed }}</div>
                </td>
                <td class="cell-center">
                  <div>{{ CovidSummary.TotalConfirmed }}</div>
                </td>
                <td class="cell-center">
                  <div>{{ CovidSummary.NewDeaths }}</div>
                </td>
                <td class="cell-center">
                  <div>{{ CovidSummary.TotalDeaths }}</div>
                </td>
                <td class="cell-center">
                  <div>{{ CovidSummary.NewRecovered }}</div>
                </td>
                <td class="cell-center">
                  <div>{{ CovidSummary.TotalRecovered }}</div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import CovidService from "@/services/covid.service";
import moment from "moment";
import { _ } from "vue-underscore";

export default {
  name: "Covid",

  data() {
    return {
      CovidService: new CovidService(),
      CovidSummarys: [],
      caseCovidByCountry: null,
      dataCaseCovidByCountry: {},
      loading: false,
      dataInput: null,
      date: null,
      sortDesc: {
        CountryName: true,
        NewConfirmed: true,
        TotalConfirmed: true,
        NewDeaths: true,
        TotalDeaths: true,
        NewRecovered: true,
        TotalRecovered: true,
      },
    };
  },

  methods: {
    sortData(col) {
      const sortResult = _.sortBy(this.CovidSummarys, col);
      if (this.sortDesc[col]) {
        this.$set(this.sortDesc, col, false);
      } else {
        this.$set(this.sortDesc, col, true);
        sortResult.reverse();
      }
      this.CovidSummarys = sortResult;
    },

    searchCovidByCountry() {
      this.CovidService.getCovidByCountry(this.dataInput).then((res) => {
        this.caseCovidByCountry = res;
      });
    },

    formatDate(val, formatInput = "YYYYMMDD", formatOutput = "YYYY-MM-DD") {
      return moment(val, formatInput).format(formatOutput);
    },
  },

  async mounted() {
    await this.CovidService.getCovidSummary().then((res) => {
      this.CovidSummarys = res.Countries;
    });
  },
};
</script>

<style lang="scss">
.search {
  display: flex;
  align-items: center;
  button {
    margin-left: 10px;
  }
  .v-text-field__details {
    display: none;
  }
}
.wrapper-list {
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 50px;
  .scrollBar {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
  }
  table {
    border-spacing: 0;
    line-height: 24px;
  }
  td,
  th {
    border-top: 1px solid #ccc;
    vertical-align: middle;
    width: 10%;
    &:nth-of-type(1) {
      width: 50px;
    }
    &:nth-of-type(2) {
      width: 280px;
      max-width: 280px;
    }
  }
  .cell-center {
    text-align: center;
  }
  .flex-sb {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    margin-bottom: 20px;
  }
  .btns-action {
    .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
      background: none;
      box-shadow: none;
      width: 35px;
      min-width: 0;
      padding: 0;
      font-size: 20px;
      border-radius: 50%;
      height: 35px;
    }
  }
  button + button {
    margin-left: 10px;
  }
  .btn-add {
    display: flex;
    align-items: center;
    justify-content: center;
    .v-btn {
      color: #fff;
      font-size: 18px;
    }
  }
}
</style>