// Points assigned to each letter of the alphabet
let POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];
let VOWELS = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0];
word1 = prompt("Player 1: ");
word2 = prompt("Player 2: ");

    // Score both words
    let score1 = compute_score(word1);
    let score2 = compute_score(word2);
    
    // Check both words

    // Win conditions for each of the results
    if (is_word(word1) == false)
        {
            console.log("Hey Player 1, thats not a word!");
            console.log(is_word(word1));
            console.log(is_letter(word1));
            console.log(is_vowel(word1));        
        }
    if (is_word(word2) == false)
        {
            console.log("Hey Player 2, thats not a word!");
            console.log(is_word(word2));
            console.log(is_letter(word2));
            console.log(is_vowel(word2));
        }
    if (score1 > score2 && is_word(word1) == true && is_word(word2) == true)
    {
        console.log("Player 1 Wins!");
        console.log("Player 1 got " + score1 + " points! ");
        console.log(is_word(word1));
        console.log(is_letter(word1));
        console.log(is_vowel(word1));
        
        
    }
    if (score2 > score1 && is_word(word1) == true && is_word(word2) == true)
    {
        console.log("Player 2 Wins!");
        console.log("Player 2 got " + score2 + " points! ");
        console.log(is_word(word2));
        console.log(is_letter(word2));
        console.log(is_vowel(word2));
    }
    if (score1 == score2 && is_word(word1) == true && is_word(word2) == true)
    {
        console.log("You Tied!");
        console.log("You both got " + score1 + " points! ");
        console.log(is_word(word1));
        console.log(is_letter(word1));
        console.log(is_vowel(word1));
    }
    


// Function for getting the score of the input
function compute_score(word)
{
    // Sets variable for score of the word
    let z = 0;
    // Sets how many times the fucntion will run, 1 for each lettin in the input
    for (i = 0, n = word.length; i < n; i++)
    {
        var ASCIIWord = word.charCodeAt(0);
        // adds points to z variable if the letter is lowercase
        if (ASCIIWord >= 97 && ASCIIWord <= 122)
        {
            // Subtracts 97 from the ASCII value of the input to put each letter where they would in the array
            let m = ASCIIWord - 97;
            // adds the point value from the array to the score
            z += POINTS[m];
        }
        // adds points to z variable if the letter is uppercase
         if (ASCIIWord >= 65 && ASCIIWord <= 90)
        {
            // Subtracts 65 from the ASCII value of the input to put each letter where they would in the array
            let m = ASCIIWord - 65;
            // adds the point value from the array to the score
            z += POINTS[m];
        }
    }
    // sets the value of the function the the score that gets calculated
    return z;
}

function is_letter(word)
{
    var ASCIIWord = word.charCodeAt(0);
    var letter_num = 0;
    for (i = 0, n = word.length; i < n; i++)
    {
        ASCIIWord = word1.charCodeAt(0);
        if (ASCIIWord < 65) 
            {
                letter_num += 1;
            }
        if (ASCIIWord > 90 && ASCIIWord < 97)
            {
                letter_num += 1;
            }
        if (ASCIIWord > 122)
            {
                letter_num += 1;
            }
    }
    console.log(word.length)
    if (letter_num == n)
    {
        return false
    }
    else 
    {
        return true
    }
    
}
function is_vowel(word)
{
    let hasvowel = 0;
    var ASCIIWord = word.charCodeAt(0);
    for (i = 0, n = word.length; i < n; i++)
    {
        if (ASCIIWord >= 97 && ASCIIWord <= 122)
            {
            let m = ASCIIWord - 97;
                if (VOWELS[m] > 0)
                {
                    hasvowel += 1;
                }
            
            }
        if (ASCIIWord >= 65 && ASCIIWord <= 90)
            {
            let m = ASCIIWord - 65;
                if (VOWELS[m] > 0)
                {
                    hasvowel += 1;
                }
            }
    }
    if (hasvowel > 0)
    {
        return true
    }
    else
    {
        return false
    }
}
function is_word(word)
{
    if(is_vowel(word)==false && is_letter(word)==true)
    {
        return true
    }
    else 
    {
        return false
    }
}

