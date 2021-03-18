<template>
  <div class="row">
    <div class="col-lg-5 ml-auto">
      <div class="info-area info-horizontal mt-5">
        <div class="icon icon-primary">
          <i class="now-ui-icons media-2_sound-wave"></i>
        </div>
        <div class="description">
          <h5 class="info-title">Marketing</h5>
          <p class="description">
            We've created the marketing campaign of the website. It was a very
            interesting collaboration.
          </p>
        </div>
      </div>

      <div class="info-area info-horizontal">
        <div class="icon icon-primary">
          <i class="now-ui-icons media-1_button-pause"></i>
        </div>
        <div class="description">
          <h5 class="info-title">Fully Coded in HTML5</h5>
          <p class="description">
            We've developed the website with HTML5 and CSS3. The client has
            access to the code using GitHub.
          </p>
        </div>
      </div>

      <div class="info-area info-horizontal">
        <div class="icon icon-info">
          <i class="now-ui-icons users_single-02"></i>
        </div>
        <div class="description">
          <h5 class="info-title">Built Audience</h5>
          <p class="description">
            There is also a Fully Customizable CMS Admin Dashboard for this
            product.
          </p>
        </div>
      </div>
    </div>
    <div class="col-lg-4 mr-auto">
      <form>
        <p class="h4 text-center mb-4">Sign up</p>
        <label for="defaultFormRegisterNameEx" class="grey-text">Your name</label>
        <input type="text" id="defaultFormRegisterNameEx" v-model="name" class="form-control"/>
        <br/>
        <label for="defaultFormRegisterEmailEx" class="grey-text">Your email</label>
        <input type="email" id="defaultFormRegisterEmailEx" v-model="email" class="form-control"/>
        <br/>
        <label for="defaultFormRegisterPasswordEx" class="grey-text">Your password</label>
        <input type="password" id="defaultFormRegisterPasswordEx" v-model="password" class="form-control"/>
        <div class="text-center mt-4">
          <button type="button" class="btn btn-unique" @click="register">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: null,
      boolean: false,
      email: null,
      password: null,
      password_confirmation: null,
      modelValidations: {
        name: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          min: 8,
        },
        confirmPassword: {
          required: true,
          confirmed: "password",
        },
        boolean: {
          required: true,
        },
      },
    };
  },
  methods: {
    register() {
      axios({
        method: 'POST',
        url: 'regis',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        }
      }).then((response) => {
        var token = response.data.access_token;
        this.$router.push('/')
      })
    }
  },
};
</script>
<style></style>
