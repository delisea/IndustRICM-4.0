import aesjs from 'aes-js';
var AES = (function () {
    function AES(key, iv) {
        this.key = key;
        this.iv = iv;
        if (this.key == null) {
            this.key = this.random128();
        }
        else {
            this.key = key;
        }
        if (this.iv == null) {
            this.iv = this.random128();
        }
        else {
            this.iv = iv;
        }
    }
    AES.prototype.getKey = function () {
        return this.key;
    };
    AES.prototype.getIV = function () {
        return this.iv;
    };
    AES.prototype.random128 = function () {
        var text = new Array(16);
        for (var i = 0; i < 16; i++) {
            text[i] = Math.floor(Math.random() * 16);
        }
        return text;
    };
    AES.prototype.encrypt = function (str) {
        var textBytes = aesjs.utils.utf8.toBytes(str);
        var aesOfb = new aesjs.ModeOfOperation.ofb(this.key, this.iv);
        var encryptedBytes = aesOfb.encrypt(textBytes);
        // To print or store the binary data, you may convert it to hex
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        return encryptedHex;
    };
    AES.prototype.decrypt = function (data) {
        var encryptedBytes = aesjs.utils.hex.toBytes(data);
        // The output feedback mode of operation maintains internal state,
        // so to decrypt a new instance must be instantiated.
        var aesOfb = new aesjs.ModeOfOperation.ofb(this.key, this.iv);
        var decryptedBytes = aesOfb.decrypt(encryptedBytes);
        // Convert our bytes back into text
        var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
        return decryptedText;
        // "Text may be any length you wish, no padding is required."
    };
    return AES;
}());
export { AES };
//# sourceMappingURL=aes.js.map