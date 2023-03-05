function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.floor(Math.random() * window.innerWidth)}px`;
    star.style.top = `${Math.floor(Math.random() * window.innerHeight)}px`;
    document.body.appendChild(star);
    setTimeout(() => {
      star.remove();
    }, 5000);
  }
  
  setInterval(createStar, 199);
  