let FINALWORD = [];
let DECRYTPEDWORD = [];
// Function for getting the input for the encrypter
function getInputValue() 
{
    // Selecting the input element and get its value 
    return document.getElementById("inputId").value;
    // Displaying the value
}
// Function for the input value for the decrypter
function getInputValue1() 
{
    // Selecting the input element and get its value 
    return document.getElementById("decryptId").value;
    // Displaying the value
}
// Creates the encrypt function and prints the answer
function doSomething(){
    encrypt_word(getInputValue());
    output1("The encrypted message is " + FINALWORD.join(''));
    
}
// Creates the decrypt function and prints the answer
function doNothing()
{
    decryptWord(getInputValue1());
    output2("The decrypted message is " + DECRYTPEDWORD.join(''));
}
// Function for getting the encryption key
function getEncryptValue() 
{
    let x = document.getElementById("encrypt_count").value;
    return x;

}
// Function for getting the decrypt key
function getDecryptValue() 
{
    let y = document.getElementById("decrypt_count").value;
    return y;

}
// Function for displaying the encrypted message
function output1(content)
{
    document.getElementById("display").innerHTML = content;
}
// Function for displaying the decrypted message
function output2(content)
{
    document.getElementById("display2").innerHTML = content;
}

// Function for decryping a word or phrase, currently not working because the ASCII value is being scrambled weirdly, I need help on this
function decryptWord(word)
{
    for (i = 0, k = word.length; i < k; i++)
    {
        let ASCIIWord1 = word.charCodeAt(i);  
        console.log(getDecryptValue());
        if(ASCIIWord1 >= 32 && ASCIIWord1 <= 64) 
        {
            let m = ASCIIWord1;
            let output_word = String.fromCharCode(m);
            DECRYTPEDWORD.push(output_word);
            console.log(output_word);
        }
        console.log(getDecryptValue());
        console.log(ASCIIWord1);
        if (ASCIIWord1>= 75 - getDecryptValue() && ASCIIWord1<=100 - getDecryptValue())
        {

            let m = ASCIIWord1 + 22  + getDecryptValue() ;
            let output_word = String.fromCharCode(m);
            DECRYTPEDWORD.push(output_word);
            console.log(ASCIIWord1);
        }
        
}
}

// Function for encrypting the word or phrase
function encrypt_word(word)
{
    // Runs the function for each letter of the input
    for (i = 0, n = word.length; i < n; i++)
    {
        // Sets the variable for the ascii code of each letter
        let ASCIIWord = word.charCodeAt(i);  
        // Doesnt change if the word is punctuation or a space
        if(ASCIIWord >= 32 && ASCIIWord <= 64) 
        {
            // turns the ascii value back into a character
            let m = ASCIIWord
            let output_word = String.fromCharCode(m);
            // Pushes the word into the array
            FINALWORD.push(output_word);
            console.log(output_word);
        }
            // changes the letter if it is uppercase
            if (ASCIIWord>= 65 && ASCIIWord<=90)
            {
                // Scrambles the ascii value of the charcter 
                let m = ASCIIWord + 10 - getEncryptValue() ;
                let output_word = String.fromCharCode(m);
                // pushes the character into the array 
                FINALWORD.push(output_word);
                console.log(output_word);
            }
            // Changes the letter if it is lowercase
            if (ASCIIWord>= 97 && ASCIIWord<=122)
            {
                // Scrambles the ascii value of the charcter 
                let m = ASCIIWord - 22 - getEncryptValue() ;
                let output_word = String.fromCharCode(m);
                // pushes the character into the array
                FINALWORD.push(output_word);
                console.log(output_word);
            }
        }
}
