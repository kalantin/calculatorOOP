export default class Count {
	constructor(number, sum, clear, back, result) {
		this.numbers = document.querySelectorAll(number);
		this.sum = document.querySelector(sum);
		this.clear = document.querySelector(clear);
		this.back = document.querySelector(back);
		this.result = document.querySelector(result);
		this.numberArray = [];
		this.currentNumber = ``;
		this.operation = ``;
		this.numbers.forEach((el) => {
			el.addEventListener('click', this.addOperations.bind(this));
		});
		this.sum.addEventListener('click', this.sumOperation.bind(this));
		this.clear.addEventListener('click', this.clearResult.bind(this));
		this.back.addEventListener('click', this.removeLast.bind(this));
	}
	addOperations(e) {
		if (
			e.target.textContent === `+` ||
			e.target.textContent === `*` ||
			e.target.textContent === `/` ||
			e.target.textContent === `-`
		) {
			if (this.currentNumber === ``) {
				this.operation += e.target.textContent;
				this.result.textContent = this.operation;
				this.currentNumber = ``;
				this.currentNumber = e.target.textContent;
				this.numberArray.pop();
				this.numberArray.push(this.currentNumber);
				this.currentNumber = ``;
			} else {
				this.numberArray.push(this.currentNumber);
				this.operation += e.target.textContent;
				this.result.textContent = this.operation;
				this.currentNumber = ``;
				this.currentNumber = e.target.textContent;
				this.numberArray.push(this.currentNumber);
				this.currentNumber = ``;
			}
		} else {
			this.currentNumber += e.target.textContent;
			this.operation === 0
				? (this.operation = e.target.textContent)
				: (this.operation += e.target.textContent);
			this.result.textContent = this.operation;
		}
	}
	clearResult() {
		this.operation = 0;
		this.currentNumber = '';
		this.result.textContent = this.operation;
		this.numberArray.length = 0;
	}
	removeLast() {
		const newOperation = this.result.textContent.slice(0, -1);
		if (newOperation === ``) {
			this.result.textContent = 0;
		} else {
			this.operation = newOperation;
			this.result.textContent = newOperation;
		}
	}
	firstStep() {
		for (const el of this.numberArray) {
			const elIndex = this.numberArray.indexOf(el);
			if (el === `*`) {
				this.numberArray[elIndex - 1] =
					Number(this.numberArray[elIndex - 1]) *
					Number(this.numberArray[elIndex + 1]);
				this.numberArray.splice(elIndex, 2);
				this.firstStep();
			} else if (el === `/`) {
				this.numberArray[elIndex - 1] =
					Number(this.numberArray[elIndex - 1]) /
					Number(this.numberArray[elIndex + 1]);
				this.numberArray.splice(elIndex, 2);
				this.firstStep();
			}
		}
	}
	sumOperation() {
		this.numberArray.push(this.currentNumber);
		this.firstStep();
		for (let i = 0; i < this.numberArray.length; i++) {
			switch (this.numberArray[i]) {
				case `+`:
					this.numberArray[i + 1] =
						Number(this.numberArray[i - 1]) + Number(this.numberArray[i + 1]);
					break;
				case `-`:
					this.numberArray[i + 1] =
						Number(this.numberArray[i - 1]) - Number(this.numberArray[i + 1]);
					break;
			}
		}
		let summary = this.numberArray[this.numberArray.length - 1];
		this.result.textContent = summary;
		this.operation = summary;
		this.numberArray.length = 0;
		this.currentNumber = summary;
	}
}
