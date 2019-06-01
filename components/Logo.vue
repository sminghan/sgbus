<template>
  <div class="VueToNuxtLogo navbar-item">
    <div class="Triangle Triangle--two" />
    <div class="Triangle Triangle--one" />
    <div class="Triangle Triangle--three" />
    <div class="Triangle Triangle--four" />
  </div>
</template>

<style>
.VueToNuxtLogo {
  display: inline-block;
  animation: turn 2s linear forwards 1s;
  transform: rotateX(180deg);
  position: relative;
  overflow: hidden;
  height: 28px; /* 180 (shrink by 0.15555555) */
  width: 38px; /* 245 */
}

.Triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}

.Triangle--one {
  border-left: 16px solid transparent; /* 105 */
  border-right: 16px solid transparent; /* 105 */
  border-bottom: 28px solid #41b883; /* 180 */
}

.Triangle--two {
  top: 5px; /*30*/
  left: 6px; /*35*/
  animation: goright 0.5s linear forwards 3.5s;
  border-left: 13px solid transparent; /* 87.5 */
  border-right: 13px solid transparent; /* 87.5 */
  border-bottom: 23px solid #3b8070; /* 150 */
}

.Triangle--three {
  top: 9px; /*60*/
  left: 6px; /*35*/
  animation: goright 0.5s linear forwards 3.5s;
  border-left: 11px solid transparent; /*70*/
  border-right: 11px solid transparent;/*70*/
  border-bottom: 18px solid #35495e; /*120*/
}

.Triangle--four {
  top: 18px; /*120*/
  left: 11px; /*70*/
  animation: godown 0.5s linear forwards 3s;
  border-left: 5px solid transparent; /*35*/
  border-right: 5px solid transparent; /*35*/
  border-bottom: 9px solid #fff;/*60*/
}

@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes godown {
  100% {
    top: 28px;
  }
}

@keyframes goright {
  100% {
    left: 11px;
  }
}
</style>
