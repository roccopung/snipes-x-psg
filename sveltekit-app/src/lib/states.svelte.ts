class FormAnimation {
  finished: boolean = $state(false);
  trigger = () => {
    this.finished = true;
  };
}

export const formAnimation = new FormAnimation();
