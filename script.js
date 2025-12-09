class Memory {
    constructor() {
        this.selected = [];
        this.cards = [];
        this.numbers = [];
        this.points = 0;
        this.width = 0;
        this.height = 0;
        this.max = 0;
    }

    init() {
        let table = document.createElement("table");
        table.id = "table";

        document.body.removeChild(document.getElementById("table"));

        this.width = Number(document.getElementById("width").value);
        this.height = Number(document.getElementById("height").value);
        this.max = Math.floor(((this.width * this.height) / 2));

        this.update_points();

        for (let y = 0; y < this.height; y++) {
            let row = document.createElement("tr");
            for (let x = 0; x < this.width; x++) {
                let index = `${x}-${y}`;

                let cell = document.createElement("td");
                this.cards[index] = document.createElement("div");
                this.cards[index].id = "back";

                let hitbox = document.createElement("div");
                hitbox.id = "hitbox";

                this.set_card_value(index);

                hitbox.addEventListener("click", (e) => {
                    this.on_click(index);
                });

                hitbox.appendChild(this.cards[index]);
                cell.appendChild(hitbox);

                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        document.body.appendChild(table);
    }

    reset() {
        this.selected = [];
        this.cards = [];
        this.numbers = [];
        this.points = 0;
        this.init();
    }

    on_click(index) {
        if (this.cards[index].id == "back") {
            this.selected.push(index);
            this.cards[index].id = "front";

            if (this.selected.length == 2) {
                if (this.cards[this.selected[0]].textContent == this.cards[this.selected[1]].textContent) {
                    this.points++;
                    this.update_points();
                    this.selected = [];
                    if (this.points == this.max) {
                        setTimeout(() => {
                            alert("WYGRAŁEŚ !");
                        }, 500);
                    }
                }
                else {
                    setTimeout(() => {
                        this.selected.forEach(element => {
                            this.cards[element].id = "back";
                            this.selected = [];
                        });
                    }, 500);
                }
            }
        }
    }

    update_points() {
        document.getElementById("points").textContent = `punkty: ${this.points}`;
    }

    set_all_to(side) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                setTimeout(() => {
                    this.cards[`${x}-${y}`].id = side;
                }, 10 * y * x);
            }
        }
    }

    set_card_value(index) {
        let value = Math.floor(Math.random() * this.max) + 1;

        if (this.numbers[value] == 2) {
            this.set_card_value(index);
        }
        else {
            if (this.numbers[value] == null) {
                this.numbers[value] = 1;
            }
            else {
                this.numbers[value]++;
            }

            this.cards[index].textContent = value;
        }
    }
}

const game = new Memory();