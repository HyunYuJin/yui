class Button extends HTMLElement {
  public shadow: ShadowRoot
  constructor () {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('href', 'src/components/button/style.scss')
    this.shadow.appendChild(linkElem)

    this.init()
  }

  private init (): void {
    this.initNodes()
    this.initClasses()
    this.initEvents()
  }

  private initEvents (): void {
    this.addEventListener('click', (event) => {
      console.log(event)
    })
  }

  private initNodes (): HTMLElement {
    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.setAttribute('class', 'yui-button')

    const text = this.getAttribute('data-text') as string
    button.innerText = text

    this.shadow.appendChild(button)

    return button
  }

  private initClasses (): void {
    const classes = [...this.getAttribute('class')?.split(' ') || []] 

    classes.forEach(classs => {
      this.shadow.querySelector('button')?.classList.add(classs)
    })
  }

  private initStyles (): void {
    // 중복되는 스타일은 어떤 기준으로 제거해줄까.. 뭘 우선순위로 적용해주어야할까...
    // primary secondary 이런식이면 가장 마지막에 쓴 스타일로 적용
    const colors = ['primary', 'secondary', 'success', 'warning', 'danger']
    const outlines = ['primary-outline', 'secondary-outline', 'success-outline', 'warning-outline', 'danger-outline']
  }
}

export default customElements.define('yui-button', Button)