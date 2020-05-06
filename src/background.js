browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Hello from the background')
})
browser.contextMenus.create({'id': 'menuFlash',  'title': 'Adicionar ao FlashCard', 'contexts': ['selection']})
