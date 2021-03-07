<template>
  <div class="wrapper">
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>
      <div v-for="(menu, index) in menus" :key="index">
        <sidebar-link :to="menu.to">
          <i :class="menu.icon"></i>
          <p>{{menu.name}}</p>
        </sidebar-link>
      </div>
      <!--            <template slot="bottom-links">-->
      <!--                <sidebar-link class="active"-->
      <!--                              to="/admin/upgrade">-->
      <!--                    <i class="nc-icon nc-alien-33"></i>-->
      <!--                    <p>Upgrade to PRO</p>-->
      <!--                </sidebar-link>-->
      <!--            </template>-->
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbar.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  import MobileMenu from './MobileMenu.vue'

  export default {
    data() {
      return {
        menus: [
          {
            to: '/',
            icon: '',
            name: 'Dasbor'
          },
          {
            to: '/main/kategori-transaksi',
            icon: '',
            name: 'Kategori Transaksi'
          },
          {
            to: '/main/transaksi',
            icon: '',
            name: 'Transaksi'
          },
          {
            to: '/main/asset-liabilitas',
            icon: '',
            name: 'Asset / Liabilitas'
          },
          {
            to: '/main/pemasukan',
            icon: '',
            name: 'Pemasukan'
          },
          {
            to: '/main/perencanaan-keuangan',
            icon: '',
            name: 'Perencanaan Keuangan'
          },
        ]
      }
    },
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent,
      MobileMenu
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false)
        }
      }
    }
  }

</script>
