interface Window {
  _phantom?: any
  callPhantom?: any
  chrome?: any
}

class AntiDebug {
  private isProduction: boolean
  private debuggerDetected: boolean
  private intervals: NodeJS.Timeout[]

  constructor() {
    // В Next.js на клиенте process.env.NODE_ENV может быть недоступен
    // Используем альтернативный способ определения продакшена
    this.isProduction =
      !window.location.hostname.includes('localhost') &&
      !window.location.hostname.includes('127.0.0.1') &&
      window.location.protocol === 'https:'

    this.debuggerDetected = false
    this.intervals = []

    if (this.isProduction) {
      this.init()
    }
  }

  private init(): void {
    this.disableConsole()
    this.detectDevTools()
    this.preventRightClick()
    this.preventKeyboardShortcuts()
    this.obfuscateDOM()
    this.detectDebugger()
    this.preventSourceView()
    this.clearIntervals()
  }

  // Отключение консоли
  private disableConsole(): void {
    if (this.isProduction) {
      const methods: (keyof Console)[] = [
        'log',
        'debug',
        'info',
        'warn',
        'error',
        'assert',
        'dir',
        'dirxml',
        'group',
        'groupEnd',
        'time',
        'timeEnd',
        'count',
        'trace',
      ]

      methods.forEach((method) => {
        ;(console[method] as any) = function () {}
      })

      // Переопределение console
      Object.defineProperty(window, 'console', {
        value: {},
        writable: false,
      })
    }
  }

  // Обнаружение DevTools
  private detectDevTools(): void {
    const devtools = { open: false, orientation: null }

    const checkInterval = setInterval(() => {
      const heightThreshold = window.outerHeight - window.innerHeight > 200
      const widthThreshold = window.outerWidth - window.innerWidth > 200

      if (heightThreshold || widthThreshold) {
        if (!devtools.open) {
          devtools.open = true
          this.onDevToolsOpen()
        }
      } else {
        devtools.open = false
      }
    }, 500)

    this.intervals.push(checkInterval)

    // Дополнительная проверка через console.profile
    let checkStatus = false
    const profileInterval = setInterval(() => {
      if (typeof console.profile === 'function') {
        console.profile()
        console.profileEnd()
        checkStatus = true
        setTimeout(() => {
          if (checkStatus) {
            this.onDevToolsOpen()
          }
        }, 100)
      }
    }, 1000)

    this.intervals.push(profileInterval)
  }

  // Действия при обнаружении DevTools
  private onDevToolsOpen(): void {
    // Очистка страницы
    document.documentElement.innerHTML = ''

    // Перенаправление
    window.location.href = 'about:blank'

    // Или показ предупреждения
    // alert('Developer tools detected! Access denied.');
  }

  // Блокировка правой кнопки мыши
  private preventRightClick(): void {
    document.addEventListener('contextmenu', (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    })

    // Блокировка выделения текста
    document.addEventListener('selectstart', (e: Event) => {
      e.preventDefault()
      return false
    })

    // Блокировка перетаскивания
    document.addEventListener('dragstart', (e: Event) => {
      e.preventDefault()
      return false
    })
  }

  // Блокировка горячих клавиш
  private preventKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault()
        this.onDevToolsOpen()
        return false
      }

      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault()
        this.onDevToolsOpen()
        return false
      }

      // Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault()
        return false
      }

      // Ctrl+Shift+J
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault()
        return false
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault()
        return false
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault()
        return false
      }

      // Ctrl+A (Select All)
      if (e.ctrlKey && e.keyCode === 65) {
        e.preventDefault()
        return false
      }

      // Ctrl+P (Print)
      if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault()
        return false
      }
    })
  }

  // Обфускация DOM
  private obfuscateDOM(): void {
    // Удаление id и классов для затруднения анализа
    const removeIdentifiers = (): void => {
      const elements = document.querySelectorAll('*[id], *[class]')
      elements.forEach((el: Element) => {
        if (Math.random() > 0.7) {
          el.removeAttribute('id')
          el.removeAttribute('class')
        }
      })
    }

    // Добавление ложных элементов
    const addFakeElements = (): void => {
      for (let i = 0; i < 10; i++) {
        const fakeDiv = document.createElement('div')
        fakeDiv.style.display = 'none'
        fakeDiv.innerHTML = `<!-- fake comment ${Math.random()} -->`
        document.body.appendChild(fakeDiv)
      }
    }

    setTimeout(() => {
      removeIdentifiers()
      addFakeElements()
    }, 2000)
  }

  // Обнаружение debugger
  private detectDebugger(): void {
    const interval = setInterval(() => {
      const start = performance.now()
      debugger
      const end = performance.now()

      if (end - start > 100) {
        this.debuggerDetected = true
        this.onDevToolsOpen()
        clearInterval(interval)
      }
    }, 1000)

    this.intervals.push(interval)
  }

  // Предотвращение просмотра исходного кода
  private preventSourceView(): void {
    // Блокировка Ctrl+U через мета-тег (добавить в <head>)
    const meta = document.createElement('meta')
    meta.httpEquiv = 'Content-Security-Policy'
    meta.content = "default-src 'self'"
    const head = document.getElementsByTagName('head')[0]
    if (head) {
      head.appendChild(meta)
    }

    // Дополнительная защита
    Object.defineProperty(document, 'documentElement', {
      get: () => {
        this.onDevToolsOpen()
        return null
      },
    })
  }

  // Очистка интервалов при закрытии страницы
  private clearIntervals(): void {
    window.addEventListener('beforeunload', () => {
      this.intervals.forEach((interval) => clearInterval(interval))
    })
  }

  // Проверка на автоматизацию
  public detectAutomation(): void {
    // Проверка на Selenium
    if ((navigator as any).webdriver) {
      this.onDevToolsOpen()
    }

    // Проверка на PhantomJS
    if ((window as any)._phantom || (window as any).callPhantom) {
      this.onDevToolsOpen()
    }

    // Проверка на автоматические браузеры
    if ((window as any).chrome && (window as any).chrome.runtime && (window as any).chrome.runtime.onConnect) {
      if (navigator.plugins.length === 0) {
        this.onDevToolsOpen()
      }
    }
  }

  // Обфускация JavaScript кода (базовая)
  public obfuscateCode(): void {
    const scripts = document.getElementsByTagName('script')
    Array.from(scripts).forEach((script: HTMLScriptElement) => {
      if (script.src === '') {
        const originalCode = script.innerHTML
        const obfuscated = btoa(originalCode)
        script.innerHTML = `eval(atob('${obfuscated}'))`
      }
    })
  }

  // Проверка целостности кода
  public integrityCheck(): void {
    const originalHash = this.calculateHash(document.documentElement.outerHTML)

    const integrityInterval = setInterval(() => {
      const currentHash = this.calculateHash(document.documentElement.outerHTML)
      if (currentHash !== originalHash) {
        this.onDevToolsOpen()
      }
    }, 5000)

    this.intervals.push(integrityInterval)
  }

  private calculateHash(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return hash
  }
}

export default AntiDebug
