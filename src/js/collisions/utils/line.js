import Vector from "./vector.js";

export default class Line {
  constructor({x=0,y=0, dx=0, dy=0}) {
    this.origin = new Vector({x,y});
    this.direction = new Vector({x:dx,y:dy});
  }
}