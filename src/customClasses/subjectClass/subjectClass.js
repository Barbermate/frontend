class Subject {
    constructor() {
      this.subscribers = [];
    }
  
    subscribe(callback) {
      this.subscribers.push(callback);
      return {
        unsubscribe: () => {
          this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
        }
      };
    }
  
    next(value) {
      this.subscribers.forEach(subscriber => subscriber(value));
    }
  }