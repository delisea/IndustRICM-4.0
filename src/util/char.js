export var Char;
(function (Char) {
    function intToChar(n) {
        return String.fromCharCode(n + 97);
    }
    Char.intToChar = intToChar;
    function charToInt(s) {
        // if (s.length != 0) {
        //   throw new Error("string length > 1");
        // }
        return s.charCodeAt(0) - 97;
    }
    Char.charToInt = charToInt;
    function numberArrayToCharCode(arr, sep) {
        return arr.map(Char.intToChar).join(sep);
    }
    Char.numberArrayToCharCode = numberArrayToCharCode;
    function charCodeToNumberArray(str) {
        return Array.from(str).map(charToInt);
    }
    Char.charCodeToNumberArray = charCodeToNumberArray;
})(Char || (Char = {}));
//# sourceMappingURL=char.js.map