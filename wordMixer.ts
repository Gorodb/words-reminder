import fse from 'fs-extra';
import inquirer from 'inquirer';

(async () => {
	const words = (await fse.readFile('words.txt')).toString().split('\n')
	const randomFromArray = (items: any[]) => items[Math.floor(Math.random() * items.length)]

	console.log("Ready to start?");

	const questions = [
		{
			type: 'input',
			name: 'Press enter to continue',
			message: "",
		},
	];
	let answer = {name: ""};

	while (answer.name != 'q') {
		answer = await inquirer.prompt(questions);
		console.log(randomFromArray(words));
	}

})()
