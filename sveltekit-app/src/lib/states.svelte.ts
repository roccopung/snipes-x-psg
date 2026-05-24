class FormAnimation {
  finished: boolean = $state(false);
  trigger = () => {
    this.finished = true;
  };
  reset = () => {
    this.finished = false;
  };
}

export const formAnimation = new FormAnimation();
