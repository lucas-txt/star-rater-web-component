
class Stars extends HTMLElement {
  stars = [];
  starsAmount;
  fixedStar;
  
  constructor() {
     super()
     
     this.biuld()
  }

  biuld() {
     this.attachShadow({mode: "open"})

     this.setDefaultState()
     this.insertStyle()
     this.createStars()
     this.createBaseTag()
  }

  setDefaultState() {
     const starsAmount = this.getAttribute('stars-amount')
     starsAmount? this.starsAmount = starsAmount : this.starsAmount = 5

     const starsValue = this.getAttribute('star-rating')
     this.fixedStar = starsValue
  }

  insertStyle() {
     const style = document.createElement("style")
     style.textContent =`
        div {
           height: 50px;
           width: ${this.starsAmount * 50}px;

           display: flex;
           flex-direction: row;
           justify-content: space-evenly;
           align-items: center;
        }

        [class^="star"] {
           display: block;
           height: 95%;
           width: ${((100 / this.starsAmount)/100)*95}%;
           background-color: gray;

           clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }
     `

     this.shadowRoot.appendChild(style)
  }

  createStars() {
     const newStar = (_, c) => {
        const star = document.createElement("span")
        star.setAttribute("class", `star-${c+1}`)
        
        return star
     }

     this.stars = Array.from({ length: this.starsAmount}, newStar)

     this.activateStars()
     this.turnStarsColor()
  }
  activateStars() {
     const setRateEvent = (star, event, index) => {
        star.addEventListener(event, () => {
           index ? 
              this.setAttribute("star-rating", `${index}`):
              this.setAttribute("star-rating", `${this.fixedStar}`)
           this.turnStarsColor()
        })
     }

     const fixRateEvent = (star, index) => {
        star.addEventListener('click', () => {
           this.fixedStar == index+1?
              this.fixedStar = -1 :
              this.fixedStar = index+1
        })
     }

     this.stars.forEach((star, index) => {
        fixRateEvent(star, index)
        setRateEvent(star, 'mouseout')
        setRateEvent(star, 'mouseenter', index+1)
     })
  }
  turnStarsColor()  {
     const index = this.getAttribute('star-rating')
     for (let i = 0; i <= this.stars.length-1; i++ ) {
        if (i < index) {
           this.stars[i].style.backgroundColor = "yellow"
        } else {
           this.stars[i].style.backgroundColor = "gray"
        }
     }
  }

  createBaseTag() {
     const base = document.createElement("div")

     this.stars.forEach(element => {
        base.appendChild(element) 
     })

     this.shadowRoot.appendChild(base)
  }
  
}
customElements.define("star-rater", Stars)
