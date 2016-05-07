function bacon(x) {
  return class Bar extends x {
    name() {
      return 'bar';
    }
  };
}


// Apply the decorator to class Foo...
@bacon
class pork {
  name() {
    return 'foo';
  }
}

const turkey = new pork ();

console.log(turkey.name());