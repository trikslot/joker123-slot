'use babel';

import Joker123SlotView from './joker123-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  joker123SlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.joker123SlotView = new Joker123SlotView(state.joker123SlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.joker123SlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'joker123-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.joker123SlotView.destroy();
  },

  serialize() {
    return {
      joker123SlotViewState: this.joker123SlotView.serialize()
    };
  },

  toggle() {
    console.log('Joker123Slot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
