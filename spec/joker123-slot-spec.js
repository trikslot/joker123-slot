'use babel';

import Joker123Slot from '../lib/joker123-slot';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Joker123Slot', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('joker123-slot');
  });

  describe('when the joker123-slot:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.joker123-slot')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'joker123-slot:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.joker123-slot')).toExist();

        let joker123SlotElement = workspaceElement.querySelector('.joker123-slot');
        expect(joker123SlotElement).toExist();

        let joker123SlotPanel = atom.workspace.panelForItem(joker123SlotElement);
        expect(joker123SlotPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'joker123-slot:toggle');
        expect(joker123SlotPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.joker123-slot')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'joker123-slot:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let joker123SlotElement = workspaceElement.querySelector('.joker123-slot');
        expect(joker123SlotElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'joker123-slot:toggle');
        expect(joker123SlotElement).not.toBeVisible();
      });
    });
  });
});
