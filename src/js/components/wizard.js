class BRWizard {
  constructor ( name, component ) {
    this.name = name;
    this.component = component;
    //DOM elements
    this.DOMstrings = {
      stepsBtnClass: 'wizard-progress-btn',
      stepsBtns: document.querySelectorAll(`.wizard-progress-btn`),
      stepsBar: document.querySelector('.wizard-progress'),
      stepsForm: document.querySelector('.wizard-form'),
      stepFormPanelClass: 'wizard-panel',
      stepFormPanels: document.querySelectorAll('.wizard-panel'),
      stepPrevBtnClass: 'wizard-btn-prev',
      stepNextBtnClass: 'wizard-btn-next' 
    };
    //remove class from a set of items
    this.removeClasses = (elemSet, className) => {
      elemSet.forEach(elem => {
        elem.classList.remove(className);
      });
    };

    //return exect parent node of the element
    this.findParent = (elem, parentClass) => {
      let currentNode = elem;
      while (!currentNode.classList.contains(parentClass)) {
        currentNode = currentNode.parentNode;
      }
      return currentNode;
    };

    //get active button step number
    this.getActiveStep = elem => {
      return Array.from(this.DOMstrings.stepsBtns).indexOf(elem);
    };

    //set all steps before clicked (and clicked too) to active
    this.setActiveStep = activeStepNum => {

      //remove active state from all the state
      this.removeClasses(this.DOMstrings.stepsBtns, 'is-active');
      this.removeClasses(this.DOMstrings.stepsBtns, 'is-inactive');

      //set picked items to active
      this.DOMstrings.stepsBtns.forEach((elem, index) => {

        if (index == activeStepNum) {
          elem.classList.add('is-active');
        }
        if (index < activeStepNum) {
          elem.classList.add('is-inactive');
        }

      });
    };

    //get active panel
    this.getActivePanel = () => {

      let activePanel;

      this.DOMstrings.stepFormPanels.forEach(elem => {

        if (elem.classList.contains('is-active')) {

          activePanel = elem;

        }

      });

      return activePanel;

    };

    //open active panel (and close unactive panels)
    this.setActivePanel = activePanelNum => {

      //remove active class from all the panels
      this.removeClasses(this.DOMstrings.stepFormPanels, 'is-active');

      //show active panel
      this.DOMstrings.stepFormPanels.forEach((elem, index) => {
        if (index === activePanelNum) {

          elem.classList.add('is-active');

          this.setFormHeight(elem);

        }
      });

    };

    //set form height equal to current panel height
    this.formHeight = activePanel => {
      const activePanelHeight = activePanel.offsetHeight;
      this.DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;

    };

    this.setFormHeight = () => {
      const activePanel = this.getActivePanel();
      this.formHeight(activePanel);
    };


    this._setBehavior()  
  }

  _setBehavior( ){
    //STEPS BAR CLICK FUNCTION
    this.DOMstrings.stepsBar.addEventListener('click', e => {

      //check if click target is a step button
      const eventTarget = e.target;

      if (!eventTarget.classList.contains(`${this.DOMstrings.stepsBtnClass}`)) {
        return;
      }

      //get active button step number
      const activeStep = this.getActiveStep(eventTarget);

      //set all steps before clicked (and clicked too) to active
      this.setActiveStep(activeStep);

      //open active panel
      this.setActivePanel(activeStep);

      
      //SETTING PROPER FORM HEIGHT ONLOAD
      window.addEventListener('load', this.setFormHeight, false);

      //SETTING PROPER FORM HEIGHT ONRESIZE
      window.addEventListener('resize', this.setFormHeight, false);
    });

    //PREV/NEXT BTNS CLICK
    this.DOMstrings.stepsForm.addEventListener('click', e => {

      const eventTarget = e.target;

      //check if we clicked on `PREV` or NEXT` buttons
      if (!(eventTarget.classList.contains(`${this.DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${this.DOMstrings.stepNextBtnClass}`)))
      {
        return;
      }

      //find active panel
      const activePanel = this.findParent(eventTarget, `${this.DOMstrings.stepFormPanelClass}`);

      let activePanelNum = Array.from(this.DOMstrings.stepFormPanels).indexOf(activePanel);

      //set active step and active panel onclick
      if (eventTarget.classList.contains(`${this.DOMstrings.stepPrevBtnClass}`)) {
        activePanelNum--;

      } else {

        activePanelNum++;

      }

      this.setActiveStep(activePanelNum);
      this.setActivePanel(activePanelNum);

    });
  }
}

let wizardList = []
for (let brWizard of window.document.querySelectorAll( ".br-wizard")) {
  wizardList.push(new BRWizard('br-wizard', brWizard ))
}
export default BRWizard