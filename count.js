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
	addOperations(e) {//Funkcja dodaje kolejne elementy do obliczeń (liczby, znaki). Pushuje do tablicy liczbe podaną przed znakiem i znak w chwili kliknięcia znaku.
		if (
			e.target.textContent === `+` ||
			e.target.textContent === `*` ||
			e.target.textContent === `/` ||
			e.target.textContent === `-`
		) {
			if (this.currentNumber === ``) { // działa gdy chcesz zmienić znak z dodawania na odejmowanie np.
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
	clearResult() { // czyści wszystko
		this.operation = 0;
		this.currentNumber = '';
		this.result.textContent = this.operation;
		this.numberArray.length = 0;
	}
	removeLast() { // usuwa ostatni element w działaniu
		const newOperation = this.result.textContent.slice(0, -1);
		if (newOperation === ``) {
			this.result.textContent = 0;
		} else {
			this.operation = newOperation;
			this.result.textContent = newOperation;
		}
	}
	firstStep() { // funkcja iteruje po tablicy wykonując najpierw mnożenie i dzielenie. Wykonując to przypisuje wynik do pierwszej liczby biorącej udział w działaniu i usuwa znak oraz drugą liczbę. 
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
	sumOperation() {// wykonywanie wszystkich działań odwołując się jednocześnie do wcześniejszej funkcji firstStep.
		this.numberArray.push(this.currentNumber);
		this.firstStep();
		for (let i = 0; i < this.numberArray.length; i++) {
			switch (this.numberArray[i]) {
				case `+`:
					this.numberArray[i + 1] =
						Number(this.numberArray[i - 1]) + Number(this.numberArray[i + 1]);// wykonuje działanie dodawanie przypisując wynik do drugiej liczby biorącej udziałw dodawaniu
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
