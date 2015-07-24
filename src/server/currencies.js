var standard = [{'0': 0}, {'0.5' : 1}, {'1' : 2}, {'2' : 3}, {'3' : 4}, {'5' : 5}, {'8' : 6}, {'13' : 7}, {'20' : 8}, {'40' : 9}, {'100' : 10}, {'infinity' : 11}, {'?' : 12}, {'coffee' : 13}];
var tShirt = [{'XS': 0}, {'S' : 1}, {'M' : 2}, {'L' : 3}, {'XL' : 4}, {'2XL' : 5}, {'3XL' : 6}, {'4XL' : 7}, {'5XL' : 8}, {'infinity' : 11}, {'?' : 12}, {'coffee' : 13}];
var fibonacci = [{'0': 0}, {'1' : 1}, {'2' : 2}, {'3' : 3}, {'5' : 4}, {'8' : 5}, {'13' : 6}, {'21' : 7}, {'34' : 8}, {'infinity' : 11}, {'?' : 12}, {'coffee' : 13}];

exports.setCurrency = function(typeOfCards){
	return (typeOfCards === 'Standard')?standard:(typeOfCards === 'T-shirt')?tShirt:fibonacci;
};