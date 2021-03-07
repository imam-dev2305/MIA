<template>
  <div class="col-md-12">
    <card>
      <template slot="header">
        <p class="card-category">Transaksi</p>
      </template>
      <div class="col-md-2">
        <div class="form-group">
          <label for="tgl_transaksi">Tanggal Transaksi</label>
          <b-form-datepicker
            id="tgl_transaksi"
            placeholder=""
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="id"
            v-model="transaction_date"
          >
          </b-form-datepicker>
        </div>
      </div>
      <b-alert
        :variant="alert.variant"
        dismissible
        fade
        :show="alert.showDismissibleAlert"
        @dismiss-count-down="3"
      >
        {{alert.message}}
      </b-alert>
      <div class="table-responsive fixed-table-body">
        <table class="table table-striped table-bordered" width="100%">
          <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th>Kategori</th>
            <th width="15%">Ref</th>
            <th>Keterangan</th>
            <th width="10%">D</th>
            <th width="10%">K</th>
            <th>Tools</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(record, index) in records" :key="index">
            <td>{{index+1}}</td>
            <td>
              <select name="sub_journal_account_id" class="form-control" v-model="record.sub_journal_account_id">
                <option v-for="(akun, index) in akuns" :key="index" :value="akun.sub_journal_account_id">{{akun.sub_journal_account_id}} - {{akun.sub_journal_account_name}}</option>
              </select>
            </td>
            <td><input type="text" name="ref" class="form-control" v-model="record.ref"></td>
            <td><input type="text" name="keterangan" class="form-control" v-model="record.keterangan"></td>
            <td><input type="text" name="debet" class="form-control" v-model="record.debet"></td>
            <td><input type="text" name="kredit" class="form-control" v-model="record.kredit"></td>
            <td>
              <a class="btn btn-danger" v-show="(index+1) !== 1" @click="removeRow(index)"><span class="fa fa-trash"></span></a>
              <a class="btn btn-light" @click="addMoreRow(index + 1)"><span class="fa fa-plus"></span></a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <a class="btn btn-primary float-right" @click="saveTransaction"><span class="fa fa-file"></span> Save</a>
    </card>
  </div>
</template>

<script>
  // import moment from 'moment'
  export default {
    name: "Transaction",
    data() {
      return {
        records: [{
          'sub_journal_account_id': '',
          'ref': '',
          'keterangan': '',
          'debet': '',
          'kredit': ''
        }],
        alert: {
          message: '',
          showDismissibleAlert: false,
          variant: '',
        },
        transaction_date: this.moment(new Date).format('YYYY-MM-DD'),
        akuns: [],
      }
    },

    mounted() {
      this.listKategori()
      this.getTransaction()
    },

    methods: {
      addMoreRow(idx) {
        this.records.splice(idx, 0, {
          'sub_journal_account_id': '',
          'ref': '',
          'keterangan': '',
          'debet': '',
          'kredit': ''
        })
      },

      removeRow(idx) {
        this.records.splice(idx, 1)
      },

      listKategori() {
        axios.get('sub-journal/list-account', {headers: {Authorization: `Bearer `+this.$store.state.bearer}})
          .then((response) => {
            var new_obj = [];
            Object.keys(response.data).forEach(function (val) {
              new_obj.push({
                'sub_journal_account_id': response.data[val].sub_journal_account_id,
                'sub_journal_account_name': response.data[val].sub_journal_account_name,
                'journal_account_name': response.data[val].journal_account_name
              })
            })
            this.akuns = new_obj
          })
      },

      getTransaction() {
        axios({
          method: "POST",
          url: "transaction/list-transaction",
          data: {tgl_transaksi: this.transaction_date}
        }).then((response) => {
          if (response.data.length > 0) {
            this.records = response.data
          } else {
            this.records = [{
              'sub_journal_account_id': '',
              'ref': '',
              'keterangan': '',
              'debet': '',
              'kredit': ''
            }]
          }
        })
      },

      saveTransaction() {
        axios({
          method: "POST",
          url: "transaction/save-transaction",
          data: {tgl_transaksi: this.transaction_date, records: this.records}
        }).then((response) => {
          this.alert.variant = 'success'
          this.alert.showDismissibleAlert = 3
          this.alert.message = response.data.message
        })
        setTimeout(() => this.alert = {
          message: '',
          showDismissibleAlert: false,
          variant: ''
        }, 3000)
        this.getTransaction()
      }
    },

    watch: {
      transaction_date() {
        this.getTransaction()
      }
    }
  }
</script>

<style scoped>

</style>
