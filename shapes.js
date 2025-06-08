// The coding assignment is to write a program that reads from standard input or from a text file and writes to standard output.
// It receives data about different geometrical 2D shapes. For each of them it should calculate perimeter and area.

// Sample input:
// Square TopRight 1 1 Side 1
// Rectangle TopRight 2 2 BottomLeft 1 1
// Circle Center 1 1 Radius 2

// Sample output:
// Square Perimeter 4 Area 1
// Rectangle Perimeter 4 Area 1
// Circle Perimeter 1 Area 2

// Bonus points for:
// - tests
// - code that is easy to extend to add more shapes
// for example “Triangle Point1 5 5 Point2 8 8 Point3 10 2”

// Please do not just get ChatGPT generate the solution for you. We will use this code for the technical interview and build on it. So it is very important you write it yourself and understand it fully. The goal is not to write the perfect code but have something we can use for live coding in the interview.

// There is no rush with this task, you can take your time. Hopefully it is not very complicated. :)

class Shape {
  constructor(name) {
    this.name = name;
  }

  getPerimeter() {
    throw new Error("Not implemented perimeter function");
  }

  getArea() {
    throw new Error("Not implemented area function");
  }

  toString() {
    return `${
      this.name
    } Perimeter ${this.getPerimeter()} Area ${this.getArea()}`;
  }
}

class Rectangle extends Shape {
  constructor(topRightX, topRightY, bottomLeftX, bottomLeftY) {
    super("Rectangle");
    this.height = Math.abs(topRightX - bottomLeftX);
    this.width = Math.abs(topRightY - bottomLeftY);
    if (this.height <= 0 || this.width <= 0) {
      throw new Error(
        `Invalid dimensions for rectangle: height ${this.height}, width ${this.width}`
      );
    }
  }

  getPerimeter() {
    return 2 * (this.height + this.width);
  }

  getArea() {
    return this.height * this.width;
  }
}

class Square extends Rectangle {
  constructor(topRightX, topRightY, side) {
    if (!side || side <= 0) {
      throw new Error(`Invalid side length for a square`);
    }
    super(
      topRightX,
      topRightY,
      topRightX - side,
      topRightY - side
    );
    this.side = side;
    this.name='Square';
  }
}

class Circle extends Shape {
  constructor(centerX, centerY, radius) {
    super("Circle");
    if (!radius || radius <= 0) {
      throw new Error(`Invalid radius for circle: ${radius}`);
    }
    this.radius = radius;
    if (centerX === undefined || centerY === undefined) {
      throw new Error(
        `Invalid center coordinates for circle: (${centerX}, ${centerY})`
      );
    }
  }

  getPerimeter() {
    return +(2 * Math.PI * this.radius).toFixed(2);
  }

  getArea() {
    return +(Math.PI * this.radius ** 2).toFixed(2);
  }
}

function parseShape(line) {
  const tokens = line.trim().split(/\s+/);
  const shapeType = tokens[0];

  switch (shapeType.toLowerCase()) {
    case "square":
      return new Square(
        parseFloat(tokens[2]),
        parseFloat(tokens[3]),
        parseFloat(tokens[5])
      );
    case "rectangle":
      return new Rectangle(
        parseFloat(tokens[2]),
        parseFloat(tokens[3]),
        parseFloat(tokens[5]),
        parseFloat(tokens[6])
      );
    case "circle":
      return new Circle(
        parseFloat(tokens[2]),
        parseFloat(tokens[3]),
        parseFloat(tokens[5])
      );
    default:
      throw new Error(`Unknown shape: ${shapeType}`);
  }
}

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", function (line) {
  try {
    const shape = parseShape(line);
    console.log(shape.toString());
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
});

module.exports = { Square, Rectangle, Circle, parseShape };
