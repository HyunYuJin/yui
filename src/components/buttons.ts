interface Nodes {
  [key: string]: HTMLElement | null
}

interface Events {
  [key: string]: CustomEvent
}

class Button extends HTMLElement {
  public shadowRoot: ShadowRoot
  public nodes: Nodes
  public events: Events
  constructor () {
    super()

    this.shadowRoot = this.attachShadow({ mode: 'open' })
    this.nodes = {}
    this.events = {}

    this.render()
    this.init()
  }

  // 감시할 Attributes 등록
  static get observedAttributes () {
    return ['data-text']
  }

  private init (): void {
    this.initNodes()
    this.initEvents()
  }

  private initNodes (): void {
    this.nodes.button = this.shadowRoot.querySelector('button')
    this.nodes.span = this.shadowRoot.querySelector('span')
  }

  private initEvents (): void {
    this.events.click = new CustomEvent('click', {
      bubbles: true,
      detail: { 
        text: this.getAttribute('data-text')
      }
    })
  }

  private connectedCallback (): void {
    this.nodes.button?.addEventListener('click', this.handleClick.bind(this))
    this.nodes.button?.addEventListener('mousemove', this.getEffects.bind(this))
  }

  private disconnectedCallback (): void {
    this.nodes.button?.removeEventListener('click', this.handleClick)
    this.nodes.button?.removeEventListener('mousemove', this.getEffects)
  }

  private adoptedCallback (): void {
    console.log('컴포넌트 다른 페이지로 이동')
  }

  private attributeChangedCallback (name: string, oldValue: string, newValue: string): void {
    if (this.nodes.span) {
      this.nodes.span.innerText = newValue
    }
  }

  private handleClick (): void {
    const random = Math.floor(Math.random() * (50 - 200 + 1) + 200)
    this.setAttribute('data-text', String(random))

    this.dispatchEvent(this.events.click)
  }

  private render (): void {
    this.shadowRoot.innerHTML = this.getTemplate()
  }

  private getTemplate(): string {
    return `
      ${ this.getStyle() }
        <button><span>${ this.getText() }</span></button>
      `
  }

  private getText (): string {
    const text = this.getAttribute('data-text') as string

    return text
  }

  private getEffects (event: MouseEvent): void {
    const x = event.pageX - this.offsetLeft
    const y = event.pageY - this.offsetTop

    this.style.setProperty('--x', x + 'px') 
    this.style.setProperty('--y', y + 'px')
  }
  
  private getStyle (): string {
    return `
      <style>
        @import '/Users/hyeon-yujin/Documents/dev/yui/src/styles/buttons.scss';
      </style>
    `
  }
}

export default customElements.define('yui-button', Button)