<template>
  <div class="content">
    <div class="container-fluid">
      <div class="card">
        <div class="card-title">
          <h4>Ubah Banner</h4>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label for="banner_image">Banner Image</label>
            <input type="file" class="form-control" id="banner_image" aria-describedby="bannerHelp" @change="onFileChange">
            <small id="bannerHelp" class="form-text text-muted">Format image jpg, jpeg, png</small>
          </div>
          <img :src="data.banner_image">
          <div class="form-group">
            <label for="banner_description">Banner Description</label>
            <textarea class="form-control" id="banner_description" v-model="data.banner_description" placeholder="Description"></textarea>
          </div>
          <button type="button" class="btn btn-primary" @click="saveBanner">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    data () {
      return {
        data: {
          banner_image: '',
          banner_description: '',
        }
      }
    },
    methods: {
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.data.banner_image = e.target.result;
        }
        reader.readAsDataURL(file);
      },
      saveBanner() {
        var data = new FormData();
        data.append('banner_image', this.data.banner_image);
        data.append('banner_description', this.data.banner_description);

        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios({
          method: 'POST',
          url: 'banner/save',
          data: data,
          headers: config
        }).then((response) => {
          var message = response.data.message;
          alert(message);
        })
      }
    }
  }
</script>
<style>

</style>
