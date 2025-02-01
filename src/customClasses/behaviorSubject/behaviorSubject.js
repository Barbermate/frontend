class BehaviorSubject extends Subject {
  constructor(initialValue) {
    super();
    this.value = initialValue;
  }

  subscribe(callback) {
    // Emit the current value immediately upon subscription
    callback(this.value);
    return super.subscribe(callback);
  }

  next(value) {
    this.value = value;
    super.next(value);
  }

  getValue() {
    return this.value;
  }
}
