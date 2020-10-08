class Spinner {
  loadingDoc = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  // loadingDoc = ["▏", "▎", "▍", "▌", "▋", "▊", "▉", "▊", "▋", "▌", "▍", "▎"];
  index = 0;
  timer = null;
  start(desc) {
    this.timer = setInterval(() => {
      process.stdout.write(
        `\r${this.loadingDoc[this.index++ % this.loadingDoc.length]} ${desc}...`
      );
      // process.stdout.clearLine()
    }, 300);
  }
  stop() {
    clearInterval(this.timer);
    process.stdout.write('\n')
    // console.clear()
  }
}

module.exports = Spinner;
