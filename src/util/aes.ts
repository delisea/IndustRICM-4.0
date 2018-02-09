import aesjs from 'aes-js';

export class AES {

  constructor(
    private key?: number[],
    private iv?: number[]
   ) {
     if(this.key == null){
       this.key = this.random128();
     }
     else{
      this.key = key;
     }
     if(this.iv == null){
       this.iv = this.random128();
     }
     else{
      this.iv = iv;
     }

  }

  public getKey() {
    return this.key;
  }

  public getIV() {
    return this.iv;
  }

  public random128(): number[] {
    var text: number[] = new Array(16);
    for (var i = 0; i < 16; i++) {
      text[i] = Math.floor(Math.random() * 16);
    }
    return text;
  }

  public encrypt(str: string) {

    var textBytes = aesjs.utils.utf8.toBytes(str);

    var aesOfb = new aesjs.ModeOfOperation.ofb(this.key, this.iv);
    var encryptedBytes = aesOfb.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;

  }

  public decrypt(data): string {

    var encryptedBytes = aesjs.utils.hex.toBytes(data);

    // The output feedback mode of operation maintains internal state,
    // so to decrypt a new instance must be instantiated.
    var aesOfb = new aesjs.ModeOfOperation.ofb(this.key, this.iv);
    var decryptedBytes = aesOfb.decrypt(encryptedBytes);

    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
    // "Text may be any length you wish, no padding is required."
  }

}
