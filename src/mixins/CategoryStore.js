export const CategoryStore = {
    computed:{
        nameErrors(){
           const errors = []
           if (!this.$v.name.$dirty) return errors
   
           if(!this.$v.name.required){
             errors.push('Name is required')
           }
           return errors
         },
         mmNameErrors(){
           const errors = []
           if (!this.$v.mmName.$dirty) return errors
   
           if(!this.$v.mmName.required){
             errors.push('myanmar name is required')
           }
           return errors
         },
          cnNameErrors(){
           const errors = []
           if (!this.$v.cnName.$dirty) return errors
   
           if(!this.$v.cnName.required){
             errors.push('chinese name is required')
           }
           return errors
         },
     },
}