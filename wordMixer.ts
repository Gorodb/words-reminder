import fse from 'fs-extra';
import inquirer from 'inquirer';
import 'colors';

(async () => {
	const wordsFromArray = (await fse.readFile('irregularWords.txt')).toString().split('\n')
	let wordGroups = wordsFromArray.map(word => word.split('-'))
	const randomFromArray = (items: any[]) => items[Math.floor(Math.random() * items.length)]

	console.clear();
	console.log("Ready to start?");

	const answers = [
		{
			type: 'input',
			name: 'Translation',
			message: "",
		},
	];

	const empty = [
		{
			type: 'confirm',
			name: 'Continue',
			message: "",
		},
	];

	let isContinue = true;
	let answer = {Translation: ""};

	while (isContinue && wordGroups.length > 0) {
		const currentWord = randomFromArray(wordGroups);
		console.log("Word: ".cyan.italic, currentWord[1]);
		answer = {...answer, ...(await inquirer.prompt(answers))};
		console.log(currentWord[2]);
		wordGroups = wordGroups.filter(group => group[0] !== currentWord[0]);
		let {Continue} = await inquirer.prompt(empty);
		isContinue = Continue;
		console.clear();
	}
})()
