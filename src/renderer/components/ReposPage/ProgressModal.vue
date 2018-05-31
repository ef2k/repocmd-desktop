<template>
  <modal name="progress-modal" :clickToClose="false" height="auto">
    <div class="modal-body">
      <div class="loader">
        <img src="/static/icon128.png" height="64"/>
        <div class="message">
          Archiving...
        </div>
        <div class="count">
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'progress-modal',
  props: [
    'action'
  ]
}
</script>

<style lang="scss" scoped>

@-webkit-keyframes bounce {
  0%, 100% {
    -webkit-transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-7px);
  }
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-7px);
  }
}

.v--modal-overlay {
  background: rgba(0, 0, 0, 0.8)
}

.modal-body {
  background: #F9F9F9;
  padding: 30px;

  .loader {
    grid-template-columns: 75px auto 75px;
    grid-column-gap: 10px;
    display: grid;

    img {
      display: flex;
      align-items: center;

      -webkit-animation-duration: 1.3s;
      animation-duration: 1.3s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      -webkit-animation-timing-function: linear;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      -webkit-animation-iteration-count: infinite;

      -webkit-animation-name: bounce;
      animation-name: bounce;
    }
    .message {
      display: flex;
      align-items: center;
      font-size: 18px;
      strong {
        margin-left: 8px;
      }
    }
    .count {
      display: flex;
      align-items: center;
      font-size: 22px;
      text-align: right;
    }
  }
}
</style>
