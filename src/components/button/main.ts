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
    this.initClass()
    this.initEvents()
  }

  private initEvents (): void {
    this.addEventListener('click', (event) => {
      console.log(event)
    })
    this.addEventListener('mousemove', this.initStyles)
  }

  private initNodes (): HTMLElement {
    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.setAttribute('class', 'yui-button')

    const text = this.getAttribute('data-text') as string
    const span = document.createElement('span')
    span.innerText = text
    button.appendChild(span)

    this.shadow.appendChild(button)

    return button
  }

  private initClass (): void {
    const properties = [...this.getAttribute('class')?.split(' ') || []]

    properties.filter(property => property.length > 0).forEach(property => {
      this.shadow.querySelector('.yui-button')?.classList.add(property)
    })
  }

  private initStyles (event: MouseEvent): void {
    const x = event.pageX - this.offsetLeft
    const y = event.pageY - this.offsetTop

    this.style.setProperty('--x', x + 'px') 
    this.style.setProperty('--y', y + 'px')
  }
}

export default customElements.define('yui-button', Button)