const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const base = characters.length;
function encodeBase62(num){
    if(num==0) return characters[0];

    let encoded = '';
    while(num>0){
        encoded = characters[num % base] + encoded;
        num = Math.floor(num/base);
    }

    return encoded;
}

module.exports = encodeBase62;