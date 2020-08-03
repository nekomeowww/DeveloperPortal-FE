<template>
    <div style="height: 100%;">
      <Header
        :showLoginBtn="!isLoggedIn"
      />
      <div class="wrapper" style="display: flex; align-items: center; justify-content: center;">
        <img src="@/assets/img/landing-img.png" class="kv"/>
        <div class="text">
          <h1>开发 Develope<br>
            <span class="container">
              <span class="word">创造力 Creativity</span>
              <span class="word">集成性 Integration</span>
              <span class="word">实用性 Accessibilities</span>
              <span class="word">想象力 Imagination</span>
              <span class="word">合作力 Corporative</span>
              <span class="word">互通性 Interoperability</span>
            </span>
          </h1>
          <a href="https://github.com/Matataki-io/DeveloperPortal-FE">
            <div class="start">
            开始 Get Started
            </div>
          </a>
        </div>
      </div>
      <Footer />
    </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { mapState, mapActions } from 'vuex'

import { getCookie, disassemble } from '../util/cookie'

export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['isLoggedIn'])
  },
  methods: {
    ...mapActions(['setLoggedIn'])
  },
  mounted () {
    const c = getCookie('ACCESS-TOKEN')
    if (c) {
      const res = disassemble(c)
      res.status = true
      this.setLoggedIn(res)
    }

    let words = document.getElementsByClassName('word')
    let wordArray = []
    let currentWord = 0

    words[currentWord].style.opacity = 1
    for (let i = 0; i < words.length; i++) {
      splitLetters(words[i])
    }

    function changeWord () {
      let cw = wordArray[currentWord]
      let nw = currentWord === words.length - 1 ? wordArray[0] : wordArray[currentWord + 1]
      for (let i = 0; i < cw.length; i++) {
        animateLetterOut(cw, i)
      }

      for (let j = 0; j < nw.length; j++) {
        nw[j].className = 'letter behind'
        nw[0].parentElement.style.opacity = 1
        animateLetterIn(nw, j)
      }

      currentWord = (currentWord === wordArray.length - 1) ? 0 : currentWord + 1
    }

    function animateLetterOut (cw, i) {
      setTimeout(function () {
        cw[i].className = 'letter out'
      }, i * 45)
    }

    function animateLetterIn (nw, i) {
      setTimeout(function () {
        nw[i].className = 'letter in'
      }, 340 + (i * 45))
    }

    function splitLetters (word) {
      let content = word.innerHTML
      word.innerHTML = ''
      let letters = []
      for (let i = 0; i < content.length; i++) {
        let letter = document.createElement('span')
        letter.className = 'letter'
        letter.innerHTML = content.charAt(i)
        word.appendChild(letter)
        letters.push(letter)
      }

      wordArray.push(letters)
    }

    changeWord()
    this.theInterval = setInterval(changeWord, 3500)
  },
  destroyed () {
    clearInterval(this.theInterval)
  }
}
</script>

