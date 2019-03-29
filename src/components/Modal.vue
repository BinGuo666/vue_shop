<template>
    <div>
      <div class="md-modal modal-msg md-modal-transition " v-bind:class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">Login in</div>
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="btn-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
      </div>
      <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
    </div>
</template>

<script>
    export default{
        props:["mdShow"],
        data(){
            return {}
        },
        methods: {
            closeModal(){
                this.$emit("close")
            }
        }
    }
</script>

<style scoped>

  .regi_form_input .icon {
    display: inline-block;
    float: left;
    width: 25px;
    height: 29px;
    margin: 6px 0 0 14px;
    background-position: 4px 5px;
    background-image: url("/static/icon.png");
    background-repeat: no-repeat;
  }
  .regi_form_input .IconPwd {
    background-position: -198px 3px;
  }
  .regi_form_input .regi_login_input{
    position: absolute;
    left:45px;
    top:0;
    padding: 9px 0 10px;
    width: 270px;
    font-size: 14px;
    zoom: 1;
    border: none;
    color: #333;
    /*height: 23px;*/
    line-height: 23px;
    background: 0 0!important;
  }
  .md-title{
    position: absolute;
    top: 14px;
    line-height: 24px;
    padding: 8px 0;
    color: #333;
    font-size: 18px;
    font-weight: 400;
    font-style: normal;
  }
  .login-wrap{
    margin-top:30px;
  }
  .md-content .btn-login{
    display: block;
    height: 38px;
    line-height: 38px;
    border: 2px solid #009de6;
    background: #009de6;
    color: #fff;
    font-size: 18px;
    text-align: center;
  }
  .error-wrap .error{
    font-size: 12px;
    color: #d31723;
    visibility: hidden;
    display: block;
    padding: 0 0 7px 17px;
    line-height: 16px;
    height: 16px;
    text-align: left;
    background: url("/static/icon.png") 0 -100px no-repeat;
  }
  .md-content .error-wrap .error-show{
    visibility: visible;
    height: auto;
  }

</style>
