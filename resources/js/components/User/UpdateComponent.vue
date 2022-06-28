<template>
  <section class="content pt-3">
    <div class="container-fluid">
      <div class="content-wrapper">
        <div class="row">
          <section class="col-lg-12 connectedSortable">
            <div class="card">
              <!-- Header of the page Apply cardprops details -->
              <cardheader-component
                :headerprops="headerprops"
              ></cardheader-component>
              <form @submit.prevent="submitform" class="form-horizontal">
                <div class="card-body">
                  <!-- Full screen loader -->
                  <loadingoverlay-component
                    v-if="loading"
                  ></loadingoverlay-component>
                  <!-- Simple loader -->
                  <!-- <loadingtable-component v-if="loading"></loadingtable-component> -->
                  <!-- Simple type text input form -->
                  <inputtext-component
                    :inputprops="input1"
                    :value="crt_updt_user.name"
                    :action="updatename"
                  ></inputtext-component>
                  <inputtext-component
                    :inputprops="input2"
                    :value="crt_updt_user.email"
                    :action="updateemail"
                  ></inputtext-component>
                  <inputtext-component
                    :inputprops="input3"
                    :value="crt_updt_user.phoneno"
                    :action="updatephone"
                  ></inputtext-component>
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Gender</label>
                    <div class="col-sm-10">
                      <div class="custom-control custom-radio">
                        <input
                          class="
                            custom-control-input
                            custom-control-input-danger
                            custom-control-input-outline
                          "
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          @input="updategender"
                          :checked="'male'===crt_updt_user.gender"
                        />
                        <label for="male" class="custom-control-label"
                          >male</label
                        >
                      </div>
                      <div class="custom-control custom-radio">
                        <input
                          class="
                            custom-control-input
                            custom-control-input-danger
                            custom-control-input-outline
                          "
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          @input="updategender"
                          :checked="'female'===crt_updt_user.gender"
                        />
                        <label for="female" class="custom-control-label"
                          >female</label
                        >
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label"
                      >Upload (Image)</label
                    >
                    <picture-input
                      ref="image"
                      @change="onChanged"
                      @remove="onRemoved"
                      :width="700"
                      :removable="true"
                      removeButtonClass="btn btn-danger"
                      :height="300"
                      accept="image/jpeg, image/png"
                      buttonClass="btn btn-primary"
                      :customStrings="{
                        upload: '<h1>Upload it!</h1>',
                        drag: 'Drag and drop your image here',
                      }"
                      required
                    >
                    </picture-input>
                  </div>
                </div>
                <cardfooter-component
                  :footerprops="footerprops"
                ></cardfooter-component>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      headerprops: {
        headername: "User - Update",
        issummary: false,
      },
      footerprops: {
        isfooter: true,
        submitclass: "btn btn-success btn-block",
        submitname: "Save",
      },
      input1: {
        label: "Name",
        propertyname: "name",
        placeholder: "enter user name..",
        required: "required",
      },
      input2: {
        label: "Email",
        propertyname: "email",
        placeholder: "enter email quantity..",
        required: "required",
      },
      input3: {
        label: "Phone No",
        propertyname: "phoneno",
        placeholder: "enter phoneno price..",
        required: "required",
      },
    };
  },
  created() {
    this.resetstate();
    this.fetcheditdata(this.$route.params.id);
  },
  destroyed() {
    this.resetstate();
  },
  computed: {
    ...mapGetters("UserIndex", ["loading", "crt_updt_user"]),
  },
  methods: {
    ...mapActions("UserIndex", [
      "resetstate",
      "fetcheditdata",
      "setname",
      "setemail",
      "setphone",
      "setgender",
      "setimage",
      "updatedata",
    ]),
    updatename(e) {
      this.setname(e.target.value);
    },
    updateemail(e) {
      this.setemail(e.target.value);
    },
    updatephone(e) {
      this.setphone(e.target.value);
    },
    updategender(e) {
      this.setgender(e.target.value);
    },
    onChanged() {
      if (this.$refs.image.file) {
        this.setimage(this.$refs.image.file);
      }
    },
    onRemoved() {
      this.setimage(null);
    },
    submitform() {
      this.updatedata()
        .then((response) => {
          //awsome notification create success
          this.$eventHub.$emit(
            "create-success",
            "User updated successfully",
            response
          );
          this.$router.push({ name: "user.list" });
        })
        .catch((error) => {
          //awsome notification error
          this.$eventHub.$emit("delete-success", error);
        });
    },
  },
};
</script>

<style>
</style>