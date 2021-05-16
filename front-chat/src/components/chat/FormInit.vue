<template>
    <div class="container">
        <div class="row" v-if="!isEmpty(enterprise)">
            <div class="col-12">
                Por favor dejanos conocerte :)
            </div>
            <div class="offset-1 col-10 my-2">
                <b-form-input v-model="form.name.data" type="text" :state="form.name.state" placeholder="Enter your name"></b-form-input>
            </div>
            <div class="offset-1 col-10 my-2">
                <b-form-input v-model="form.email.data" type="email" :state="form.email.state" placeholder="Enter your Email" ></b-form-input>
            </div>
            <div class="offset-1 col-10 my-2">
                <b-form-textarea
                    id="textarea"
                    v-model="form.request.data"
                    :state="form.request.state"
                    placeholder="What is your request?"
                    rows="3"
                    max-rows="6"
                ></b-form-textarea>  
            </div>
            <div class="offset-1 col-10 my-2">
                <b-button size="lg" @click="sendData">
                    Send <b-icon icon="cursor-fill" variant="dark" ></b-icon>
                    </b-button> 
            </div>
            <div class="col-12" v-if="errors.show">
                {{errors.data}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{

        token:{
            type: String,
            default: "",
        }
    },
    data(){
        return {
            showForm:   false,
            errors: {
                show:false,
                data:""
            },
            enterprise: {},
            form:{
                name:{
                    data:"",
                    state:null
                },
                email:{
                    data:"",
                    state:null
                },
                request:{
                    data:"",
                    state:null
                }
            },
        } 
    },
    mounted() {
        this.getEnterprise()
    },
    methods: {
        isEmpty(enterprise){
            return Object.keys(enterprise).length === 0
        },
        ValidateEmail(email = "") {
            //eslint-disable-next-line
            let mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
            return (email === "")? false : (email.match(mailformat)) ? true : false;
        },
        getEnterprise(){
            this.axios.post('/identification',{
                token:this.token
            }).then(res=>{
                //console.log(res)
                this.enterprise = res.data.body
            }).catch(e=>{
                console.log(e)
            })
        },
        async sendData(){
            let validate = 0
            if(this.form.name.data !== "") {
                validate++
                this.form.name.state = true
            } else {
                this.form.name.state = false
            }
            if(this.ValidateEmail(this.form.email.data)){
                validate++
                this.form.email.state = true
            } else {
                this.form.email.state = false
            }

            if(this.form.request.data !== ""){
                validate++
                this.form.request.state = true
            } else {
                this.form.request.state = false
            }
            if(validate === 3){
                const message = {
                    enterprise: this.enterprise._id,
                    name: this.form.name.data,
                    email: this.form.email.data,
                    role: "Client"
                }
                let res
                try{
                    res = await this.axios.post(`/user`, message, {
                        headers: {'Authorization': this.token }
                    })
                }   catch(e)    {
                    console.log(e)
                    return
                }

                if(res.data.body === "Faltan datos" || res.data.body === "Id invalido" || res.data.body === "No existe empresa"){
                    this.errors.show = true,
                    this.errors.data = "Registro incorrecto de datos - comunicar a soporte tecnico"
                    return
                } 

                let res2
                const message2= {
                    enterprise: this.enterprise._id,
                    request: this.form.request.data,
                    user: res.data.body._id
                }
                try{
                    res2 = await this.axios.post(`/room`, message2, {
                        headers: {'Authorization': this.token }
                    })
                }   catch(e)    {
                    console.log(e)
                    return
                }

                if(res2.data.body === "missing data" || res.data.body === "invalid id - user or enterprise" || res.data.body === "not exist enterprise or user"){
                    this.errors.show = true,
                    this.errors.data = res2.data.body
                    return
                }   else    {
                    const toEmit = {
                        user: {...res.data.body},
                        room: {...res2.data.body}
                    }
                    this.$emit("registered",toEmit)
                }
                
                /*
                this.axios.post(`/user`, message, {
                    headers: {'Authorization': this.token }
                }).then(result => {
                    if(result.data.body === "Faltan datos" || result.data.body === "Id invalido" || result.data.body === "No existe empresa"){
                        this.errors.show = true,
                        this.errors.data = "Registro incorrecto de datos - comunicar a soporte tecnico"
                    }   else    {
                        this.$emit("registered",result)
                    }      
                }).catch(e => {
                    console.log(e)
                })*/
            }
        }
    },
}
</script>