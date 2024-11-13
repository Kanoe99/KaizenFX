const ElectronStore ={
    formats: window.electron.store.get('settings.formats'),
    cards: window.electron.store.get('settings.cards'),
}

export {ElectronStore}