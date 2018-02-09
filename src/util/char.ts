export module Char {

  export function intToChar(n: number) {
    return String.fromCharCode(n + 97);
  }

  export function charToInt(s: string):number {
    // if (s.length != 0) {
    //   throw new Error("string length > 1");
    // }
    return s.charCodeAt(0)-97;
  }

  export function numberArrayToCharCode(arr: number[], sep: string):string {
    return arr.map(Char.intToChar).join(sep);
  }

  export function charCodeToNumberArray(str:string):number[] {
    return Array.from(str).map(charToInt);
  }

}
