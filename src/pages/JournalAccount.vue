<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12" style="margin-bottom: 10px">
          <b-button v-b-modal.modal-1>Tambah Kategori</b-button>
          <b-modal id="modal-1" hide-footer title="Tambah Kategori" size="xl" class="modal-custom">
            <card>
              <h4 slot="header" class="card-title">Kategori Transaksi</h4>
              <b-alert
                :variant="alert_save.variant"
                dismissible
                fade
                :show="alert_save.showDismissibleAlert"
                @dismiss-count-down="3"
              >
                {{alert_save.message}}
              </b-alert>
              <form name="frm-account-add" id="frm-account-add">
                <div class="form-group">
                  <label class="control-label">Tipe Akun</label>
                  <select name="id_journal_account" class="form-control" v-model="data_send.journal_account_id">
                    <option v-for="(akun, index) in tipe_akun" v-bind:value="akun.journal_account_id">{{akun.journal_account_name}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="control-label">Nama Transaksi</label>
                  <input type="text" name="name_account" class="form-control" v-model="data_send.sub_journal_account_name">
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-info btn-fill float-right" @click.prevent="saveAccount">
                    Tambahkan
                  </button>
                </div>
                <div class="clearfix"></div>
              </form>
            </card>
          </b-modal>
        </div>

        <div class="col-md-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <!--                            <h4 class="card-title">List Kategori</h4>-->
              <p class="card-category">Daftar Kategori</p>
            </template>
            <v-data-table
              :headers="headers"
              :items="akun"
              item-key="name"
              class="elevation-1"
              :search="search"
              :custom-filter="filterOnlyCapsText"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="search"
                  label="Search"
                  class="mx-4"
                ></v-text-field>
              </template>
              <template v-slot:item.action="{ item }">
                <a class="btn btn-sm btn-warning" @click="editItem(item)"><span class="fa fa-pencil"></span></a>
                <a class="btn btn-sm btn-danger" @click="deleteItem(item)"><span class="fa fa-trash"></span></a>
              </template>
            </v-data-table>
          </card>
        </div>

        <b-modal id="m_updateAccount" hide-footer title="Rubah Kategori" size="xl" class="modal-custom">
          <card>
            <h4 slot="header" class="card-title">Kategori Transaksi</h4>
            <b-alert
              :variant="alert_update.variant"
              dismissible
              fade
              :show="alert_update.showDismissibleAlert"
              @dismiss-count-down="3"
            >
              {{alert_update.message}}
            </b-alert>
            <form name="frm-account-update" id="frm-account-update">
              <div class="form-group">
                <label class="control-label">Nama Transaksi</label>
                <input type="text" name="u_name_account" class="form-control" v-model="data_update.sub_journal_account_name">
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-warning btn-fill float-right" @click.prevent="updateAccount">
                  Update
                </button>
              </div>
              <div class="clearfix"></div>
            </form>
          </card>
        </b-modal>

      </div>
    </div>
  </div>
</template>
<script>
  import UserCard from './UserProfile/UserCard.vue'
  import Card from '../components/Cards/Card'

  export default {
    name: "JournalAccount",
    components: {
      Card,
      UserCard,
    },
    data() {
      return {
        data_send: {
          'journal_account_id': '',
          'sub_journal_account_name': ''
        },
        data_update: {
          'sub_journal_account_id': '',
          'sub_journal_account_name': ''
        },
        data_delete: {
          'sub_journal_account_id': ''
        },
        alert_save: {
          message: '',
          showDismissibleAlert: false,
          variant: '',
        },
        alert_update: {
          message: '',
          showDismissibleAlert: false,
          variant: '',
        },
        tipe_akun: '',
        search: '',
        akun: [],
      }
    },
    mounted() {
      this.daftar_akun()
      this.listKategori()
    },
    computed: {
      headers() {
        return [
          {
            text: 'Kode Akun',
            align: 'start',
            sortable: true,
            value: 'sub_journal_account_id',
          },
          {
            text: 'Nama Akun',
            sortable: true,
            value: 'sub_journal_account_name',
          },
          {text: 'Tipe Akun', value: 'journal_account_name'},
          {text: 'Action', value: 'action', sortable: false}
        ]
      },
    },
    methods: {
      filterOnlyCapsText(value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
      },
      daftar_akun() {
        axios.get('journal/list-account', {headers: {Authorization: `Bearer `+this.$store.state.bearer}})
          .then((response) => {
            this.tipe_akun = response.data
          })
      },
      saveAccount() {
        axios({
          method: 'POST',
          url: 'sub-journal/save-account',
          data: this.data_send
        }).then((response) => {
          if (response.data.status === 200) {
            this.alert_save.variant = 'success'
            this.alert_save.showDismissibleAlert = 3
            this.alert_save.message = response.data.message
          }
          this.data_send = {
            'journal_account_id': '',
            'sub_journal_account_name': ''
          }
          setTimeout(() => this.alert_save = {
              message: '',
              showDismissibleAlert: false,
              variant: ''
          }, 3000)
          this.listKategori();
        })
      },
      updateAccount() {
        axios({
          method: 'POST',
          url: 'sub-journal/edit-account',
          data: this.data_update
        }).then((response) => {
          if (response.data.status === 200) {
            this.alert_update.variant = 'success'
            this.alert_update.showDismissibleAlert = 3
            this.alert_update.message = response.data.message
          }
          this.data_update = {
            'sub_journal_account_id': '',
            'sub_journal_account_name': ''
          }
          setTimeout(() =>
            this.alert_update = {
              message: '',
              showDismissibleAlert: false,
              variant: '',
            }, 3000)
          setTimeout(() => this.$bvModal.hide('m_updateAccount'), 3000)
          this.listKategori();
        })
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
            this.akun = new_obj
          })
      },
      editItem (item) {
        this.data_update = Object.assign({}, item)
        this.$bvModal.show('m_updateAccount')
      },
      deleteItem (item) {
        this.data_delete = Object.assign({}, item)
        var confirms = confirm("Apakah anda yakin ingin menghapus data?");
        if (confirms) {
          axios({
            method: 'POST',
            url: 'sub-journal/delete-account',
            data: this.data_delete
          }).then((response) => {
            Object.assign(this.data_delete, {
              'sub_journal_account_id': ''
            })
            this.listKategori();
          })
        }
      }
    }
  }

</script>
<style>
  .v-data-table__wrapper, .v-data-footer {
    margin-left: 20px;
  }
</style>
