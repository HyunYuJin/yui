class Button extends HTMLElement {
  public shadowRoot: ShadowRoot
  constructor () {
    super()

    this.shadowRoot = this.attachShadow({ mode: 'open' })

    this.render()
  }

  private init (): void {
    this.initEvents()
  }

  private initEvents (): void {
    this.addEventListener('click', (event) => {
      console.log(event)
    })
    this.addEventListener('mousemove', this.initStyles)
  }

  private initStyles (event: MouseEvent): void {
    const x = event.pageX - this.offsetLeft
    const y = event.pageY - this.offsetTop

    this.style.setProperty('--x', x + 'px') 
    this.style.setProperty('--y', y + 'px')
  }


  private render () {
    this.shadowRoot.innerHTML = this.initTemplate()
  }

  private initTemplate(): string {
    return `
      ${ this.getStyle() }
        <button><span>${ this.getText() }</span></button>
      `
  }

  private getText (): string {
    const text = this.getAttribute('data-text') as string

    return text
  }
  
  private getStyle () {
    return `
      <style>
        @import '/Users/hyeon-yujin/Documents/dev/yui/src/styles/buttons.scss';
      </style>
    `
  }
}

export default customElements.define('yui-button', Button)