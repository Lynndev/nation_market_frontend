export const MemberImageUpload = {
  data: () => ({
    profile: {},
    profileImageFile: null,
    nrcFrontImageFile: null,
    nrcBackImageFile: null,
  }),
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.member.name.$dirty) return errors;

      if (!this.$v.member.name.required) {
        errors.push("Name is required");
      }
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.member.phone.$dirty) return errors;

      if (!this.$v.member.phone.required) {
        errors.push("Phone is required");
      }
      return errors;
    },
    selectProfileImage() {
      if (!this.member.profile) {
        return this.defaultProfile;
      } else {
        return this.member.profile;
      }
    },
    selectNrcFront() {
      if (!this.member.front_nrc) {
        return this.defaultImage;
      } else {
        return this.member.front_nrc;
      }
    },
    selectNrcBack() {
      if (!this.member.back_nrc) {
        return this.defaultImage;
      } else {
        return this.member.back_nrc;
      }
    },
  },
  methods: {
    clickprofileImage() {
      this.$refs.fileProfile.click();
    },
    onProfileImagePicked(e) {
      const files = e.target.files;
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener("load", () => {
        this.member.profile = fr.result;
        this.profileImageFile = files[0]; // this is an image file that can be sent to server...
      });
    },
    clicktNrcFront() {
      this.$refs.fileNrcFront.click();
    },
    onNrcFrontPicked(e) {
      const files = e.target.files;
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener("load", () => {
        this.member.front_nrc = fr.result;
        this.nrcFrontImageFile = files[0]; // this is an image file that can be sent to server...
      });
    },
    clicktNrcBack() {
      this.$refs.fileNrcBack.click();
    },
    onNrcBackPicked(e) {
      const files = e.target.files;
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener("load", () => {
        this.member.back_nrc = fr.result;
        this.nrcBackImageFile = files[0]; // this is an image file that can be sent to server...
      });
    },
  },
};
