class ReconnectingWebSocket {
  constructor(url, callback) {
    this.timeout = null;
    this.ws = null;
    this.connect(url, callback);
  }

  connect(url, callback) {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log('WebSocket opened.');
    };

    this.ws.onmessage = (event) => {
      const results = JSON.parse(event.data);
      callback(results);
    };

    this.ws.onclose = () => {
      // TODO: we could implement a heartbeat to catch 100% of disconnections.
      console.log('WebSocket closed.');
      this.timeout = setTimeout(() => this.connect(url, callback), 5000);
    };
  }

  close() {
    console.log('WebSocket cleanup.');
    if (this.ws !== null) {
      this.ws.onclose = null; // Remove event handler.
      this.ws.close();
      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }
    }
  }
}

export default ReconnectingWebSocket;
