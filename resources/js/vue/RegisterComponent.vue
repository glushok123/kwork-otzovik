<template>
    <div class="container p-5">
      <h3 class="text-center mt-2 mb-5">Форма регистрации</h3>
      <div class="col-md-12">
            <form v-on:submit.prevent="createUser" class="row g-3 needs-validation" novalidate>
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" v-model="form.firstName" id="firstName" name="firstName" class="form-control" :class="{ 'is-invalid': submitted && v$.form.firstName.$error }" />
                    <div v-if="submitted && v$.form.firstName.required" class="invalid-feedback">First Name is required</div>
                </div>
                <div class="mb-3">
                    <label for="secondName" class="form-label">Second Name</label>
                    <input type="text" name="secondName" class="form-control" id="secondName" aria-describedby="nameHelp" placeholder="Second Username" v-model="form.secondName" :class="{ 'is-invalid': submitted && v$.form.secondName.$error }">
                    <div v-if="submitted && v$.form.secondName.required" class="invalid-feedback">Second Name is required</div>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" name="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter Email" v-model="form.email" :class="{ 'is-invalid': submitted && v$.form.email.$error }">
                    <div v-if="submitted && v$.form.email.$error" class="invalid-feedback">
                        <span v-if="v$.form.email.required">Email is required</span>
                        <span v-if="v$.form.email.email">Email is invalid</span>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" id="password" aria-describedby="passHelp" placeholder="Enter Password" v-model="form.password" :class="{ 'is-invalid': submitted && v$.form.password.$error }">
                    <div v-if="submitted && v$.form.password.$error" class="invalid-feedback">
                        <span v-if="v$.form.password.required">Password is required</span>
                        <span v-if="v$.form.password.minLength">Password must be at least 6 characters</span>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary mt-5">Submit</button>
            </form>
    </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Swal from 'sweetalert2';
    
    import { useVuelidate } from '@vuelidate/core';
    import { email, required, minLength, sameAs } from '@vuelidate/validators';

    export default {
        name: "RegisterComponent",
        setup: () => ({ v$: useVuelidate() }),
        data(){
            return {
                form: {
                    firstName: '',
                    secondName: '',
                    email: '',
                    password: '',
                },
                submitted: false
            }
        },
        validations () {
            return {
                form: {
                    firstName: { required },
                    secondName: { required },
                    email: { required, email },
                    password: { required, minLength: minLength(6) },
                }
            }
        },
        methods:{
            //user register function and api call
            createUser() {
                this.submitted = true;

                this.v$.$validate();

                if (this.v$.$invalid) {
                    return;
                }

                axios
                    .post('/register', this.form)
                    .then((resp) =>{
                        //reset form after submission
                        this.form.firstName = '';
                        this.form.secondName = '';
                        this.form.email = '';
                        this.form.password = '';
                        //success message alert
                        Swal.fire({
                            title: 'Hurry',
                            text:  "User has been registered successfully",
                            icon: 'success',
                        });
                    })
                    .catch((error) => {
                        Swal.fire({ 
                            title: 'Hurry', 
                            text:  error, 
                            icon: 'warning', });
                    })
            },

        }
    };

</script>

<style scoped>

</style>