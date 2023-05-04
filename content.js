const TICKET_IDENTIFIER = "jira-id-copy-button"

const createTicketButtonIdentifier = ticketId => `${TICKET_IDENTIFIER}-${ticketId}`

const copyIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg")
copyIcon.setAttribute("viewBox", "0 0 24 24")
copyIcon.setAttribute("width", "18px")
copyIcon.setAttribute("height", "18px")

const copySVG = `<path fill="currentColor" d="M16,2H6C4.897,2,4,2.897,4,4v10h2V4h10V2z M18,6H8C6.897,6,6,6.897,6,8v10c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V8C20,6.897,19.103,6,18,6z M18,18H8V8h10V18z"/>`

const checkSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path fill="none" d="M0 0h24v24H0z"/>
<path fill="green" d="M9 16.2l-3.6-3.6L4 14l5 5 10-10-1.4-1.4L9 16.2z"/>
</svg>`

copyIcon.innerHTML = copySVG

const addCopyButton = (ticketNode, ticketId) => {
  const ticketHeader = ticketNode.parentElement

  const copyIconClone = copyIcon.cloneNode(true)
  copyIconClone.style.cursor = "pointer"
  copyIconClone.style.margin = "4px 0 0 0"
  copyIconClone.setAttribute("id", createTicketButtonIdentifier(ticketId))

  copyIconClone.addEventListener("click", event => {
    event.stopPropagation()
    copyToClipboard(ticketId)
    copyIconClone.innerHTML = checkSVG
    setTimeout(() => {
      copyIconClone.innerHTML = copySVG
    }, 1000)
  })

  ticketHeader.appendChild(copyIconClone)
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
}

function makeCopyButtonIfNeeded(idElement) {
  const ticketId = idElement.getAttribute("aria-label")

  const existingCopyElement = document.getElementById(createTicketButtonIdentifier(ticketId))

  if (!!existingCopyElement) {
    return
  }

  addCopyButton(idElement, ticketId)
}

function makeCopyButtons() {
  const elements = document.querySelectorAll(".ghx-key")

  elements.forEach(element => makeCopyButtonIfNeeded(element))
}

function worker() {
  try {
    makeCopyButtons()
  } catch (e) {
    console.log(e)
  }
}

setInterval(worker, 2000)
