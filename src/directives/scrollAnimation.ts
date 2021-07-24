const animatedScrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('enter');
      animatedScrollObserver.unobserve(entry.target);
    }
  });
});

export default {
  bind(el: Element): void {
    el.classList.add('before-enter');
    animatedScrollObserver.observe(el);
  },
};
