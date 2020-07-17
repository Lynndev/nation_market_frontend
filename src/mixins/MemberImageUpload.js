export const MemberImageUpload = {
 data: () => ({
        profile:{},
        profileImageUrl:null,
        nrcFrontImageUrl:null,
        nrcBackImageUrl:null,
        profileImageFile:null,
        nrcFrontImageFile:null,
        nrcBackImageFile:null
    }),
  computed: {
    selectProfileImage() {
        if (!this.member.profile_image) {
          if (this.profileImageUrl) {
            return this.profileImageUrl;
          }
        }
        return this.member.profile_image;
      },
    selectNrcFront() {
      if (!this.member.front_nrc) {
        if (this.nrcFrontImageUrl) {
          return this.nrcFrontImageUrl;
        }
        return this.defaultImage;
      }
      return this.member.front_nrc;
    },
    selectNrcBack() {
      if (!this.member.back_nrc) {
        if (this.nrcBackImageUrl) {
          return this.nrcBackImageUrl;
        }
        return this.defaultImage;
      }
      return this.member.back_nrc;
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
            this.profileImageUrl = fr.result;
            this.profileImageFile = files[0] // this is an image file that can be sent to server...
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
            this.nrcFrontImageUrl = fr.result;
            this.nrcFrontImageFile = files[0] // this is an image file that can be sent to server...
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
            this.nrcBackImageUrl = fr.result;
            this.nrcBackImageFile = files[0] // this is an image file that can be sent to server...
        });
    },
  },
};
