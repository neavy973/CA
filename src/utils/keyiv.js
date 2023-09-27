let library = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var tempKey = "";
for (var i = 0; i < 16; i++) {
    let randomPoz = Math.floor(Math.random() * library.length);
    tempKey += library.substring(randomPoz, randomPoz + 1);
}
const key = tempKey

var tempIv = "";
for (var i = 0; i < 16; i++) {
    let randomPoz = Math.floor(Math.random() * library.length);
    tempIv += library.substring(randomPoz, randomPoz + 1);
}
const iv = tempIv

export default {
    key,
    iv
}