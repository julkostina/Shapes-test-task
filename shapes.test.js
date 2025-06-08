const { Square, Rectangle, Circle, parseShape, Triangle } = require('./shapes');

describe('Shape classes', () => {
  test('Square area and perimeter', () => {
    const s = new Square(1, 1, 2);
    expect(s.getPerimeter()).toBe(8);
    expect(s.getArea()).toBe(4);
    expect(s.toString()).toBe('Square Perimeter 8.00 Area 4');
  });

  test('Rectangle area and perimeter', () => {
    const r = new Rectangle(4, 3, 1, 1);
    expect(r.getPerimeter()).toBe(10);
    expect(r.getArea()).toBe(6);
    expect(r.toString()).toBe('Rectangle Perimeter 10.00 Area 6');
  });

  test('Circle area and perimeter (rounded)', () => {
    const c = new Circle(0, 0, 1);
    expect(c.getPerimeter()).toBeCloseTo(6.28);
    expect(c.getArea()).toBeCloseTo(3.14);
    expect(c.toString()).toBe('Circle Perimeter 6.28 Area 3.14');
  });

  test('Triangle area and perimeter 1', ()=>{
    const t  = new Triangle(0,1,2,2,1,0);
    expect(t.getPerimeter()).toBeCloseTo(5.89);
    expect(t.getArea()).toBeCloseTo(2);
    expect(t.toString()).toBe('Triangle Perimeter 5.89 Area 2');
  })

  test('Triangle area and perimeter 2', ()=>{
    const t  = new Triangle(0,2,4,4,2,0);
    expect(t.getPerimeter()).toBeCloseTo(11.77);
    expect(t.getArea()).toBeCloseTo(2);
    expect(t.toString()).toBe('Triangle Perimeter 11.77 Area 2');
  })
  test('Invalid square side', () => {
    expect(() => new Square(1, 1, 0)).toThrow("Invalid side");
  });

  test('Invalid rectangle dimensions', () => {
    expect(() => new Rectangle(1, 1, 1, 1)).toThrow("Invalid dimensions");
  });

  test('Invalid circle radius', () => {
    expect(() => new Circle(0, 0, -1)).toThrow("Invalid radius");
  });
});

describe('parseShape()', () => {
  test('Parses a square line', () => {
    const shape = parseShape('Square TopRight 0 0 Side 3');
    expect(shape).toBeInstanceOf(Square);
    expect(shape.getArea()).toBe(9);
  });

  test('Parses a rectangle line', () => {
    const shape = parseShape('Rectangle TopRight 3 3 BottomLeft 1 1');
    expect(shape).toBeInstanceOf(Rectangle);
    expect(shape.getPerimeter()).toBe(8);
  });

  test('Parses a circle line', () => {
    const shape = parseShape('Circle Center 0 0 Radius 2');
    expect(shape).toBeInstanceOf(Circle);
    expect(shape.getArea()).toBeCloseTo(12.57);
  });

  test('Unknown shape throws error', () => {
    expect(() => parseShape('Triangle Point1 0 0')).toThrow("Unknown shape");
  });
});
