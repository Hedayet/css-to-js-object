const copyToClipboard = id => {
  const str = document.getElementById(id).value
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const convert = () => {
  let inp = document.getElementById('inp').value
  inp = inp.replace(/^\s+|\s+$/g, '')
  const re = /(style\ *=\ *)?\"*\'*([^'"]*)/
  const elems = re.exec(inp)
  let stylePrefix = elems[1] ? 'style=' : ''
  const attrs = conquer(elems[2])
  let rets = []
  for (let k in attrs) {
    rets.push(dashedToCamelCase(k) + ': "' + attrs[k] + '"')
  }

  document.getElementById('out').value =
    stylePrefix + '{{ ' + rets.join(', ') + ' }}'
  return false
}

const conquer = styleString => {
  let styles = {}
  if (!styleString) {
    return styles
  }
  const attrs = styleString.split(';')
  for (i in attrs) {
    if (attrs.hasOwnProperty(i)) {
      let attr = attrs[i]
      if (!attr) continue
      const lst = attr.split(':')
      styles[lst[0].trim()] = lst[1].trim()
    }
  }
  return styles
}

const dashedToCamelCase = str => {
  let ret = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] == '-') {
      if (i < str.length-1) {
        ret += str[i+1].toUpperCase()
        i++
      }
      continue
    }
    ret += str[i]
  }
  return ret
}