<style>
a {
  text-decoration: none;
}
body {
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.wrapper {
  height: 85%;
}

.text {
  width: 700px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
.text h1 {
  margin: 0;
  letter-spacing: -.15rem;
  font-size: 5rem;
  font-weight: 400;
}
.text h1 .container {
  margin: 1rem;
  position: relative;
}
.text h1 .container .word {
  text-rendering: optimizeLegibility !important;
  white-space: pre;
  left: 50%;
  transform: translate(-50%, -10%);
  opacity: 0;
  display: block;
  top: 0;
  position: absolute;
}
.start {
  text-decoration: none;
  margin-top: 2rem;
  position: relative;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  border: 2px solid #542DE0;
  color: #542DE0;
}

.start:hover {
  background-color: #E0D9F9;
}

.word {
  color: #542DE0;
  font-weight: 800;
}

.kv {
  height: 486px;
  margin-right: 0.5rem;
}

.footer {
  position: absolute;
  bottom: 0px;
  width: 100%;
  left: 0;
}

@media screen and (min-height: 300px) {
  .wrapper {
    font-size: 13px;
  }
}
@media screen and (min-height: 900px) {
  .wrapper {
    font-size: 20px;
  }
}
@media screen and (min-height: 1200px) {
  .wrapper {
    font-size: 32px;
  }
}

@media screen and (min-width: 1000px) {
  .wrapper {
    font-size: 24px;
  }
}

@media screen and (max-width: 400px) {
  .text h1 {
    font-size: 1rem;
  }
}

@media screen and (max-width: 600px) {
  .text h1 {
    font-size: 2rem;
  }

  .start {
    margin-top: 1.4rem;
    font-size: 0.8rem;
  }

  .text {
    height: 20vh;
  }

  .kv {
    height: 200px;
  }
}

@media screen and (max-width: 1000px) {
  .text h1 {
    font-size: 2rem;
  }
}

@media screen and (max-width: 1200px) {
  .kv {
    width: 50%;
    height: 35%;
    margin-right: 0;
    object-fit: scale-down;
  }

  .start {
    font-size: 1rem;
  }

  .wrapper {
    flex-direction: column;
    justify-content: center;
  }

  .text {
    font-size: 3rem !important;
    height: 20vh;
    width: 100%;
  }

  body {
    overflow: auto;
  }

  .footer {
    position: relative;
  }
}

.letter {
  text-rendering: optimizeLegibility !important;
  display: inline-block;
  position: relative;
  transform: translateZ(25px);
  transform-origin: 50% 50% 25px;
}

.letter.out {
  transform: rotateX(90deg);
  transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.letter.behind {
  transform: rotateX(-90deg);
}

.letter.in {
  transform: rotateX(0deg);
  transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@-webkit-keyframes opacity {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
@-webkit-keyframes change {
  0%, 12.66%, 100% {
    transform: translate3d(0, 0, 0);
  }
  16.66%, 29.32% {
    transform: translate3d(0, -25%, 0);
  }
  33.32%,45.98% {
    transform: translate3d(0, -50%, 0);
  }
  49.98%,62.64% {
    transform: translate3d(0, -75%, 0);
  }
  66.64%,79.3% {
    transform: translate3d(0, -50%, 0);
  }
  83.3%,95.96% {
    transform: translate3d(0, -25%, 0);
  }
}
@-o-keyframes opacity {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
@-o-keyframes change {
  0%, 12.66%, 100% {
    transform: translate3d(0, 0, 0);
  }
  16.66%, 29.32% {
    transform: translate3d(0, -25%, 0);
  }
  33.32%,45.98% {
    transform: translate3d(0, -50%, 0);
  }
  49.98%,62.64% {
    transform: translate3d(0, -75%, 0);
  }
  66.64%,79.3% {
    transform: translate3d(0, -50%, 0);
  }
  83.3%,95.96% {
    transform: translate3d(0, -25%, 0);
  }
}
@-moz-keyframes opacity {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
@-moz-keyframes change {
  0%, 12.66%, 100% {
    transform: translate3d(0, 0, 0);
  }
  16.66%, 29.32% {
    transform: translate3d(0, -25%, 0);
  }
  33.32%,45.98% {
    transform: translate3d(0, -50%, 0);
  }
  49.98%,62.64% {
    transform: translate3d(0, -75%, 0);
  }
  66.64%,79.3% {
    transform: translate3d(0, -50%, 0);
  }
  83.3%,95.96% {
    transform: translate3d(0, -25%, 0);
  }
}
@keyframes opacity {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
@keyframes change {
  0%, 12.66%, 100% {
    transform: translate3d(0, 0, 0);
  }
  16.66%, 29.32% {
    transform: translate3d(0, -25%, 0);
  }
  33.32%,45.98% {
    transform: translate3d(0, -50%, 0);
  }
  49.98%,62.64% {
    transform: translate3d(0, -75%, 0);
  }
  66.64%,79.3% {
    transform: translate3d(0, -50%, 0);
  }
  83.3%,95.96% {
    transform: translate3d(0, -25%, 0);
  }
}
@keyframes gradient {
  0% {
    background-position-y: 100vh;
  }
  100% {
    background-position-y: -100vh;
  }
}
@keyframes grain {
  0% {
    -webkit-transform: translate(-10%, 10%);
    -moz-transform: translate(-10%, 10%);
    transform: translate(-10%, 10%);
  }
  10% {
    -webkit-transform: translate(-25%, 0%);
    -moz-transform: translate(-25%, 0%);
    transform: translate(-25%, 0%);
  }
  20% {
    -webkit-transform: translate(-30%, 10%);
    -moz-transform: translate(-30%, 10%);
    transform: translate(-30%, 10%);
  }
  30% {
    -webkit-transform: translate(-30%, 30%);
    -moz-transform: translate(-30%, 30%);
    transform: translate(-30%, 30%);
  }
  40% {
    -webkit-transform: translate();
    -moz-transform: translate();
    transform: translate();
  }
  50% {
    -webkit-transform: translate(-15%, 10%);
    -moz-transform: translate(-15%, 10%);
    transform: translate(-15%, 10%);
  }
  60% {
    -webkit-transform: translate(-20%, 20%);
    -moz-transform: translate(-20%, 20%);
    transform: translate(-20%, 20%);
  }
  70% {
    -webkit-transform: translate(-5%, 20%);
    -moz-transform: translate(-5%, 20%);
    transform: translate(-5%, 20%);
  }
  80% {
    -webkit-transform: translate(-25%, 5%);
    -moz-transform: translate(-25%, 5%);
    transform: translate(-25%, 5%);
  }
  90% {
    -webkit-transform: translate(-30%, 25%);
    -moz-transform: translate(-30%, 25%);
    transform: translate(-30%, 25%);
  }
  100% {
    -webkit-transform: translate(-10%, 10%);
    -moz-transform: translate(-10%, 10%);
    transform: translate(-10%, 10%);
  }
}

</style>
